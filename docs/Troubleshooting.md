# Troubleshooting

## Admin Login Fails
- 401 Unauthorized:
  - Seed not run: `cd server && npm run seed`
  - Typo in credentials: use `admin@example.com` / `Admin123!`
- CORS error in browser:
  - Ensure `server/.env` `CORS_ORIGIN` matches your site origin exactly (e.g., `http://localhost:5173`).
  - During dev, temporarily leave `CORS_ORIGIN` blank to allow all.
- 500 Server error:
  - Check `DATABASE_URL` in `server/.env`
  - Ensure Postgres is running (`docker compose up -d` or local service)
  - Run `npm run migrate`

## Cannot Connect to DB
- Verify Postgres is up and accepting connections on port 5432.
- If using Docker, ensure credentials match `DATABASE_URL`.
- Windows: check firewall or services; try `localhost` instead of `127.0.0.1` (or vice versa).

## Uploads Not Showing
- Confirm files exist in `server/uploads`.
- Ensure server started and static path is mounted: `GET /uploads/<filename>`.
- In the client, ensure `VITE_API_URL` is set and the URL uses `VITE_API_URL + coverImage`.

## Migrations/Prisma Issues
- Delete `.prisma/client` cache if needed and rerun `npm run migrate`.
- Confirm schema changes are migrated; avoid editing DB directly without updating Prisma.

## Port Conflicts
- Change `PORT` in `server/.env` or Vite `client/vite.config.js:1`.

