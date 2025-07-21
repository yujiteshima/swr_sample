# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
返答は必ず日本語でお願いします。

## Project Structure

This is a Next.js 15.4.2 project using the App Router architecture with TypeScript. The main application code is located in the `swr-sample/` subdirectory.

- `swr-sample/src/app/`: App Router pages and layouts
  - `page.tsx`: Main home page component
  - `layout.tsx`: Root layout with font configuration
  - `globals.css`: Global styles
- `swr-sample/public/`: Static assets (SVG icons)
- Configuration files in `swr-sample/`: Next.js, TypeScript, ESLint, PostCSS, Tailwind CSS

## Development Commands

All commands should be run from the `swr-sample/` directory:

```bash
cd swr-sample

# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Tech Stack

- **Framework**: Next.js 15.4.2 with App Router
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Bundler**: Turbopack (in development)
- **Linting**: ESLint with Next.js config

## Architecture Notes

- Uses App Router (not Pages Router)
- Font optimization with next/font/google for Geist font family
- Tailwind CSS v4 for styling with CSS variables for fonts
- Standard Next.js project structure with minimal custom configuration
- No test framework currently configured

## Working Directory

The actual Next.js project is in the `swr-sample/` subdirectory, not the repository root.