# Understand the component

## Section from Admiral

Examples:

```jsx
<Section
  title="Detail Information"
  loading={false}
  actions={[<Button key="1" type="primary">Add Tax Type</Button>]}
></Section>
```

### Important Note

If the component has more than one `Section` in a parent element, wrap the Sections with `Space` from `antd`.
Example:

```jsx
<Section loading={false}>
  <Space direction="vertical" size="middle" style={{ width: "100%" }}>
    <Section />
    <Section />
    ...or More
  </Space>
</Section>
```

Implement this on Detail Page and Form (Create or Delete) if the parent has more than 1 Section.

## Tag from Antd

Use the `Tag` component from `antd` to display data such as status or other fixed values. Apply a different color for each value to make them visually distinguishable. Choose the color based on the meaning or context of each value.

Example:

```jsx
<Tag color="{{color}}">{{ label }}</Tag>
```

## Button Group

Use this type of button if user request for one type of button but with difference functionality.
example:

```jsx
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              label: (
                <Link to={{link to page}}>{{Label}}</Link>
              ),
              key: "1",
            },

            {
              label: (
                <Link to={{link to page}}>{{Label 2}}</Link>
              ),
              key: "2",
            },
          ],
        }}
      >
        <Button size="large" type="primary" icon={<PlusOutlined />}>
          Create Data
          <Space />
          <DownOutlined />
        </Button>
      </Dropdown>
```

## Row selection on DataTable and ActionTable

Use this type of DataTable when user request for bulk action. for example bulk delete or bulk download. If user not request fot it remove `batchActionMenus` and set `showRowSelection` to `false`

```jsx
  <Datatable
    ...otherProps
    batchActionMenus={[
      {
        key: "delete",
        label: "Delete",
        onClick: (_values, cb) => {
          message.success("Role berhasil dihapus");
          cb.reset();
        },
        danger: true,
        icon: <DeleteOutlined />,
      },
      {
        key: "download",
        label: "Download",
        onClick: (_values, cb) => {
          message.success("Role berhasil didownload");
          cb.reset();
        },
        icon: <DeleteOutlined />,
      },
    ]}
    showRowSelection={true}
  />
```

or with ActionTable

```jsx
  <ActionTable
    ...otherProps
    batchActionMenus={[
      {
        key: "delete",
        label: "Delete",
        onClick: (_values, cb) => {
          message.success("Role berhasil dihapus");
          cb.reset();
        },
        danger: true,
        icon: <DeleteOutlined />,
      },
    ]}
    showRowSelection={true}
  />
```

## Using Permission

If user request for conditional rendering based on logged user role, use this approach.

```jsx
import { useSession } from "@/app/_components/providers/session";

...
...
...
  const session = useSession()
  const isAdmin = session.session?.user.role === 'Admin'
  const isMarketing = session.session?.user.role === 'Marketing'

```

## `filterComponents` on DataTable and `filters` on ActionTable

`filterComponents` and `filters` are functionally the same — the only difference is the prop name used in each component.

Usage:

```jsx
<DataTable filterComponents={filters} />
<ActionTable filters={filters} />
```

### Filter Type 1: Filter Group

Use this for list pages that require **more than 3 fields**.

**Example:**

```jsx
const filters = [
  {
    label: "filter",
    name: "filter",
    type: "Group",
    icon: <FilterOutlined />,
    cols: 2,
    filters: [
      {
        label: "Name",
        name: "name",
        type: "Select",
        placeholder: "Type to search",
        defaultValue: filters.name,
        options: [
          {
            label: "Admin",
            value: "admin",
          },
        ],
      },
      {
        label: "Period",
        name: "date",
        type: "DateRangePicker",
        defaultValue: filters.date,
      },
      {
        label: "Permissions",
        name: "permissions",
        type: "CheckboxDropdown",
        defaultValue: filters.permissions,
        placeholder: "Type to search",
        options: [
          {
            label: "View Role",
            value: "view-role",
          },
        ],
      },
    ],
  },
];
```

### Filter Type 2: Single Filter

Use this for list pages that require **1 to 3 fields**.

**Example:**

```jsx
const filters = [
  {
    label: "Name",
    name: "name",
    type: "Select",
    placeholder: "Type to search",
    defaultValue: filters.name,
    options: [
      {
        label: "Admin",
        value: "admin",
      },
    ],
  },
  {
    label: "Period",
    name: "date",
    type: "DateRangePicker",
    defaultValue: filters.date,
  },
  {
    label: "Permissions",
    name: "permissions",
    type: "CheckboxDropdown",
    defaultValue: filters.permissions,
    placeholder: "Type to search",
    options: [
      {
        label: "View Role",
        value: "view-role",
      },
    ],
  },
];
```

### Filter Type 3: Sort Filter

Use **only** when the user explicitly requests custom sorting. If not requested, use column-based sorting instead.

**Example:**

```jsx
const filter = [
  {
    label: "Sort",
    title: "Sort",
    name: "sort",
    type: "Group",
    icon: <SortAscendingOutlined />,
    cols: 2,
    filters: [
      {
        label: "Field",
        name: "sort_by",
        type: "Select",
        placeholder: "Choose field",
        value: filters?.sort_by,
        options: [
          {
            label: "Name",
            value: "name",
          },
        ],
      },
      {
        label: <span style={{ color: "white" }}>.</span>,
        name: "order",
        type: "Select",
        placeholder: "Order",
        value: filters?.order,
        options: [
          {
            label: "Ascending",
            value: "asc",
          },
          {
            label: "Descending",
            value: "desc",
          },
        ],
      },
    ],
  },
];
```

## Available Filter Types

The DataTable and ActionTable components support only the following filter types:

### 1. Select
Used for dropdown selection with single or multiple options.

**Properties:**
- `type: "Select"`
- `placeholder` - Placeholder text
- `defaultValue` or `value` - Selected value(s)
- `options` - Array of `{label, value}` objects

**Example:**
```jsx
{
  label: "Status",
  name: "status",
  type: "Select",
  placeholder: "Select status",
  defaultValue: filters.status,
  options: [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
  ]
}
```

### 2. DateRangePicker
Used for selecting date ranges.

**Properties:**
- `type: "DateRangePicker"`
- `defaultValue` - Array of start and end dates `[startDate, endDate]`
- `placeholder` - Array of placeholder texts `["Start", "End"]`
- `width` - Optional width in pixels

**Example:**
```jsx
{
  label: "Period",
  name: "date_range",
  type: "DateRangePicker",
  defaultValue: filters.date_range,
  placeholder: ["Start Date", "End Date"],
  width: 230
}
```

### 3. CheckboxDropdown
Used for multi-select dropdown with checkboxes.

**Properties:**
- `type: "CheckboxDropdown"`
- `placeholder` - Placeholder text
- `defaultValue` - Array of selected values
- `options` - Array of `{label, value}` objects
- `width` - Optional width in pixels

**Example:**
```jsx
{
  label: "Categories",
  name: "categories",
  type: "CheckboxDropdown",
  placeholder: "Select categories",
  defaultValue: filters.categories,
  width: 160,
  options: [
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Books", value: "books" }
  ]
}
```

**Important Notes:**
- These are the **only** supported filter types
- Do not use any other filter types as they will not work
- Always use the exact type names: `"Select"`, `"DateRangePicker"`, `"CheckboxDropdown"`
