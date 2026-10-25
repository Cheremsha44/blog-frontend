# Blog Frontend

React single-page app for a blog: browse posts, read a post, register and log in, and manage your own posts from a profile page. It talks to a separate REST API.

**Live demo:** https://clever-moonbeam-39a68f.netlify.app
**Backend repository:** https://github.com/Cheremsha44/blog-api-backend

> The API runs on a free Render instance, so the first load after a period of inactivity can take up to ~50 seconds while the server wakes up.

<!-- Add a screenshot or GIF of the app here, e.g. ![Blog](docs/screenshot.png) -->

## Features

- Public feed with posts loaded from the API
- Post page with author and content
- Registration and login
- Session restored on page reload (token in `localStorage`, user fetched from `/api/auth/me`)
- Profile page with the user's own posts, including drafts
- Create posts as a draft or publish immediately
- Loading and error states for every request, form validation with inline messages

## Tech stack

| Area    | Tools                                                             |
| ------- | ----------------------------------------------------------------- |
| UI      | React, Vite                                                       |
| Routing | React Router (`createBrowserRouter`, nested layout with `Outlet`) |
| State   | `useState`, `useEffect`, Context API for authentication           |
| Styling | Tailwind CSS                                                      |
| Hosting | Netlify                                                           |

## How authentication works

1. The login or registration form sends credentials to the API and receives `{ user, token }`.
2. `AuthProvider` stores the token in `localStorage` and the user in React context, so the header and pages update immediately without a reload.
3. On app start the provider reads the token and asks `GET /api/auth/me` who the user is.
4. Requests that need authorization send `Authorization: Bearer <token>`.
5. Logout removes the token and clears the user.

## Project structure

```
src/
  components/    Header, Footer, RootLayout, PostCard, forms
  context/       auth context and AuthProvider
  lib/           API helpers and config
  pages/         Home, Post, Profile, Login, Registration, About, Contacts
  routes/        router configuration
```

## Getting started

Requirements: Node.js 20+ and the [backend](https://github.com/Cheremsha44/blog-api-backend) running locally on port 3000.

```bash
git clone https://github.com/Cheremsha44/blog-frontend
cd blog-frontend
npm install
npm run dev
```

The app opens on `http://localhost:5173`. In development the Vite dev server proxies `/api` to `http://localhost:3000`, so no extra configuration is needed.

### Environment variables

| Variable       | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the deployed API, without a trailing slash (leave unset locally) |

Vite inlines `VITE_*` variables at build time, so rebuild after changing them.

## Deployment

Deployed on Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL` set to the API origin
- `netlify.toml` rewrites all routes to `index.html` so deep links such as `/post/123` work after a refresh

The API must allow the site origin through its `CLIENT_URL` setting (CORS).

## Notes

- The JWT is kept in `localStorage`, which is simple but exposed to XSS. For a production system an httpOnly cookie would be safer.
- Access control is enforced by the API. Hiding buttons in the UI is only a convenience.

## Roadmap

- Edit posts from the profile page
- Pagination controls on the feed
- Comments UI on the post page
- Better handling of the API cold start

## Author

Built by [Cheremsha44](https://github.com/Cheremsha44).
