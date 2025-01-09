# Article Summarizer

A fullstack web application that automatically summarizes and saves web articles. Built with Next.js, Supabase, and AI.

## Features

- Save and summarize articles from any URL
- AI-powered article summarization and tagging
- Search and filter your article library
- Track reading progress and add ratings
- Chrome extension for easy saving (coming soon)
- Dark/light theme with keyboard shortcuts

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Supabase (Auth & Database)
- Tailwind CSS & shadcn/ui
- Readability.js for article parsing
- Claude AI for summarization

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables (see `.env.example`)
4. Run development server: `pnpm dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

The app uses two main tables:

- `articles`: Stores article content, summaries, and metadata
- `user_articles`: Tracks user-specific data like read status and ratings

See `TODO.md` for planned features and roadmap.
