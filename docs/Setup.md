# Setup & Run

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+ (or Docker Desktop)

## Environment Variables
- Server: copy `server/.env.example` → `server/.env`
  - `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/blog?schema=public`
  - `JWT_SECRET=change_this_in_production`
  - `PORT=5000`
  - `CORS_ORIGIN=http://localhost:5173` (match your Vite URL)
- Client: copy `client/.env.example` → `client/.env`
  - `VITE_API_URL=http://localhost:5000`

## Start Database (Docker Optional)
From repo root:
- `docker compose up -d` (starts local Postgres)

## Install Dependencies
- Backend: `cd server && npm install`
- Frontend: `cd ../client && npm install`

## Migrate & Seed
- `cd ../server`
- `npm run migrate`
- `npm run seed` (creates admin `admin@example.com` / `Admin123!` and sample data)

## Run Dev Servers
- Backend: `npm run dev` (http://localhost:5000)
- Frontend: `cd ../client && npm run dev` (http://localhost:5173)

## Health Check
- Open `http://localhost:5000/api/health` → `{ ok: true }`

## Production Notes
- Use a strong `JWT_SECRET` in `server/.env`.
- Point `DATABASE_URL` to your production Postgres.
- Serve the frontend build via a static host/edge and proxy API.
- Consider moving uploads to S3 (see `server/src/routes/posts.js:1`).

