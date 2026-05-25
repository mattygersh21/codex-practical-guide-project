# Repository Guidelines

## General Instructions

- ALWAYS run bun run format AFTER you're done with your task and you edited all files that needed editing
- ALWAYS run bun run lint after making any changes => fix any linting errors you get
- ALWAYS check for type errors via bun tsc --noEmit

## Project Structure & Module Organization

This repository is a Next.js App Router project using TypeScript and Bun.

- `app/`: Application routes, layouts, and global styles (`page.tsx`, `layout.tsx`, `globals.css`).
- `public/`: Static assets served directly.
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.
- Planning/spec docs: `SPEC.MD`.

Keep route-specific UI and logic together under `app/` and prefer small, focused components.

## Build, Test, and Development Commands

Use Bun scripts defined in `package.json`:

- `bun dev`: Start local dev server on `http://localhost:3000`.
- `bun run build`: Create a production build.
- `bun start`: Run the production server.
- `bun run lint`: Run `oxlint` for static analysis.
- `bun run format`: Format code with `oxfmt`.

Run `bun run lint && bun run build` before opening a PR.

## Coding Style & Naming Conventions

- Language: TypeScript (`.ts` / `.tsx`), React 19, Next.js 16.
- Indentation: 2 spaces; keep imports grouped and sorted logically.
- Components: `PascalCase` for component names; hooks/utilities in `camelCase`.
- Route files follow Next.js conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, etc.).
- Prefer functional components and explicit prop types.

Use `bun run format` and `bun run lint` to enforce style and quality.

## Commit & Pull Request Guidelines

Git history is not available in this workspace snapshot, so follow this standard:

- Commit format: `type(scope): short summary` (for example, `feat(auth): add login form`).
- Keep commits focused; avoid mixing refactors with feature behavior changes.
- PRs should include: purpose, key changes, validation steps, and screenshots for UI updates.
- Link related issues/tasks and call out any follow-up work.

## Security & Configuration Tips

- Do not commit secrets; use `.env.local` for local environment variables.
- Review dependency updates carefully and keep lockfile changes intentional (`bun.lock`).
