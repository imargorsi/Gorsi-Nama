# Gujjar Nama

A digital archive and community platform documenting the history, people, stories, heritage, and collective memory of the Gujjar people.

**Tagline:** Our People. Our Stories. Our Heritage.

Gorsi remains a documented clan within this platform. See [`doc/rebrand.md`](doc/rebrand.md) for the Gorsi Nama → Gujjar Nama migration notes.

## Tech stack

- [Next.js](https://nextjs.org) (App Router), React, TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query) for server-state
- React Hook Form + Zod for forms
- Clerk (auth), Neon + Drizzle ORM (database), Cloudflare R2 (uploads)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in any required values before running.

The production site is deployed on Vercel at [https://gorsinama.online/](https://gorsinama.online/). See [`doc/deployment.md`](doc/deployment.md).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run a production build
- `npm run lint` — lint the codebase
