# API Reference

Base URL: `http://localhost:5000`

## Auth
- POST `/api/auth/login`
  - Body (JSON): `{ "email": string, "password": string }`
  - 200: `{ token: string, user: { id, email, name, role } }`
  - 401 if invalid credentials

Example:
```
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123!"}'
```

## Posts (Public)
- GET `/api/posts`
  - Query: `page` (default 1), `limit` (<=50, default 10), `search`
  - 200: `{ total, page, pages, items: Post[] }`

- GET `/api/posts/:slug`
  - 200: `Post`
  - 404 if not found

## Admin (JWT)
- POST `/api/admin/posts`
  - Headers: `Authorization: Bearer <token>`
  - Content-Type: `multipart/form-data`
  - Fields: `title` (required), `excerpt`, `content` (required), `published` (`true`|`false`), `categories` (comma), `tags` (comma), file `coverImage`
  - 201: created `Post`

- PUT `/api/admin/posts/:id`
  - Same fields; `coverImage` optional; categories/tags replaced if provided
  - 200: updated `Post`

- DELETE `/api/admin/posts/:id`
  - 200: `{ ok: true }`

## Post Object
```
{
  id: number,
  title: string,
  slug: string,
  excerpt?: string,
  content: string,
  coverImage?: string, // path like /uploads/<file>
  published: boolean,
  authorId: number,
  author: { id, email, name, role },
  categories: [{ id, name }],
  tags: [{ id, name }],
  createdAt: string,
  updatedAt: string
}
```

