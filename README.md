# Gorsi Nama

A digital community and heritage platform for the Gorsi community — history, stories, people, and a shared space for members to connect.

## Tech stack

- [Next.js](https://nextjs.org) (App Router), React, TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query) for server-state
- React Hook Form + Zod for forms
- Clerk (auth), Neon + Drizzle ORM (database) — planned, not yet wired in

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in any required values before running.

The production site is deployed on Vercel at [https://community.argorsi.com/](https://community.argorsi.com/). See [`doc/deployment.md`](doc/deployment.md).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run a production build
- `npm run lint` — lint the codebase
