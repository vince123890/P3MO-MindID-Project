# AI Prototype Project – User Acceptance Generation Guidelines

This document outlines the rules for automatically generating _user acceptance_ files whenever a user performs prompting. These acceptance files serve as templates for the Quality Assurance team, and they must strictly follow the established standards.

## Acceptance File Structure

- Acceptance files must be stored in the `acceptances` folder at the root of the project.
- Files must be in `.json` format.
- If the file does not exist, create a new one.
- If the file already exists, update the existing file.
- Update the acceptance file every time the user makes changes through prompting.
- Update `updated_at` every time user makes changes in related acceptence file. time should be in format `Date`. the time should be current date and time.

## Rules

- Acceptance file names must follow the module name in _kebab-case_ format.

  Example:

  - **Master Data - District** → `01-master-data-districts.json`
  - **Master Data - User** → `02-master-data-users.json`
  - **Transaction** → `03-transactions.json`

- Prefix each acceptance file name with a numeric value indicating the creation order.

- If a feature has multiple sections, create separate acceptance objects for each section within the `acceptances` array.

  Example:

  ```json
  {
    ...
    "acceptances": [
      {
        "info": "<b>Fields Section Letter Information</b>",
        "detail": [
          ...
        ]
      },
      {
        "info": "<b>Fields Section Letter Type</b>",
        "detail": [
          ...
        ]
      }
    ]
    ...
  }
  ```

- Use bold style for these properties:

  - `code`
  - `feature`
  - `info`
  - Field names

## Manifest File

The manifest file is a JSON file containing metadata of the successfully generated acceptance files.

- If the manifest file does not exist, create it at `acceptances/manifest.json`.
- If the manifest file exists, append the new acceptance file info.
- If the acceptance file already exists in the manifest, do not modify it.

Manifest file format (MUST BE EXACT):

```json
{
  "files": [
    {
      "sheetName": "Module Name",
      "url": "/acceptances/01-master-data-letters.json",
      "created_at": "",
      "update_at": ""
    },
    {
      "sheetName": "Master Data - Segments",
      "url": "/acceptances/02-master-data-segments.json",
      "created_at": "",
      "update_at": ""
    }
  ]
}
```

## Example Acceptance File

Below is an example of an acceptance file for the "Master Data - Activity" module. Adjust according to the module requested by the user.

```json
{
  "module_name": "Master Data - Activity",
  "data": [
    {
      "code": "<b>MA01</b>",
      "feature": "<b>List Master Data Activity</b>",
      "acceptances": [
        {
          "info": "<b>Fields</b>",
          "detail": [
            {
              "text": "<b>Search</b>:\n- Activity Name",
              "note": ""
            },
            {
              "text": "<b>Filter</b>:\n- Is Volume\n- Is Distance",
              "note": ""
            },
            {
              "text": "<b>Sorting ASC,DESC</b>:\n- Activity Name",
              "note": "Default sorting by created_at"
            }
          ]
        },
        {
          "info": "<b>Fields Column</b>",
          "detail": [
            {
              "text": "<b>Activity Name</b>\n- Hyperlink to detail"
            },
            {
              "text": "<b>Is Volume</b>\n- Read Only"
            },
            {
              "text": "<b>Is Distance</b>\n- Read Only"
            }
          ]
        },
        {
          "info": "<b>Behavior</b>",
          "detail": [
            {
              "text": "<b>Role</b>: Engineering & Accounting"
            },
            {
              "text": "Default sorting based on most recent data"
            },
            {
              "text": "<b>Action</b>: Detail, Edit, Delete\nBulk Action: Delete"
            },
            {
              "text": "<b>Bulk Action</b>: Delete",
              "note": "Multiple Data Check"
            }
          ]
        }
      ]
    },
    {
      "code": "<b>MA02</b>",
      "feature": "<b>Create Master Data Activity</b>",
      "acceptances": [
        {
          "info": "<b>Fields</b>",
          "detail": [
            {
              "text": "<b>Activity Name*</b>:\n- Text Field\n- String",
              "note": ""
            },
            {
              "text": "<b>Is Volume*</b>:\n- Switch Button\n- Default ON",
              "note": ""
            },
            {
              "text": "<b>Is Distance*</b>:\n- Switch Button\n- Default ON",
              "note": ""
            }
          ]
        },
        {
          "info": "<b>Behavior</b>",
          "detail": [
            {
              "text": "<b>Cancel</b>:\n Reset and Back to list activity"
            },
            {
              "text": "<b>Create</b>\n Save and Display data in the activity list"
            }
          ]
        }
      ]
    }
  ]
}
```
