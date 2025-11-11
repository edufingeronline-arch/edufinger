# Backend Details

## Structure
- `server/src/index.js:1` – App bootstrap (Express, CORS, Helmet, static `/uploads`)
- `server/src/middleware/auth.js:1` – JWT verification middleware
- `server/src/routes/auth.js:1` – `POST /api/auth/login`
- `server/src/routes/posts.js:1` – Public and admin post routes, multer config
- `server/src/controllers/authController.js:1` – Login handler
- `server/src/controllers/postsController.js:1` – List/search/paginate, get by slug, create/update/delete
- `server/prisma/schema.prisma:1` – Prisma schema
- `server/prisma/seed.js:1` – Seed admin and sample content

## Middleware
- Helmet: security headers
- CORS: origin allowlist via `CORS_ORIGIN`
- morgan: request logs
- JSON/urlencoded: body parsing
- Static `/uploads`: serve uploaded images

## Auth
- `POST /api/auth/login` accepts `{ email, password }`
- bcrypt compares password hash
- JWT signed with `JWT_SECRET`, 7d expiry
- `auth` middleware checks `Authorization: Bearer <token>`

## Posts API
- `GET /api/posts` – public list, supports `page`, `limit` (<=50), `search`
- `GET /api/posts/:slug` – public detail
- Admin (JWT):
  - `POST /api/admin/posts` – `multipart/form-data` with `coverImage` and fields
  - `PUT /api/admin/posts/:id` – `multipart/form-data` optional image
  - `DELETE /api/admin/posts/:id`

## Multer Uploads
- Disk storage under `server/uploads` with filename `timestamp_original.ext`
- Only image MIME types allowed; 5MB limit
- For S3, replace disk storage in `server/src/routes/posts.js:1`

## Prisma & DB
- Run migrations: `npm run migrate`
- Generate client automatically as part of Prisma workflow
- Seed: `npm run seed` creates admin and sample categories/tags/post

## Validation
- Required fields checked in controllers (`title`, `content`)
- Basic error handling with HTTP status codes

