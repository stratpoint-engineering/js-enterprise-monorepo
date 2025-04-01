# Backstage Integration

This document explains how this monorepo template integrates with [Backstage](https://backstage.io/), Spotify's open source developer portal.

## Overview

This template is designed to work seamlessly with Backstage's Software Templates feature. It provides:

1. A customizable enterprise monorepo structure
2. Documentation through Backstage's TechDocs
3. Configurable template parameters

## Template Files

The key files for Backstage integration are:

- **`catalog-info.yaml`**: Registers the repository as a component in Backstage
- **`template.yaml`**: Defines the template, its parameters, and steps
- **`mkdocs.yml`**: Configures documentation for TechDocs
- **`docs/`**: Documentation content rendered by TechDocs

## How the Template Works

When a user creates a new project from this template in Backstage:

1. The user fills out the template form with:

   - GitHub organization and repository name
   - Project owner
   - Application names
   - Database and authentication preferences

2. Backstage executes the steps defined in `template.yaml`:

   - Fetches the template content
   - Replaces variables with user inputs
   - Creates a new Git repository
   - Registers the new component in Backstage's catalog

3. The user can then clone the repository and follow the setup instructions

## Template Parameters

This template offers the following customizations:

| Parameter       | Description                               | Default             |
| --------------- | ----------------------------------------- | ------------------- |
| `github_org`    | GitHub organization                       | (Required)          |
| `github_repo`   | Repository name                           | enterprise-monorepo |
| `owner`         | Owner of the project                      | (Required)          |
| `system`        | System this service belongs to            | enterprise-platform |
| `frontend_name` | Name of the frontend application          | frontend            |
| `backend_name`  | Name of the backend application           | backend             |
| `use_database`  | Database type (MongoDB, PostgreSQL, None) | MongoDB             |
| `use_auth`      | Whether to include authentication         | true                |

## Testing the Template

To test your changes to this template:

1. **Install Backstage CLI**:

   ```bash
   npm install -g @backstage/cli
   ```

2. **Validate the template**:

   ```bash
   backstage-cli software-template:validate --path template.yaml
   ```

3. **Preview the template in Backstage**:
   - Register this repository in your Backstage instance
   - Navigate to the "Create" page
   - Find and select this template
   - Test the form and validate parameter logic

## Resolving Template Linter Issues

When working with Backstage templates, you might encounter linter errors in `template.yaml`. These are usually related to:

1. **Schema validation**: Backstage uses a specific schema for templates
2. **Version compatibility**: Different Backstage versions support different template features

### Common Linter Errors

```
Errors:
___
1   | apiVersion: scaffolder.backstage.io/v1beta3
Err | Missing property "Resources".
Err | Property apiVersion is not allowed.
2   | kind: Template
Err | Property kind is not allowed.
```

### Solutions

1. **Check Backstage Version**: Ensure you're using the correct `apiVersion` for your Backstage instance

   ```bash
   # Check Backstage version in your instance
   backstage-cli --version
   ```

2. **Update Schema**: If you're validating with a different Backstage version than your target:

   - Use a version-specific validation: `backstage-cli@<version> software-template:validate`
   - Create a schema file matching your target Backstage version

3. **Ignore Certain Rules**: Some rules might be specific to your lint environment

   ```yaml
   # Add to your template.yaml
   # yaml-language-server: $schema=https://your-backstage-instance/schema.json
   ```

4. **Verify in Runtime**: Sometimes a template works correctly in Backstage even with linter errors
   - Test the template in your actual Backstage instance
   - Verify functionality regardless of lint errors

## TechDocs Preview

To preview the TechDocs locally:

```bash
mkdocs serve
```

This will start a local server at http://localhost:8000 where you can preview the documentation as it will appear in Backstage.

## Troubleshooting

### Template Validation Errors

If you encounter errors when validating the template:

1. Check the `template.yaml` file for syntax errors
2. Ensure all parameters are properly defined
3. Verify that all referenced actions are supported by your Backstage instance

### Documentation Issues

If documentation doesn't render correctly:

1. Validate your `mkdocs.yml` configuration
2. Check for Markdown syntax errors in your documentation files
3. Ensure all referenced plugins are installed
