# Overview

This project is a full‑stack blogging platform with:

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express + Prisma
- Database: PostgreSQL
- Auth: JWT (email/password) with bcrypt hashing
- File uploads: multer to local `server/uploads`

## Monorepo Layout
- `server/` — Express API, Prisma schema, seed, uploads
- `client/` — React app, Tailwind, pages, admin UI

## Core Features
- Responsive landing page (hero, founder, features, testimonials, contact)
- Blog list with pagination and search
- Post detail via `slug`
- Admin login; admin CRUD for posts (create/update/delete) with cover image upload

## Data Model
- User (admin): email, password hash, role
- Post: title, slug, excerpt, content, coverImage, published, author
- Category: many‑to‑many with Post
- Tag: many‑to‑many with Post

Prisma schema: `server/prisma/schema.prisma:1`

## Request Flow
1. Client calls API on `VITE_API_URL` (e.g., `http://localhost:5000`).
2. Public endpoints: list posts and get by slug.
3. Admin login: `POST /api/auth/login` → receive JWT.
4. Admin actions add `Authorization: Bearer <token>` header.
5. File upload uses `multipart/form-data` with `multer` saving to `server/uploads`.

## Auth Flow
1. Seed creates admin (`admin@example.com` / `Admin123!`).
2. Login returns JWT signed with `JWT_SECRET`.
3. `auth` middleware verifies token for `/api/admin/*` routes.

## Uploads Flow
1. `multer` stores an image file on disk under `server/uploads`.
2. Express statically serves `/uploads/*` paths.
3. Frontend constructs absolute URL with `VITE_API_URL + coverImage`.

