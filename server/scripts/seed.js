const db = require('../db');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    console.log('Starting database seed...');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('admin123', salt);
    const userPasswordHash = await bcrypt.hash('user123', salt);

    // Insert admin user
    const adminResult = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
      ['Admin User', 'admin@example.com', adminPasswordHash, 'admin']
    );
    const adminId = adminResult.rows[0].id;
    console.log(`Created admin user with ID: ${adminId}`);

    // Insert regular user
    const userResult = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
      ['Regular User', 'user@example.com', userPasswordHash, 'user']
    );
    const userId = userResult.rows[0].id;
    console.log(`Created regular user with ID: ${userId}`);

    // Insert section categories
    const categories = [
      { slug: 'header', name: 'Header', description: 'Top navigation and branding sections' },
      { slug: 'hero', name: 'Hero', description: 'Eye-catching introductory sections' },
      { slug: 'about', name: 'About', description: 'Company or personal information sections' },
      { slug: 'services', name: 'Services', description: 'Service offering sections' },
      { slug: 'pricing', name: 'Pricing', description: 'Pricing tables and plans' },
      { slug: 'footer', name: 'Footer', description: 'Bottom page sections with links and info' }
    ];

    for (const category of categories) {
      const result = await db.query(
        'INSERT INTO section_categories (slug, name, description) VALUES ($1, $2, $3) RETURNING id',
        [category.slug, category.name, category.description]
      );
      const categoryId = result.rows[0].id;
      console.log(`Created category: ${category.name} with ID: ${categoryId}`);

      // Create a default section for each category
      const defaultSection = getDefaultSectionData(category.slug, categoryId, adminId);
      const sectionResult = await db.query(
        'INSERT INTO sections (category_id, name, version, default_data, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [categoryId, defaultSection.name, 1, defaultSection.default_data, adminId]
      );
      const sectionId = sectionResult.rows[0].id;
      console.log(`Created default section for ${category.name} with ID: ${sectionId}`);

      // Create a variant for the section
      if (defaultSection.variants && defaultSection.variants.length > 0) {
        for (const variant of defaultSection.variants) {
          await db.query(
            'INSERT INTO section_variants (section_id, variant_data, label) VALUES ($1, $2, $3)',
            [sectionId, variant.data, variant.label]
          );
          console.log(`Created variant: ${variant.label} for section ID: ${sectionId}`);
        }
      }
    }

    // Create a sample website for the regular user
    const websiteResult = await db.query(
      'INSERT INTO websites (owner_id, name, slug) VALUES ($1, $2, $3) RETURNING id',
      [userId, 'My First Website', 'my-first-website']
    );
    const websiteId = websiteResult.rows[0].id;
    console.log(`Created sample website with ID: ${websiteId}`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

function getDefaultSectionData(categorySlug, categoryId, adminId) {
  switch (categorySlug) {
    case 'header':
      return {
        name: 'Standard Header',
        default_data: JSON.stringify({
          logo: '/uploads/default-logo.png',
          title: 'Company Name',
          menuItems: [
            { label: 'Home', url: '#home' },
            { label: 'About', url: '#about' },
            { label: 'Services', url: '#services' },
            { label: 'Contact', url: '#contact' }
          ],
          ctaButton: {
            label: 'Get Started',
            url: '#contact'
          }
        }),
        variants: [
          {
            label: 'Transparent Header',
            data: JSON.stringify({
              logo: '/uploads/default-logo.png',
              title: 'Company Name',
              menuItems: [
                { label: 'Home', url: '#home' },
                { label: 'About', url: '#about' },
                { label: 'Services', url: '#services' },
                { label: 'Contact', url: '#contact' }
              ],
              ctaButton: {
                label: 'Get Started',
                url: '#contact'
              },
              transparent: true
            })
          }
        ]
      };
    case 'hero':
      return {
        name: 'Main Hero',
        default_data: JSON.stringify({
          headline: 'Welcome to Our Website',
          subheadline: 'We provide the best services for your needs',
          backgroundImage: '/uploads/default-hero.jpg',
          ctaButton: {
            label: 'Learn More',
            url: '#about'
          },
          secondaryButton: {
            label: 'Contact Us',
            url: '#contact'
          }
        }),
        variants: [
          {
            label: 'Video Hero',
            data: JSON.stringify({
              headline: 'Welcome to Our Website',
              subheadline: 'We provide the best services for your needs',
              backgroundVideo: '/uploads/default-video.mp4',
              ctaButton: {
                label: 'Learn More',
                url: '#about'
              }
            })
          }
        ]
      };
    case 'about':
      return {
        name: 'About Us',
        default_data: JSON.stringify({
          title: 'About Our Company',
          description: 'We are a team of professionals dedicated to providing the best services for our clients.',
          image: '/uploads/default-about.jpg',
          features: [
            { title: 'Expert Team', description: 'Our team consists of industry experts' },
            { title: 'Quality Service', description: 'We provide top-notch services' },
            { title: 'Customer Support', description: '24/7 customer support' }
          ]
        }),
        variants: []
      };
    case 'services':
      return {
        name: 'Services Grid',
        default_data: JSON.stringify({
          title: 'Our Services',
          description: 'We offer a wide range of services to meet your needs',
          services: [
            { title: 'Web Design', description: 'Custom website design', icon: 'design' },
            { title: 'Development', description: 'Web and mobile development', icon: 'code' },
            { title: 'Marketing', description: 'Digital marketing services', icon: 'marketing' }
          ]
        }),
        variants: []
      };
    case 'pricing':
      return {
        name: 'Pricing Table',
        default_data: JSON.stringify({
          title: 'Our Pricing Plans',
          description: 'Choose the plan that fits your needs',
          plans: [
            {
              title: 'Basic',
              price: '$9.99',
              period: 'monthly',
              features: ['Feature 1', 'Feature 2', 'Feature 3'],
              ctaButton: {
                label: 'Get Started',
                url: '#contact'
              }
            },
            {
              title: 'Pro',
              price: '$19.99',
              period: 'monthly',
              features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
              ctaButton: {
                label: 'Get Started',
                url: '#contact'
              },
              highlighted: true
            },
            {
              title: 'Enterprise',
              price: '$29.99',
              period: 'monthly',
              features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6', 'Feature 7'],
              ctaButton: {
                label: 'Contact Us',
                url: '#contact'
              }
            }
          ]
        }),
        variants: []
      };
    case 'footer':
      return {
        name: 'Standard Footer',
        default_data: JSON.stringify({
          logo: '/uploads/default-logo.png',
          companyName: 'Company Name',
          description: 'A brief description of your company',
          menuItems: [
            { label: 'Home', url: '#home' },
            { label: 'About', url: '#about' },
            { label: 'Services', url: '#services' },
            { label: 'Contact', url: '#contact' }
          ],
          socialLinks: [
            { platform: 'Facebook', url: 'https://facebook.com' },
            { platform: 'Twitter', url: 'https://twitter.com' },
            { platform: 'Instagram', url: 'https://instagram.com' }
          ],
          copyright: `© ${new Date().getFullYear()} Company Name. All rights reserved.`
        }),
        variants: []
      };
    default:
      return {
        name: 'Default Section',
        default_data: JSON.stringify({
          title: 'Section Title',
          content: 'Section Content'
        }),
        variants: []
      };
  }
}

seed();