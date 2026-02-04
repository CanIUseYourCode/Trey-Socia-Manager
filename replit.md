# Social Manager

A personal content management platform built with React, TypeScript, and Tailwind CSS.

## Overview

This is a Vite-based React application that provides a content management interface with sidebar navigation.

## Project Structure

- `src/` - Main application source code
  - `components/` - Reusable UI components
  - `contexts/` - React context providers
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `pages/` - Page components
- `public/` - Static assets

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: TanStack React Query

## Development

The application runs on port 5000 via `npm run dev`.

## Recent Changes

- 2026-02-04: Migrated from Lovable to Replit environment
  - Updated Vite config to use port 5000 with `allowedHosts: true`
  - Removed lovable-tagger plugin dependency from vite config
  - Configured static deployment
