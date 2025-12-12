# Frontend Details

## Stack
- Vite + React 18
- Tailwind CSS
- React Router v6
- Axios for API calls

## Structure
- `client/src/App.jsx:1` – Routes and layout
- Components:
  - `client/src/components/Header.jsx:1`
  - `client/src/components/Footer.jsx:1`
  - `client/src/components/Hero.jsx:1`
  - `client/src/components/PostCard.jsx:1`
  - `client/src/components/ContactForm.jsx:1`
- Pages:
  - `client/src/pages/Home.jsx:1` – Landing UI
  - `client/src/pages/BlogList.jsx:1` – List + search + pagination
  - `client/src/pages/BlogPost.jsx:1` – Article by slug
  - `client/src/pages/AdminLogin.jsx:1` – Admin auth
  - `client/src/pages/AdminPosts.jsx:1` – Admin CRUD UI
- API helper: `client/src/lib/api.js:1` – BaseURL + auth header from `localStorage`

## Env
- `client/.env` → `VITE_API_URL=http://localhost:5000`

## Auth Handling
- On login success, token stored in `localStorage` as `token`
- Axios interceptor sets `Authorization: Bearer <token>` header
- Admin pages redirect to login if 401 is returned

## Tailwind Setup
- Config: `client/tailwind.config.js:1`
- Styles: `client/src/index.css:1`

## Building
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

