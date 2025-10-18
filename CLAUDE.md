# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm install` - Install dependencies
- `pnpm run dev` - Start development server (runs on port 3000)
- `pnpm run build` - Build production bundle
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

### Setup Requirements
- Node.js LTS 20.12.1
- PNPM 8.14.1 (use `corepack enable`)
- Copy `.env.example` to `.env` for environment setup

## Architecture Overview

### Framework & Libraries
- **React 18** with Vite for build tooling
- **Ant Design v5.16.2** and **Admiral v2.0.0-beta.x** for UI components
- **React Router v7** with file-based routing system
- **React Query** for data fetching and state management
- **Zod** for validation

### Project Structure

#### File-Based Routing
The application uses file-based routing with these conventions:
- Pages: `**/page.jsx` files define routes
- Layouts: `**/layout.jsx` files define shared layouts
- Error boundaries: `**/error.jsx` files
- Loading states: `**/loading.jsx` files

#### Route Organization
- **Protected routes**: `src/app/(protected)/` - Requires authentication
- **Public routes**: `src/app/(public)/` - Open access
- **Auth routes**: `src/app/auth/` - Login/authentication

#### Key Directories
- `src/libs/` - Core libraries (axios, react-query, cookies, etc.)
- `src/utils/` - Utility functions (date formatting, permissions, etc.)
- `src/app/_components/providers/` - App-level providers (session, theme, etc.)

### Code Standards

#### Naming Conventions
- **Resource names**: Always use plural form (`books`, `users`, not `book`, `user`)
- **API data**: Use snake_case for request/response payloads and type definitions
- **File naming**: kebab-case for directories and files

#### Component Patterns
- **CRUD modules**: Follow the example patterns in `src/app/(protected)/examples/`
  - List page: `[resource]/page.jsx`
  - Detail page: `[resource]/[id]/page.jsx`
  - Create page: `[resource]/create/page.jsx`
  - Update page: `[resource]/[id]/update/page.jsx`
  - Shared form: `[resource]/_components/form.jsx`
  - Data file: `[resource]/_data/index.js`

#### Menu Management
- Update sidebar menu in `src/app/(protected)/_utils/menu.jsx`
- Use role-based permissions with `permissions` array
- Available roles defined in `src/app/(protected)/_utils/role-list.js`

### Development Guidelines

#### Before Creating New Features
1. **Study examples first**: Always reference `src/app/(protected)/examples/movies/` and `src/app/(protected)/examples/books/`
2. **Update sidebar menu**: Add new routes to `SIDEBAR_ITEMS` with appropriate permissions
3. **Create dummy data**: Generate realistic test data in `_data/index.js`
4. **Use shared components**: Leverage Admiral/Antd components consistently

#### Component Usage
- **Section component**: From Admiral for page sections
- **DataTable/ActionTable**: For list views with filtering and actions
- **Form validation**: Use Zod schemas
- **Date formatting**: Use utilities in `@/utils/date-format`
- **Permissions**: Use `useSession` hook for role-based rendering

#### Path Aliases
- `@/` - Points to `src/`
- `@protected/` - Points to `src/app/(protected)/`

### File Organization Rules
- **Never edit/delete existing files** in `src/app/(protected)/examples/` - use as reference only
- **Preserve existing functionality** when adding new features
- **Follow existing patterns** for consistency
- **Create reusable components** before building pages that need them

### Data Management
- All API interactions go through `src/libs/axios/`
- Use React Query for data fetching and caching
- Session management via `src/app/_components/providers/session.jsx`
- Cookie utilities in `src/libs/cookies/`

This architecture supports rapid CRUD development while maintaining consistency and scalability across the application.