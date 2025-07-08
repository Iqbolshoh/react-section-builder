const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../db');
const { auth, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET api/admin/categories
// @desc    Get all section categories
// @access  Private/Admin
router.get('/categories', [auth, admin], async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM section_categories ORDER BY name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/admin/categories
// @desc    Create a new section category
// @access  Private/Admin
router.post(
  '/categories',
  [
    auth,
    admin,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('slug', 'Slug is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, slug, description } = req.body;

    try {
      // Check if slug already exists
      const slugCheck = await db.query(
        'SELECT * FROM section_categories WHERE slug = $1',
        [slug]
      );

      if (slugCheck.rows.length > 0) {
        return res.status(400).json({ message: 'Slug already exists' });
      }

      // Create category
      const result = await db.query(
        'INSERT INTO section_categories (name, slug, description) VALUES ($1, $2, $3) RETURNING *',
        [name, slug, description]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/admin/sections
// @desc    Get all sections
// @access  Private/Admin
router.get('/sections', [auth, admin], async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.*, c.name as category_name, c.slug as category_slug, 
             u.name as created_by_name
      FROM sections s
      JOIN section_categories c ON s.category_id = c.id
      JOIN users u ON s.created_by = u.id
      ORDER BY s.created_at DESC
    `);
    
    // Get variants for each section
    for (const section of result.rows) {
      const variantsResult = await db.query(
        'SELECT * FROM section_variants WHERE section_id = $1',
        [section.id]
      );
      section.variants = variantsResult.rows;
    }
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/admin/sections
// @desc    Create a new section
// @access  Private/Admin
router.post(
  '/sections',
  [
    auth,
    admin,
    upload.single('thumbnail'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('category_id', 'Category ID is required').not().isEmpty(),
      check('default_data', 'Default data is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category_id, default_data } = req.body;
    
    try {
      // Parse default_data if it's a string
      let parsedDefaultData;
      try {
        parsedDefaultData = typeof default_data === 'string' ? JSON.parse(default_data) : default_data;
      } catch (e) {
        return res.status(400).json({ message: 'Invalid JSON in default_data' });
      }
      
      // If there's a file uploaded, add its path to the default_data
      if (req.file) {
        parsedDefaultData.thumbnail = `/uploads/${req.file.filename}`;
      }

      // Create section
      const result = await db.query(
        'INSERT INTO sections (name, category_id, default_data, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, category_id, parsedDefaultData, req.user.id]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/admin/sections/:id/variants
// @desc    Add a variant to a section
// @access  Private/Admin
router.post(
  '/sections/:id/variants',
  [
    auth,
    admin,
    upload.single('thumbnail'),
    [
      check('label', 'Label is required').not().isEmpty(),
      check('variant_data', 'Variant data is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { label, variant_data } = req.body;
    
    try {
      // Check if section exists
      const sectionCheck = await db.query(
        'SELECT * FROM sections WHERE id = $1',
        [id]
      );

      if (sectionCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Section not found' });
      }

      // Parse variant_data if it's a string
      let parsedVariantData;
      try {
        parsedVariantData = typeof variant_data === 'string' ? JSON.parse(variant_data) : variant_data;
      } catch (e) {
        return res.status(400).json({ message: 'Invalid JSON in variant_data' });
      }
      
      // If there's a file uploaded, add its path to the variant_data
      if (req.file) {
        parsedVariantData.thumbnail = `/uploads/${req.file.filename}`;
      }

      // Create variant
      const result = await db.query(
        'INSERT INTO section_variants (section_id, label, variant_data) VALUES ($1, $2, $3) RETURNING *',
        [id, label, parsedVariantData]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/admin/websites
// @desc    Get all websites
// @access  Private/Admin
router.get('/websites', [auth, admin], async (req, res) => {
  try {
    const result = await db.query(`
      SELECT w.*, u.name as owner_name, u.email as owner_email,
             COUNT(ps.id) as section_count
      FROM websites w
      JOIN users u ON w.owner_id = u.id
      LEFT JOIN project_sections ps ON w.id = ps.website_id
      GROUP BY w.id, u.name, u.email
      ORDER BY w.created_at DESC
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', [auth, admin], async (req, res) => {
  try {
    const result = await db.query(`
      SELECT u.id, u.name, u.email, u.role, u.created_at,
             COUNT(w.id) as website_count
      FROM users u
      LEFT JOIN websites w ON u.id = w.owner_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;