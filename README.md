# Interview Task

A bare-bones Next.js scaffold for building a single section.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **SCSS Modules** + global styles in `styles/`
- **GSAP** (latest) + **@gsap/react** (`useGSAP`)
- **Objectivity** local font (Light / Regular / Medium)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Formatting

This project uses [Prettier](https://prettier.io) (config in `.prettierrc`).
Please submit formatted code — either enable "Format on Save" with the
Prettier VS Code extension, or run:

```bash
npm run format        # format all files in place
npm run format:check  # verify formatting without writing
```

## Project structure

```
app/
  layout.tsx          # Root layout — loads the Objectivity font + global styles
  page.tsx            # Renders the section
styles/
  globals.scss        # Global import for the root layout
  _normalize.scss     # modern-normalize
  _style-delete.scss  # element reset
  _breakpoints.scss   # breakpoint mixins + device-only classes
  _base.scss          # very basic base styles
  _index.scss         # @forward entry for partials (@use '@/styles' as *)
components/
  sections/
    TestSection/      # Example section — replace with your implementation
      TestSection.tsx
      TestSection.module.scss
public/
  fonts/Objectivity/  # woff2 font files
```

## The task

Build your section under `components/sections/`. The provided `TestSection`
shows the conventions to follow:

- A component co-located with its `.module.scss`.
- A small `useGSAP` animation (from `@gsap/react`).
- The Objectivity font is available globally via the `--font-objectivity`
  CSS variable.

Reuse the SCSS partials in `styles/` from a module with
`@use '@/styles' as *;` (exposes the breakpoint mixins). Use the `@/*`
import alias to reference files from the project root.
