# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**AnisPort** is a personal portfolio website for Durga Vara Prasad — a static, client-side React SPA with a neo-brutalist aesthetic. Features include a matrix rain hero animation, interactive terminal (Ctrl+K), GitHub contribution graph, and WhatsApp-integrated contact form. **No backend, no API routes, no environment variables.**

Live demo: https://vara-s-portfolio.vercel.app/

---

## Development Commands

```bash
npm run dev          # Start dev server at http://localhost:8080
npm run build        # Production build → dist/
npm run build:dev    # Dev-mode build (for debugging)
npm run preview      # Serve the dist/ build locally
npm run lint         # Run ESLint
npm run test         # Run tests once (Vitest)
npm run test:watch   # Run tests in watch mode
npm run type-check   # TypeScript type checking (tsc --noEmit)
npm run format       # Format all files with Prettier

# Run a single test file
npx vitest run src/test/example.test.ts

# Add a new shadcn/ui component
npx shadcn@latest add <component-name>
```

---

## Architecture

### App Structure

`src/App.tsx` sets up global providers (QueryClient, TooltipProvider, Toaster, Sonner) and React Router. The single route (`/`) renders `src/pages/Index.tsx`, which composes all portfolio sections in order. A catch-all route serves `NotFound.tsx`.

### Section Composition Pattern

Every portfolio section is a standalone component in `src/components/` that wraps its content in `<SectionBlock>`, which provides consistent fade-in scroll animation via IntersectionObserver. The render order in `Index.tsx` is: Navbar → HeroSection → AboutSection → EducationSection → ExperienceSection → ProjectsSection → BlogSection → SkillsSection → ContactSection → Finale.

Global overlays (CustomCursor, EasterEgg, ScrollToTop, Terminal) render alongside sections but are not wrapped in SectionBlock.

### Key Components with Special Behavior

- **HeroSection.tsx** — Canvas-based matrix rain using `requestAnimationFrame`. The animation loop **must** be cancelled in the `useEffect` cleanup to avoid memory leaks.
- **Terminal.tsx** — Global keyboard shortcut (`Ctrl+K`) for open/close. Internal command registry; add new commands to the handler inside the component.
- **ContactSection.tsx** — Constructs WhatsApp deep links from form fields. Phone number and email are **hardcoded** in the component.
- **GithubGraph.tsx** — Uses `react-github-calendar` with username `VARA4u-tech` (hardcoded).

### Path Alias

All src imports use `@/` alias: `import { cn } from "@/lib/utils"`. Configured in `vite.config.ts`, `vitest.config.ts`, and `tsconfig.json`.

---

## Key Conventions

### Styling
- **Tailwind utility classes** are the primary styling method
- Theme-aware colors via CSS variables: `bg-background`, `text-foreground`, `text-primary`, etc.
- Custom utility classes in `src/index.css`: `heading-brutal`, `section-title`, `body-text`, `nav-link`
- Dark mode is class-based (`dark` on `<html>`) via `next-themes`
- Prefer CSS keyframes (in `index.css`) or `tailwindcss-animate` utilities over inline style animations

### TypeScript
- Strict mode is **off** (`strictNullChecks: false`, `noImplicitAny: false`)
- Type annotations are pragmatic, not exhaustive

### State Management
- Local: `useState` / `useReducer`
- Server/async: TanStack React Query (provider is set up in App.tsx)
- Global UI: React Context only — no Redux or Zustand

### Testing
- Vitest with globals enabled — no `import { describe, it, expect }` needed
- `@testing-library/react` for component rendering
- `window.matchMedia` is mocked in `src/test/setup.ts`
- Tests go in `src/test/` or co-located as `*.test.tsx` / `*.spec.tsx`

---

## What NOT to Do

- Do not add server-side code or API routes — this is a static site
- Do not add Redux, Zustand, or other global state libraries
- Do not import from `@radix-ui/*` directly — use `@/components/ui/` wrappers
- Do not modify `src/components/ui/` files manually — use `npx shadcn@latest add`
- Do not skip `<SectionBlock>` wrapper for new portfolio sections
- Do not introduce environment variable requirements without updating this file
- All config (social links, contact info, GitHub username) is hardcoded in components — update directly

---

## Adding New Portfolio Sections

1. Create `src/components/YourSection.tsx`
2. Wrap content with `<SectionBlock id="your-section" title="Your Title">`
3. Import and add to `src/pages/Index.tsx` in the desired position
4. Add a nav link in `Navbar.tsx` pointing to `#your-section`

---

## Git & Branching

- Main branch: `master`
- Feature branches: descriptive names, e.g., `feature/add-blog-section`
- No CI/CD pipeline or automated deployment configured
