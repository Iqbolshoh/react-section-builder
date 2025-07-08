const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../db');
const { auth, ownerOrAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// @route   GET api/sites
// @desc    Get all websites for the current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT w.*, 
              COUNT(ps.id) as section_count,
              COUNT(CASE WHEN ps.published = true THEN 1 END) as published_section_count
       FROM websites w
       LEFT JOIN project_sections ps ON w.id = ps.website_id
       WHERE w.owner_id = $1
       GROUP BY w.id
       ORDER BY w.created_at DESC`,
      [req.user.id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/sites
// @desc    Create a new website
// @access  Private
router.post(
  '/',
  [
    auth,
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

    const { name, slug } = req.body;

    try {
      // Check if slug already exists
      const slugCheck = await db.query(
        'SELECT * FROM websites WHERE slug = $1',
        [slug]
      );

      if (slugCheck.rows.length > 0) {
        return res.status(400).json({ message: 'Slug already exists' });
      }

      // Create website
      const result = await db.query(
        'INSERT INTO websites (owner_id, name, slug) VALUES ($1, $2, $3) RETURNING *',
        [req.user.id, name, slug]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/sites/:id
// @desc    Get a website by ID
// @access  Private
router.get('/:id', [auth, ownerOrAdmin], async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM websites WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sites/:id/sections
// @desc    Get all sections for a website
// @access  Private
router.get('/:id/sections', [auth, ownerOrAdmin], async (req, res) => {
  try {
    const result = await db.query(`
      SELECT ps.*, s.name as section_name, s.default_data, 
             c.name as category_name, c.slug as category_slug,
             sv.label as variant_label, sv.variant_data
      FROM project_sections ps
      JOIN sections s ON ps.section_id = s.id
      JOIN section_categories c ON s.category_id = c.id
      LEFT JOIN section_variants sv ON ps.variant_id = sv.id
      WHERE ps.website_id = $1
      ORDER BY ps."order"
    `, [req.params.id]);
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/sites/:id/sections
// @desc    Add a section to a website
// @access  Private
router.post(
  '/:id/sections',
  [
    auth,
    ownerOrAdmin,
    [
      check('section_id', 'Section ID is required').not().isEmpty(),
      check('order', 'Order is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { section_id, variant_id, custom_data, order } = req.body;

    try {
      // Create project section
      const result = await db.query(
        'INSERT INTO project_sections (website_id, section_id, variant_id, custom_data, "order") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [req.params.id, section_id, variant_id || null, custom_data || null, order]
      );

      // Get full section data
      const sectionData = await db.query(`
        SELECT ps.*, s.name as section_name, s.default_data, 
               c.name as category_name, c.slug as category_slug,
               sv.label as variant_label, sv.variant_data
        FROM project_sections ps
        JOIN sections s ON ps.section_id = s.id
        JOIN section_categories c ON s.category_id = c.id
        LEFT JOIN section_variants sv ON ps.variant_id = sv.id
        WHERE ps.id = $1
      `, [result.rows[0].id]);

      res.json(sectionData.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PATCH api/sites/:id/sections/:ps_id
// @desc    Update a project section
// @access  Private
router.patch(
  '/:id/sections/:ps_id',
  [auth, ownerOrAdmin],
  async (req, res) => {
    const { custom_data, order, variant_id, published } = req.body;
    const websiteId = req.params.id;
    const projectSectionId = req.params.ps_id;

    try {
      // Check if project section exists
      const sectionCheck = await db.query(
        'SELECT * FROM project_sections WHERE id = $1 AND website_id = $2',
        [projectSectionId, websiteId]
      );

      if (sectionCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Project section not found' });
      }

      // Build update query
      let updateQuery = 'UPDATE project_sections SET saved_at = NOW()';
      const queryParams = [];
      let paramIndex = 1;

      if (custom_data !== undefined) {
        updateQuery += `, custom_data = $${paramIndex}`;
        queryParams.push(custom_data);
        paramIndex++;
      }

      if (order !== undefined) {
        updateQuery += `, "order" = $${paramIndex}`;
        queryParams.push(order);
        paramIndex++;
      }

      if (variant_id !== undefined) {
        updateQuery += `, variant_id = $${paramIndex}`;
        queryParams.push(variant_id === null ? null : variant_id);
        paramIndex++;
      }

      if (published !== undefined) {
        updateQuery += `, published = $${paramIndex}`;
        queryParams.push(published);
        paramIndex++;
      }

      updateQuery += ` WHERE id = $${paramIndex} AND website_id = $${paramIndex + 1} RETURNING *`;
      queryParams.push(projectSectionId, websiteId);

      // Execute update
      const result = await db.query(updateQuery, queryParams);

      // Get full section data
      const sectionData = await db.query(`
        SELECT ps.*, s.name as section_name, s.default_data, 
               c.name as category_name, c.slug as category_slug,
               sv.label as variant_label, sv.variant_data
        FROM project_sections ps
        JOIN sections s ON ps.section_id = s.id
        JOIN section_categories c ON s.category_id = c.id
        LEFT JOIN section_variants sv ON ps.variant_id = sv.id
        WHERE ps.id = $1
      `, [result.rows[0].id]);

      res.json(sectionData.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/sites/:id/sections/:ps_id
// @desc    Delete a project section
// @access  Private
router.delete('/:id/sections/:ps_id', [auth, ownerOrAdmin], async (req, res) => {
  try {
    // Check if project section exists
    const sectionCheck = await db.query(
      'SELECT * FROM project_sections WHERE id = $1 AND website_id = $2',
      [req.params.ps_id, req.params.id]
    );

    if (sectionCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Project section not found' });
    }

    // Delete project section
    await db.query(
      'DELETE FROM project_sections WHERE id = $1',
      [req.params.ps_id]
    );

    res.json({ message: 'Project section removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/sites/:id/publish
// @desc    Publish a website
// @access  Private
router.post('/:id/publish', [auth, ownerOrAdmin], async (req, res) => {
  try {
    // Update website published_at
    const websiteResult = await db.query(
      'UPDATE websites SET published_at = NOW() WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    
    if (websiteResult.rows.length === 0) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    // Mark all sections as published
    await db.query(
      'UPDATE project_sections SET published = true WHERE website_id = $1',
      [req.params.id]
    );
    
    res.json(websiteResult.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sites/:id/export
// @desc    Export a website
// @access  Private
router.get('/:id/export', [auth, ownerOrAdmin], async (req, res) => {
  try {
    // Get website data
    const websiteResult = await db.query(
      'SELECT * FROM websites WHERE id = $1',
      [req.params.id]
    );
    
    if (websiteResult.rows.length === 0) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    const website = websiteResult.rows[0];
    
    // Get all sections for the website
    const sectionsResult = await db.query(`
      SELECT ps.*, s.name as section_name, s.default_data, 
             c.name as category_name, c.slug as category_slug,
             sv.label as variant_label, sv.variant_data
      FROM project_sections ps
      JOIN sections s ON ps.section_id = s.id
      JOIN section_categories c ON s.category_id = c.id
      LEFT JOIN section_variants sv ON ps.variant_id = sv.id
      WHERE ps.website_id = $1
      ORDER BY ps."order"
    `, [req.params.id]);
    
    const sections = sectionsResult.rows;
    
    // Create a zip file
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });
    
    // Set the archive name
    res.attachment(`${website.slug}-export.zip`);
    
    // Pipe archive data to the response
    archive.pipe(res);
    
    // Generate HTML content
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${website.name}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        /* Custom styles */
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body>
`;

    // Add sections to HTML
    for (const section of sections) {
      // Combine data from default_data, variant_data, and custom_data
      const sectionData = {
        ...JSON.parse(section.default_data),
        ...(section.variant_data ? JSON.parse(section.variant_data) : {}),
        ...(section.custom_data || {})
      };
      
      // Generate HTML for each section type
      htmlContent += generateSectionHTML(section.category_slug, sectionData);
    }
    
    // Close HTML
    htmlContent += `
</body>
</html>`;
    
    // Add index.html to the archive
    archive.append(htmlContent, { name: 'index.html' });
    
    // Create uploads directory in the archive
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    // Add all files from uploads directory
    if (fs.existsSync(uploadsDir)) {
      archive.directory(uploadsDir, 'uploads');
    }
    
    // Finalize the archive
    archive.finalize();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Helper function to generate HTML for different section types
function generateSectionHTML(sectionType, data) {
  switch (sectionType) {
    case 'header':
      return `
<header class="bg-white shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-6">
      <div class="flex items-center">
        ${data.logo ? `<img src="${data.logo}" alt="${data.title}" class="h-8 w-auto mr-3">` : ''}
        <h1 class="text-xl font-bold text-gray-900">${data.title}</h1>
      </div>
      <nav class="hidden md:flex space-x-10">
        ${data.menuItems.map(item => `
          <a href="${item.url}" class="text-base font-medium text-gray-500 hover:text-gray-900">
            ${item.label}
          </a>
        `).join('')}
      </nav>
      ${data.ctaButton ? `
        <div class="hidden md:flex">
          <a href="${data.ctaButton.url}" class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            ${data.ctaButton.label}
          </a>
        </div>
      ` : ''}
    </div>
  </div>
</header>
`;

    case 'hero':
      return `
<section class="relative bg-gray-50">
  ${data.backgroundImage ? `
    <div class="absolute inset-0">
      <img class="w-full h-full object-cover" src="${data.backgroundImage}" alt="Background">
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    </div>
  ` : ''}
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl ${data.backgroundImage ? 'text-white' : ''}">
        ${data.headline}
      </h1>
      <p class="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:max-w-3xl ${data.backgroundImage ? 'text-white text-opacity-80' : ''}">
        ${data.subheadline}
      </p>
      <div class="mt-10 sm:flex sm:justify-center">
        ${data.ctaButton ? `
          <div class="rounded-md shadow">
            <a href="${data.ctaButton.url}" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              ${data.ctaButton.label}
            </a>
          </div>
        ` : ''}
        ${data.secondaryButton ? `
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <a href="${data.secondaryButton.url}" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              ${data.secondaryButton.label}
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  </div>
</section>
`;

    case 'about':
      return `
<section class="py-12 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:text-center">
      <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        ${data.title}
      </p>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        ${data.description}
      </p>
    </div>

    <div class="mt-10">
      <div class="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        ${data.features ? data.features.map(feature => `
          <div class="mt-5 md:mt-0">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <!-- Icon placeholder -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">${feature.title}</h3>
                <p class="mt-2 text-base text-gray-500">${feature.description}</p>
              </div>
            </div>
          </div>
        `).join('') : ''}
      </div>
    </div>
    
    ${data.image ? `
      <div class="mt-10">
        <img class="mx-auto h-64 w-auto object-cover rounded-lg shadow-lg" src="${data.image}" alt="About us">
      </div>
    ` : ''}
  </div>
</section>
`;

    case 'services':
      return `
<section class="py-12 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:text-center">
      <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Services</h2>
      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        ${data.title}
      </p>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        ${data.description}
      </p>
    </div>

    <div class="mt-10">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        ${data.services ? data.services.map(service => `
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <!-- Icon placeholder -->
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dt class="text-lg font-medium text-gray-900">
                    ${service.title}
                  </dt>
                </div>
              </div>
              <div class="mt-4">
                <dd class="text-base text-gray-500">
                  ${service.description}
                </dd>
              </div>
            </div>
          </div>
        `).join('') : ''}
      </div>
    </div>
  </div>
</section>
`;

    case 'pricing':
      return `
<section class="py-12 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:flex-col sm:align-center">
      <h1 class="text-5xl font-extrabold text-gray-900 sm:text-center">${data.title}</h1>
      <p class="mt-5 text-xl text-gray-500 sm:text-center">${data.description}</p>
    </div>
    <div class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
      ${data.plans ? data.plans.map(plan => `
        <div class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${plan.highlighted ? 'border-indigo-500 border-2' : ''}">
          <div class="p-6">
            <h2 class="text-lg leading-6 font-medium text-gray-900">${plan.title}</h2>
            <p class="mt-4 text-sm text-gray-500">${plan.description || ''}</p>
            <p class="mt-8">
              <span class="text-4xl font-extrabold text-gray-900">${plan.price}</span>
              <span class="text-base font-medium text-gray-500">/${plan.period}</span>
            </p>
            <a href="${plan.ctaButton.url}" class="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700">
              ${plan.ctaButton.label}
            </a>
          </div>
          <div class="pt-6 pb-8 px-6">
            <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
            <ul class="mt-6 space-y-4">
              ${plan.features ? plan.features.map(feature => `
                <li class="flex space-x-3">
                  <svg class="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm text-gray-500">${feature}</span>
                </li>
              `).join('') : ''}
            </ul>
          </div>
        </div>
      `).join('') : ''}
    </div>
  </div>
</section>
`;

    case 'footer':
      return `
<footer class="bg-gray-800">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="space-y-8 xl:col-span-1">
        <div class="flex items-center">
          ${data.logo ? `<img class="h-10 w-auto" src="${data.logo}" alt="${data.companyName}">` : ''}
          <span class="ml-3 text-white text-xl font-bold">${data.companyName}</span>
        </div>
        <p class="text-gray-400 text-base">${data.description}</p>
        <div class="flex space-x-6">
          ${data.socialLinks ? data.socialLinks.map(social => `
            <a href="${social.url}" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">${social.platform}</span>
              <!-- Icon placeholder -->
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
              </svg>
            </a>
          `).join('') : ''}
        </div>
      </div>
      <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Links</h3>
            <ul class="mt-4 space-y-4">
              ${data.menuItems ? data.menuItems.slice(0, Math.ceil(data.menuItems.length / 2)).map(item => `
                <li>
                  <a href="${item.url}" class="text-base text-gray-300 hover:text-white">
                    ${item.label}
                  </a>
                </li>
              `).join('') : ''}
            </ul>
          </div>
          <div class="mt-12 md:mt-0">
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">More</h3>
            <ul class="mt-4 space-y-4">
              ${data.menuItems ? data.menuItems.slice(Math.ceil(data.menuItems.length / 2)).map(item => `
                <li>
                  <a href="${item.url}" class="text-base text-gray-300 hover:text-white">
                    ${item.label}
                  </a>
                </li>
              `).join('') : ''}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12 border-t border-gray-700 pt-8">
      <p class="text-base text-gray-400 text-center">
        ${data.copyright}
      </p>
    </div>
  </div>
</footer>
`;

    default:
      return `
<section class="py-12 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        ${data.title || 'Section Title'}
      </h2>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        ${data.content || 'Section Content'}
      </p>
    </div>
  </div>
</section>
`;
  }
}

module.exports = router;