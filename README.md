# Full‑Stack Blogging Website (React + Node + Prisma)

This repo contains a complete blogging platform with a React (Vite) + Tailwind frontend and a Node.js + Express + Prisma backend using PostgreSQL, JWT auth, and multer for cover image uploads.

## Features
- Responsive landing page (hero banner, founder section, features grid, testimonials, contact form, footer)
- Blog listing with pagination and search; blog post detail by slug
- Admin login (email/password), JWT‑protected CRUD for posts (with cover image upload)
- Prisma ORM with PostgreSQL: User, Post, Category, Tag
- Secure defaults: CORS, Helmet, basic input validation
- Seed script creates initial admin and sample content

## Tech Stack
- Frontend: React (Vite) + Tailwind CSS + React Router + Axios
- Backend: Node.js + Express + Prisma ORM
- Auth: bcrypt password hashing + JWT tokens
- Uploads: multer saving images to `server/uploads`
- Database: PostgreSQL (Docker optional)

## Monorepo Structure
- `server/` – Express API + Prisma + seed + uploads
- `client/` – React app with Tailwind and admin UI

## Quick Start

### 1) Backend setup
1. Create env file:
   - Copy `server/.env.example` to `server/.env` and update values.
2. Install dependencies:
   - `cd server && npm install`
3. Start PostgreSQL (Docker optional):
   - From repo root: `docker compose up -d` (optional) or use your own Postgres.
4. Run Prisma migrations and seed:
   - `npm run migrate`
   - `npm run seed`
5. Start the server:
   - Dev: `npm run dev`
   - Prod: `npm start`

Server runs on `http://localhost:5000` by default.

### 2) Frontend setup
1. Create env file:
   - Copy `client/.env.example` to `client/.env` and update `VITE_API_URL` (e.g., `http://localhost:5000`).
2. Install dependencies:
   - `cd client && npm install`
3. Run the dev server:
   - `npm run dev`
4. Build & preview:
   - `npm run build && npm run preview`

Frontend dev server (Vite) runs on `http://localhost:5173` by default.

## Default Admin
- Email: `admin@example.com`
- Password: `Admin123!`

These are created by the seed script. To change defaults, update `server/prisma/seed.js:20` and re‑seed (or update via DB/admin UI).

## Environment Variables

Backend (`server/.env`):
- `DATABASE_URL` – your Postgres connection string
- `JWT_SECRET` – change for production
- `PORT` – optional, defaults to 5000
- `CORS_ORIGIN` – allowlist for frontend origin (e.g., `http://localhost:5173`)

Frontend (`client/.env`):
- `VITE_API_URL` – API base URL (e.g., `http://localhost:5000`)

## API

Public:
- `GET /api/posts` – list posts with pagination and search
  - Query: `page`, `limit`, `search`
- `GET /api/posts/:slug` – get a post by slug

Auth:
- `POST /api/auth/login` – body: `{ email, password }` → `{ token, user }`

Admin (JWT required):
- `POST /api/admin/posts` – `multipart/form-data` with fields: `title`, `excerpt`, `content`, `published` ("true"/"false"), `categories` (comma list), `tags` (comma list), and file field `coverImage`
- `PUT /api/admin/posts/:id` – same fields as create (file optional)
- `DELETE /api/admin/posts/:id`

## Code References
- Auth middleware: `server/src/middleware/auth.js:1`
- Create post (multer handling): `server/src/routes/posts.js:1` and `server/src/controllers/postsController.js:1`
- Prisma schema: `server/prisma/schema.prisma:1`
- Admin CRUD UI: `client/src/pages/AdminPosts.jsx:1`
- Fetch posts: `client/src/pages/BlogList.jsx:1`

## Changing Configs for Production
- JWT secret: update `server/.env` (`JWT_SECRET`).
- Database: update `server/.env` (`DATABASE_URL`). See `docker-compose.yml` for local Docker DB.
- File storage (S3): replace local multer disk storage in `server/src/routes/posts.js:1` with an S3 SDK‑backed storage engine (e.g., `multer-s3`). Update the URL generation (serve from CDN/S3 instead of `/uploads`).

## NPM Scripts

Backend (from `server/`):
- `dev` – start dev server with nodemon
- `start` – start production server
- `migrate` – run Prisma migrations (`prisma migrate dev`)
- `seed` – seed database with admin and sample data

Frontend (from `client/`):
- `dev` – start Vite dev server
- `build` – build production assets
- `preview` – preview the production build

## Docker (optional)
From the repo root:
- `docker compose up -d` – starts Postgres

Update `DATABASE_URL` to match the service if needed (see `server/.env.example`).

## Documentation
- Overview: `docs/Overview.md:1`
- Setup & Run: `docs/Setup.md:1`
- Backend Details: `docs/Backend.md:1`
- Frontend Details: `docs/Frontend.md:1`
- API Reference: `docs/API.md:1`
- Troubleshooting: `docs/Troubleshooting.md:1`

---

Happy blogging! If you want me to run a smoke test or wire up additional validations or S3 uploads, let me know.
