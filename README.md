# Section Builder

A full-stack application for building websites with reusable sections.

## Features

- **Authentication**: User and admin roles with secure login
- **Admin Panel**: Manage section categories, sections, and users
- **Website Builder**: Drag-and-drop interface for building websites
- **Section Editor**: Edit section content with a user-friendly interface
- **Preview Mode**: Preview websites before publishing
- **Export**: Export websites as HTML and assets

## Tech Stack

- **Frontend**: React, TailwindCSS, DND Kit
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   npm run install-client
   ```

3. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE section_builder;
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the database connection string and other variables

5. Run database migrations:
   ```
   psql -U postgres -d section_builder -f server/db/schema.sql
   ```

6. Seed the database:
   ```
   npm run seed
   ```

7. Start the development server:
   ```
   npm run dev
   ```

## Default Users

After seeding the database, you can log in with these credentials:

- **Admin User**:
  - Email: admin@example.com
  - Password: admin123

- **Regular User**:
  - Email: user@example.com
  - Password: user123

## Project Structure

- `/client` - React frontend
- `/server` - Express backend
- `/uploads` - Uploaded files
- `/server/db` - Database schema and connection
- `/server/routes` - API routes
- `/server/middleware` - Express middleware

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Admin
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create a category
- `GET /api/admin/sections` - Get all sections
- `POST /api/admin/sections` - Create a section
- `POST /api/admin/sections/:id/variants` - Add a variant to a section
- `GET /api/admin/websites` - Get all websites
- `GET /api/admin/users` - Get all users

### Sites
- `GET /api/sites` - Get user's websites
- `POST /api/sites` - Create a website
- `GET /api/sites/:id` - Get a website
- `GET /api/sites/:id/sections` - Get website sections
- `POST /api/sites/:id/sections` - Add a section to a website
- `PATCH /api/sites/:id/sections/:ps_id` - Update a section
- `DELETE /api/sites/:id/sections/:ps_id` - Delete a section
- `POST /api/sites/:id/publish` - Publish a website
- `GET /api/sites/:id/export` - Export a website

## License

MIT