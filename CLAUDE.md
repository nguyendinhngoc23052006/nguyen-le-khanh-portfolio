# CLAUDE.md — rulebook for this portfolio site

This site is a **bilingual scrollytelling portfolio** for Nguyễn Lê Khanh
(b. 2007), applying for a content/media role on an environmental conservation
project. The whole site is a single-page, top-to-bottom narrative that surfaces
her bio one line at a time; each line earns its beat.

## Voice — non-negotiable

- **Warm, first-person.** Vietnamese copy uses **mình**, never formal register.
- **Persuasive, not resume-flat.** Every beat argues for her fit for a
  community-facing environmental content role.
- **Honest.** She's early-career and has no published work samples yet — say so
  where it matters (`SiteIsSample.tsx`), and let the site itself be the proof.
- **Bilingual parity.** Vietnamese is the source of truth; English matches
  meaning and rhythm, not word-for-word.

## The nine beats — order matters

1. Hero — name + year + one-liner
2. Belief — *"khám phá điều chưa từng tin mình có thể làm"*
3. Work — Student Union comms
4. Work — Contest content
5. Work — Event ideation & ops
6. Community — *"nội dung gần gũi với cộng đồng"*
7. Learning — *"ham học hỏi…"*
8. This site is the sample
9. Ready → Contact

Adding, removing, or reordering a beat means updating `src/content/beats.ts`
**and** the copy keys in both locale files in the same PR.

## Rules for editing

- **Every string goes through `t('key')`.** No hard-coded copy in JSX. If you
  add a key to `vi/common.json`, add its counterpart to `en/common.json` in the
  same commit.
- **Sections are dumb.** They read from `t()`, wrap a `PinnedBeat`, and pick a
  motif. Logic (scroll, i18n init) stays in `src/lib/` and `src/i18n.ts`.
- **Motion serves the read.** Text should still be legible without JS. Never
  add motion that traps the reader.
- **Do not invent work.** If she doesn't have a screenshot or a metric, don't
  fabricate one. The typographic testimony beats stand on their own.
- **Contact channel is email only** (`nglekhanh2507@gmail.com`) unless she
  adds more.

## Pipeline

- One branch strategy: PR → `main`, Cloudflare Pages deploys on merge.
- Env-var contract lives in `.env.example` — keep GitHub Actions secrets and
  Cloudflare Pages variables in sync with it.
