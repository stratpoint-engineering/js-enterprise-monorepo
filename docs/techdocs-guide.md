# Working with TechDocs

This guide explains how to work with TechDocs in this monorepo template.

## What is TechDocs?

[TechDocs](https://backstage.io/docs/features/techdocs/techdocs-overview) is Backstage's solution for technical documentation. It:

- Uses MkDocs for documentation site generation
- Supports Markdown for content authoring
- Integrates directly with Backstage's catalog
- Enables a docs-as-code workflow

## Setup

### Prerequisites

To work with TechDocs locally, you need:

1. **Python 3.7+**: Required for MkDocs and plugins
2. **MkDocs and plugins**: For generating the documentation site

### Installation

```bash
# Install Python dependencies
pip install mkdocs mkdocs-material mkdocs-techdocs-core
```

## Previewing Documentation

To preview the documentation locally:

```bash
# From the root of the repository
mkdocs serve
```

This will:

- Start a local server at http://localhost:8000
- Auto-reload when files are changed
- Display the documentation as it will appear in Backstage

## Documentation Structure

```
docs/
├── index.md                 # Home page
├── getting-started/         # Getting started guides
├── architecture/            # Architecture documentation
├── development/             # Development workflows
├── infrastructure/          # Infrastructure docs
├── backstage-integration.md # Backstage integration guide
└── techdocs-guide.md        # Guide for working with TechDocs
```

## Adding New Documentation

To add new documentation:

1. **Create a Markdown file**: In the appropriate directory
2. **Update mkdocs.yml**: Add the file to the navigation structure
3. **Preview changes**: Run `mkdocs serve` to validate

Example of adding a new page:

```yaml
# In mkdocs.yml
nav:
  - Home: index.md
  - Getting Started:
      - Installation: getting-started/installation.md
      - Configuration: getting-started/configuration.md
      - Your New Page: getting-started/new-page.md # New page added here
```

## Markdown Features

TechDocs supports standard Markdown plus several extensions:

### Code Blocks

````markdown
```typescript
function example() {
  return "Hello, world!";
}
```
````

### Admonitions (Note Blocks)

```markdown
!!! note
This is a note admonition
```

!!! note
This is a note admonition

```markdown
!!! warning
This is a warning admonition
```

!!! warning
This is a warning admonition

### Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Value 1  | Value 2  |
| Value 3  | Value 4  |
```

## Building Documentation

To build the static site (useful for CI/CD pipelines):

```bash
mkdocs build
```

This generates the site in the `site/` directory.

## Integration with Backstage

When using this template through Backstage:

1. The repository includes `catalog-info.yaml` with the TechDocs annotation:

   ```yaml
   annotations:
     backstage.io/techdocs-ref: dir:.
   ```

2. Backstage will:
   - Build the TechDocs site from this repository
   - Make documentation available in the Backstage UI
   - Keep documentation in sync with the repository

## Best Practices

- **Keep documentation close to code**: This ensures it stays up-to-date
- **Use diagrams where helpful**: MkDocs supports Mermaid and PlantUML
- **Structure logically**: Organize by topic rather than document type
- **Update with code changes**: Update documentation when code changes
- **Preview before committing**: Always validate changes with `mkdocs serve`

## Troubleshooting

### Common Issues

- **Broken links**: Use relative paths with the format `../folder/file.md`
- **Missing content**: Ensure new files are added to the navigation in `mkdocs.yml`
- **Styling issues**: Check for proper Markdown syntax
- **Build errors**: Ensure all referenced plugins are installed
