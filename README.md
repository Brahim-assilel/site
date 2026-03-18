# Assilel Tech

Site principal en `Vite + React`, incluant les pages marketing, les services, la section VoIP et le blog local.

## Scripts racine

```bash
npm run dev
npm run build
npm run lint
```

- `npm run dev` : lance le site Vite en local
- `npm run build` : génère le build de production
- `npm run lint` : vérifie le code

## Blog

Le blog est géré localement dans l'application Vite :

- `/blog`
- `/blog/:slug`

Sources principales :

- `src/data/blog.tsx` : contenu des articles
- `src/pages/BlogIndexPage.tsx` : listing
- `src/pages/BlogPostPage.tsx` : détail

## Formulaires

Les formulaires utilisent l'API locale `/api/form-submit`.

Variables serveur attendues :

- `RESEND_API_KEY`
- `FORM_FROM_EMAIL`

## Admin sécurisé

Routes disponibles :

- `/admin/login`
- `/admin`

Variables serveur requises :

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Publication d'articles (v1) :

- Interface disponible sur `/admin`
- Stockage persistant en base PostgreSQL (Neon)
- Variables serveur nécessaires: `DATABASE_URL` (ou `POSTGRES_URL`)
- Rate limit login admin persistant en base (fallback mémoire si DB indisponible)
