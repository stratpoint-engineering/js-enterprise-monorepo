# Enterprise Monorepo Architecture

This documentation covers how to use and extend the Enterprise Monorepo template.

## Overview

The Enterprise Monorepo template provides a production-ready architecture for building scalable applications using TypeScript and JavaScript. It's built on the following technologies:

- **Turborepo**: For efficient build system and dependency management
- **Next.js**: For the frontend application
- **NestJS**: For the backend API
- **Shared packages**: For code reuse across applications

## Getting Started

Follow these steps to get started with your new monorepo:

1. **Install dependencies**:

   ```bash
   corepack enable
   corepack prepare yarn@4.0.2 --activate
   yarn install
   ```

2. **Configure environment variables**:

   - Copy `.env.example` to `.env` in the backend application
   - Update variables to match your environment

3. **Start development**:
   ```bash
   yarn dev
   ```

## Working with Documentation

This monorepo uses MkDocs for technical documentation, which integrates with Backstage's TechDocs.

### Testing Documentation Locally

To preview the documentation before committing changes:

1. **Install MkDocs and required plugins**:

   ```bash
   pip install mkdocs mkdocs-material mkdocs-techdocs-core
   ```

2. **Serve the documentation locally**:

   ```bash
   mkdocs serve
   ```

3. **Access the preview**:
   Open your browser and navigate to http://localhost:8000

4. **Making changes**:
   - Edit files in the `docs/` directory
   - The preview will automatically update
   - Documentation uses Markdown syntax with MkDocs extensions

### Building Documentation

To build the static site (useful for CI/CD pipelines):

```bash
mkdocs build
```

This will generate the site in the `site/` directory.

## Project Structure

```
enterprise-monorepo/
├── apps/                  # Application projects
│   ├── frontend/          # Next.js frontend application
│   └── backend/           # NestJS backend API
├── packages/              # Shared packages
│   ├── shared/            # Shared utilities, constants, and types
│   ├── ui-components/     # Shared React UI components
│   ├── api-clients/       # API client libraries
│   └── config/            # Shared configuration (ESLint, Jest, TypeScript)
├── infrastructure/        # Infrastructure configuration
│   ├── docker/            # Docker configuration
│   ├── kubernetes/        # Kubernetes manifests
│   └── terraform/         # Terraform IaC
└── tools/                 # Development tools and scripts
```

## Adding New Applications

To add a new application to the monorepo:

1. Create a new directory in the `apps/` folder
2. Set up the application's `package.json` with the correct workspace dependencies
3. Add the application to the Turborepo pipeline in `turbo.json`

## Adding New Shared Packages

To add a new shared package:

1. Create a new directory in the `packages/` folder
2. Set up the package's `package.json` with the appropriate exports
3. Reference the package from your applications

## Development Workflow

This monorepo uses a Trunk-Based Development workflow:

1. Create short-lived feature branches off `main`
2. Make small, incremental changes
3. Open pull requests for review
4. Merge to `main` frequently

## Deployment

The monorepo includes CI/CD pipelines for deploying applications:

1. GitHub Actions workflows build and test the applications
2. Infrastructure is managed using Terraform
3. Applications are deployed as Docker containers to Kubernetes

## Next Steps

Refer to the Project Status section in the README for a list of items that need to be completed to make the monorepo fully production-ready.
