# AI Prototype Project – Standards & Rules

## Project Integrity

- **This is a Working Application**

  - **Do not edit or delete any existing files**.
  - Only add or extend functionality as required, while preserving the integrity of the existing codebase.
  - Do not edit or delete any files in `src/app/(protected)/examples`. just read this files as your reference.

## Naming & Importing

- Use **plural form** for resource names.

  - **Incorrect:** `book`, `user`
  - **Correct:** `books`, `users`

- Always use **snake_case** for:

  - API request payloads
  - API responses
  - API type definitions

## Shared Components & Example Data

- **Form Shared Component**

  - Create before you genereate code for Create or Update pages.
  - Path: `src/app/(protected)/[resource]/_components/form.jsx`
  - Must be reusable.

## Date Format

If you are requested to format the date, use functions in `@/utils/date-format`.
