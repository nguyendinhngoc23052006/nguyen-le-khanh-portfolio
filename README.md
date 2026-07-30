# nguyen-le-khanh-portfolio

Bilingual (Vietnamese / English) scrollytelling portfolio for **Nguyễn Lê Khanh** —
content & media, applying for an environmental conservation project.

Built with Vite + React + TypeScript + Tailwind, animated with GSAP ScrollTrigger
and Lenis smooth-scroll, translated with react-i18next, deployed to Cloudflare
Pages via GitHub Actions.

## Structure

- `src/sections/` — the nine narrative beats read top to bottom
- `src/components/PinnedBeat.tsx` — the reusable pinned scroll block
- `src/locales/{vi,en}/common.json` — every string; no copy is hard-coded in JSX
- `src/lib/scroll.ts` — Lenis + ScrollTrigger initialization
- `src/content/beats.ts` — narrative order and per-beat motif keys

## Local dev

Not required — Claude Code edits in a cloud sandbox and Cloudflare Pages builds
on merge to `main`. If you do want to run it locally:

```
npm install
npm run dev
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to Cloudflare Pages on every
push to `main`. Configure `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and
`CLOUDFLARE_PROJECT_NAME` as repository secrets.
