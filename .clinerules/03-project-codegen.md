# AI Prototype Project – Code Generation Guidelines

## Code Generation

### CRITICAL: Example Module Reference

**ALWAYS use the example modules as your primary reference when creating any feature or component.**

- **Example modules location**: `src/app/(protected)/examples/`
- **Available examples**:
  - `movies/` - Example with tabs and complex listing
  - `books/` - Standard CRUD example
- **Rule**: Study the example modules first, then replicate the exact patterns, structure, and implementation approach
- **Forbidden**: Creating custom implementations that deviate from example patterns

### IMPORTANT: BEFORE CREATING A PAGE

- If a resource belongs to a **Parent Menu**, follow this structure:

  - **Path:** `src/app/(protected)/[parent]/[resource]/page.jsx`
  - **Example:** `src/app/(protected)/managements/inventories/page.jsx`

- Always refer to the example files when creating a page. Do not create extra functions or features not mentioned in the example files.

### Update Sidebar Menu

Before create the pages. Update the sidebar menu first.

- Preserve all existing menu items.

- Add `[resource]` to `SIDEBAR_ITEMS` in `src/app/(protected)/_utils/menu.jsx`.

- Use role-based visibility with the `permissions` field.

- Example:

  ```jsx
  {
    key: "/books",
    label: <Link to={"/books"}>Books</Link>,
    icon: <BookOutlined />,
    permissions: ["Admin", "Marketing"],
  },
  ```

- If user request for parent menu the menu should be like this:

  ```jsx
  {
    key: "/managements",
    label: "Managements",
    icon: <MailOutlined />,
    children: [
      {
        key: "/managements/inventories",
        label: <Link to={"/managements/inventories"}>Inventory</Link>,
        permissions: ["Marketing"],
      },
    ],
  }
  ```

- Use `permissions: ["All"]` for universal access.

- Role names must match `src/app/(protected)/_utils/role-list.js`. If the role doesn't exist, add it yourself.

- Use `MailOutlined` from `@ant-design/icons` as default.

### Create Dummy Data

- **Path:** `src/app/(protected)/[resource]/_data/index.js`
- **Notes:**

  - This dummy data is used for all pages.
  - Create meaningful data.
    - **Incorrect:** `{ title: "Song 1", artist: "Artist 1" }`
    - **Correct:** `{ title: "Bohemian Rhapsody", artist: "Queen" }`
  - If user provide example data, follow the example.
  - Follow this structure data:
    ```js
    const listSong = {
      status_code: 200,
      data: {
        items: [{ title: "Bohemian Rhapsody", artist: "Queen" }],
        meta: {
          total_page: 1,
          total: 10,
          page: 1,
          per_page: 10,
        },
        version: "1.0.0",
      },
    };
    ```

### List Page (Read)

- **Path:** `src/app/(protected)/[resource]/page.jsx`
- **Reference:** `src/app/(protected)/examples/movies/page.jsx` or `src/app/(protected)/examples/books/page.jsx`
- **Notes:**

  - Include search, filter, and sort functionality.
  - Provide navigation options: create, edit, and view.
  - **Do not include any extra fields** beyond the specification.

#### Understand the List Page Type

- If user request for list with Tab, follow the example in this file `src/app/(protected)/examples/movies/page.jsx`.
- Besides follow the example in `src/app/(protected)/examples/books/page.jsx`

### Detail Page (Read)

- **Path:** `src/app/(protected)/[resource]/[id]/page.jsx`
- **Reference:** `src/app/(protected)/examples/movies/[id]/page.jsx` or `src/app/(protected)/examples/books/[id]/page.jsx`
- **Notes:**

  - Display detailed information for the selected item from list page.

### Shared Form Component

- **Create this component before generate code for Create and Update pages.**
- **Path:** `src/app/(protected)/[resource]/_components/Form.jsx`
- **Reference:** `src/app/(protected)/examples/movies/_components/Form.jsx` or `src/app/(protected)/examples/books/_components/Form.jsx`
- **Notes:**

  - Create this form only if user request for Edit or Create page.
  - This component is shared between the Create and Update pages.
  - Apply basic validation rules.

### Edit Page (Update)

- **Path:** `src/app/(protected)/[resource]/[id]/update/page.jsx`
- **Reference:** `src/app/(protected)/examples/movies/[id]/update/page.jsx` or `src/app/(protected)/examples/books/[id]/update/page.jsx`
- **Features:**

  - Create this page only if user request
  - Display a form pre-filled with the current item data.
  - Display a form for editing the current item data.

### Create Page (Create)

- **Path:** `src/app/(protected)/[resource]/create/page.jsx`
- **Reference:** `src/app/(protected)/examples/movies/create/page.jsx` or `src/app/(protected)/examples/books/create/page.jsx`
- **Features:**

  - Create this page only if user request
  - Display a form for creating a new item.

---

### Public Route

- **Path:** `src/app/(public)/[resource]/page.jsx`
- **Reference:** `src/app/(public)/example-landing/page.jsx`
- **Notes:**

  - Generate this page **only if** the user explicitly requests a public route, such as a landing page.
  - If no public route is requested, **do not create** this page.
  - Follow the pattern on protected module.

Follow these guidelines strictly to maintain project consistency and quality.
