# FluentLoop

FluentLoop is an AI-powered English speaking coach and interview simulator built with React. The app is designed to help learners practice real-world conversations, prepare for interviews, receive AI-driven feedback, and monitor their English speaking progress over time.

> **Note:** The current version is a mock frontend-only experience. Future versions will integrate Supabase and OpenAI for genuine AI-powered conversations, persistent session history, and speech features.

## Features

### MVP

- Daily English practice mode
- Interview simulation mode
- English proficiency level selection (A1–C1)
- Topic and role-based practice sessions
- Chat-based conversation interface
- Mock AI-generated responses
- Mock feedback for grammar, vocabulary, and fluency
- Session summaries and score reports

### Planned Enhancements

- Supabase authentication
- Session history tracking and persistent feedback
- OpenAI-driven conversation and feedback
- Automated correction, scoring, and feedback reports
- Integrated speech-to-text and text-to-speech
- Voice-based interview simulation
- Personal vocabulary notebook
- Learning streaks and progress dashboard

## Tech Stack

- **Frontend:** React, Vite, TypeScript, React Router, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, React Hook Form, Zod
- **Backend / Platform (Planned):** Supabase Auth, Supabase Database, Supabase Edge Functions, OpenAI API
- **Tooling:** ESLint, Prettier, Husky, lint-staged, Commitlint, Vitest, Testing Library

## Architecture

FluentLoop uses an adapted Clean Architecture for React projects, organizing code for testability and maintainability.

```
src/
  app/
    router.tsx
    providers.tsx

  shared/
    components/
    hooks/
    lib/
    types/

  features/
    practice/
      domain/
      application/
      infrastructure/
      presentation/

    interview/
      domain/
      application/
      infrastructure/
      presentation/

    dashboard/
      presentation/

    feedback/
      domain/
      presentation/

    history/
      domain/
      application/
      infrastructure/
      presentation/
```

- Presentation → Application → Domain
- Infrastructure → Domain

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

### Build

```sh
pnpm build
```

### Preview Production Build

```sh
pnpm preview
```

## Quality Checks

- **Lint:** `pnpm lint`
- **Fix Lint Issues:** `pnpm lint:fix`
- **Format:** `pnpm format`
- **Check Formatting:** `pnpm format:check`
- **Type Check:** `pnpm typecheck`
- **Test:** `pnpm test`
- **Run Tests Once:** `pnpm test:run`

## Environment Variables

Once Supabase integration is added, provide the following in `.env.local`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

**Never expose private API keys in the frontend.**
`OPENAI_API_KEY` should only be used in Supabase Edge Functions or backend services.

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

**Examples:**

- `feat: add practice session setup`
- `fix: correct feedback score rendering`
- `chore: configure husky and lint-staged`
- `test: add practice session hook tests`

---

**Project Status:** Early planning and setup phase.
