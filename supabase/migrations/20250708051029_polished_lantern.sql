-- Drop tables if they exist
DROP TABLE IF EXISTS project_sections;
DROP TABLE IF EXISTS websites;
DROP TABLE IF EXISTS section_variants;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS section_categories;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create section_categories table
CREATE TABLE section_categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sections table
CREATE TABLE sections (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES section_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  version INTEGER DEFAULT 1,
  default_data JSONB NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create section_variants table
CREATE TABLE section_variants (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES sections(id) ON DELETE CASCADE,
  variant_data JSONB NOT NULL,
  label VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create websites table
CREATE TABLE websites (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create project_sections table
CREATE TABLE project_sections (
  id SERIAL PRIMARY KEY,
  website_id INTEGER REFERENCES websites(id) ON DELETE CASCADE,
  section_id INTEGER REFERENCES sections(id) ON DELETE CASCADE,
  variant_id INTEGER REFERENCES section_variants(id) ON DELETE SET NULL,
  custom_data JSONB,
  "order" INTEGER NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published BOOLEAN DEFAULT FALSE
);

-- Create indexes for performance
CREATE INDEX idx_project_sections_website_order ON project_sections(website_id, "order");
CREATE INDEX idx_project_sections_section_variant ON project_sections(section_id, variant_id);
CREATE INDEX idx_sections_category ON sections(category_id);
CREATE INDEX idx_websites_owner ON websites(owner_id);
CREATE INDEX idx_section_variants_section ON section_variants(section_id);