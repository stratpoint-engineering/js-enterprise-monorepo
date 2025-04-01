# Enterprise Monorepo Architecture

A production-ready monorepo architecture that supports both TypeScript and ES6 JavaScript projects. This architecture is designed to be scalable, maintainable, and follows best practices for enterprise applications.

> **Note**: This monorepo is designed to be used as a Backstage template for quickly bootstrapping new enterprise projects. The template includes comprehensive documentation and configuration for seamless Backstage integration.

## Features

- **Monorepo Structure**: Managed with Turborepo for efficient builds and dependency management
- **Technology Stack**:
  - Frontend: Next.js (React)
  - Backend: NestJS (TypeScript) with optional ES6 JavaScript support
  - Shared packages for code reuse
- **Domain-Driven Design**: Organized by features/domains
- **Production-Ready**:
  - CI/CD pipelines with GitHub Actions
  - Infrastructure as Code (Terraform)
  - Docker containers & Kubernetes orchestration
  - Comprehensive logging and monitoring
  - Security best practices (OWASP compliance)

## Directory Structure

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
├── tools/                 # Development tools and scripts
├── .github/               # GitHub workflows and templates
├── turbo.json             # Turborepo configuration
└── package.json           # Root package.json for workspace management
```

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Yarn 4.0.2 (this project uses Yarn as its package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/enterprise-monorepo.git
   cd enterprise-monorepo
   ```

2. Enable Yarn 4:

   ```bash
   corepack enable
   corepack prepare yarn@4.0.2 --activate
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Configure environment variables:

   For the backend service:

   ```bash
   cd apps/backend
   cp .env.example .env
   # Edit .env with your own values
   ```

   Update the environment variables in the `.env` file to match your development environment.
   Key variables include:

   - `MONGODB_URI`: Your MongoDB connection string
     - For MongoDB Atlas: `mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority`
     - For local MongoDB: `mongodb://localhost:27017/<database>`
   - `JWT_SECRET` and `JWT_REFRESH_SECRET`: Secure secrets for JWT authentication
   - `PORT`: The port your backend will run on (default: 3001)

   > **Security Note**: Never commit your actual MongoDB credentials or JWT secrets to version control. The `.env`
   > file is gitignored by default. Only the `.env.example` file with placeholders should be committed.

5. Start the development environment:
   ```bash
   yarn dev
   ```

This will start both the frontend and backend applications in development mode.

### Development Commands

- `yarn dev`: Start all applications in development mode
- `yarn build`: Build all applications
- `yarn test`: Run tests for all applications
- `yarn lint`: Lint all applications
- `yarn typecheck`: Type check all TypeScript files
- `yarn clean`: Clean build artifacts and node_modules

### Docker Deployment

```bash
# Build and start all services
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

## Future Backstage Implementation

This monorepo is being prepared for use as a Backstage template. Backstage is an open-source developer portal that helps organizations streamline their development processes. When implementation is complete, this template will allow teams to:

1. **Quickly bootstrap new projects** with our standardized enterprise architecture
2. **Customize key parameters** like database type, authentication, and app names
3. **Automatically provision repositories** with the correct structure and configuration
4. **Access comprehensive documentation** through Backstage's TechDocs feature

The repository already includes:

- `catalog-info.yaml` for Backstage catalog registration
- `template.yaml` defining the template parameters and steps
- `mkdocs.yml` for TechDocs configuration
- Documentation in the `docs/` directory

For more information on our Backstage implementation plans, refer to the "Backstage Integration" section in the Project Status section below.

## Using as a Backstage Template

This monorepo is configured to work as a Backstage template. To use it:

1. **Register in Backstage**: Add this repository to your Backstage catalog

   ```yaml
   # In your app-config.yaml
   catalog:
     locations:
       - type: url
         target: https://github.com/your-org/enterprise-monorepo/blob/main/catalog-info.yaml
   ```

2. **Create from Template**: In the Backstage UI:

   - Navigate to "Create" in the sidebar
   - Select "Enterprise Monorepo Architecture" template
   - Follow the wizard to configure your new monorepo

3. **Template Parameters**:

   - **GitHub Organization**: The GitHub org where the repository will be created
   - **Repository Name**: Name for your new monorepo
   - **Owner**: Group or user who owns this project
   - **Frontend/Backend Names**: Names for the applications
   - **Database Setup**: Select from MongoDB, PostgreSQL, or None
   - **Authentication**: Whether to include authentication system

4. **Post-Creation**:

   - Clone the generated repository
   - Follow the "Getting Started" instructions above
   - Check the docs/ directory for detailed documentation

5. **Working with TechDocs**:
   - Install MkDocs and plugins:
     ```bash
     pip install mkdocs mkdocs-material mkdocs-techdocs-core
     ```
   - Test documentation locally:
     ```bash
     mkdocs serve
     ```
   - View at http://localhost:8000
   - Make changes to files in the docs/ directory to update the documentation
   - Build static site:
     ```bash
     mkdocs build
     ```

## Documentation with TechDocs

This monorepo includes comprehensive technical documentation using Backstage's TechDocs system, which is based on MkDocs.

### Running TechDocs Locally

You can preview the documentation in two ways:

#### Option 1: Using Python (as shown above)

```bash
pip install mkdocs mkdocs-material mkdocs-techdocs-core
mkdocs serve
```

#### Option 2: Using Docker (no Python installation required)

```bash
# Run the documentation server with Docker (Python base image with all dependencies installed)
docker run --rm -it -p 8000:8000 -v "${PWD}":/docs -w /docs python:3.9-slim /bin/sh -c "pip install mkdocs mkdocs-material mkdocs-techdocs-core && mkdocs serve -a 0.0.0.0:8000"
```

This mounts your current directory to the container and serves the documentation at http://localhost:8000.

### Building Documentation for Production

To build the static site for production deployment:

#### Using Python

```bash
mkdocs build
```

#### Using Docker

```bash
docker run --rm -v "${PWD}":/docs -w /docs python:3.9-slim /bin/sh -c "pip install mkdocs mkdocs-material mkdocs-techdocs-core && mkdocs build"
```

The built documentation will be in the `site/` directory, which can be deployed to any static hosting service.

### Documentation Structure

The documentation is organized as follows:

- **Getting Started**: Installation and configuration guides
- **Architecture**: System architecture and design principles
- **Development**: Development workflows and practices
- **Infrastructure**: Docker, Kubernetes, and Terraform setup
- **Backstage**: Information about Backstage integration

For more details on the available documentation, see the `docs/` directory.

## Architecture Design

### Frontend (Next.js)

The frontend is built with Next.js and follows a modern React architecture:

- App Router for file-based routing
- Server Components for optimal performance
- Shared UI components from the `ui-components` package
- API clients from the `api-clients` package
- State management with React Query
- Form handling with React Hook Form + Zod

### Backend (NestJS)

The backend is built with NestJS, a TypeScript framework that follows Angular-inspired patterns:

- Module-based architecture
- Dependency injection
- Domain-driven design principles
- API documentation with Swagger
- Authentication with JWT
- Database access with TypeORM or Mongoose
- Validation with class-validator and class-transformer

### Shared Packages

- **shared**: Common utilities, constants, and TypeScript types
- **ui-components**: Reusable React components
- **api-clients**: API client libraries for backend services
- **config**: Shared configuration for ESLint, Jest, TypeScript, etc.

### Infrastructure

- **Docker**: Multi-stage builds for optimized images
- **Kubernetes**: Production-ready manifests
- **Terraform**: Infrastructure as Code for AWS
- **CI/CD**: GitHub Actions workflows for testing, building, and deployment

## Testing the Backend API with Swagger UI

The backend API is documented and can be tested using Swagger UI:

1. **Access Swagger UI**:

   - Start the backend server: `yarn dev --filter=backend`
   - Open [http://localhost:3001/api/docs](http://localhost:3001/api/docs) in your browser

2. **Testing Endpoints**:

   - For public endpoints (like health checks or authentication):

     1. Find the endpoint you want to test
     2. Click to expand it
     3. Click the "Try it out" button
     4. Fill in any required parameters
     5. Click "Execute" to send the request

   - For authenticated endpoints:
     1. First, register a user using the `POST /auth/register` endpoint
     2. Login with that user using the `POST /auth/login` endpoint
     3. Copy the access token from the response
     4. Click the "Authorize" button at the top right of the Swagger UI
     5. Enter your token in the format: `Bearer your-token-here`
     6. Click "Authorize" to apply the token to all subsequent requests
     7. Now you can test secured endpoints

3. **Response Handling**:
   - Swagger UI will display the response status, headers, and body
   - You can use this for debugging and understanding the API behavior

This interactive documentation helps developers understand and interact with the API without setting up additional tools.

## Security Considerations

- HTTPS for all environments
- JWT-based authentication
- Input validation
- Rate limiting
- CORS configuration
- Security headers with Helmet
- Environment-specific secrets management
- OWASP Top 10 compliance

## Performance Optimization

- Server-side rendering for SEO and initial load
- Code splitting and lazy loading
- Production builds with optimizations
- HTTP/2 and CDN support
- Backend caching strategies
- Database query optimization

## Contributing

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Commit your changes: `git commit -m 'Add new feature'`
3. Push to the branch: `git push origin feature/new-feature`
4. Submit a pull request

## Project Status and To-Do List

This monorepo is a work in progress. While the basic structure is in place, several items need to be completed to make it fully production-ready:

### Frontend Development

- [ ] Implement Next.js App Router structure (current implementation appears to use Pages Router)
- [ ] Set up React Query for state management
- [ ] Implement React Hook Form with Zod for form handling
- [ ] Add authentication flow with JWT
- [ ] Create example pages and components that demonstrate the architecture

### Backend Development

- [ ] Complete NestJS module structure based on domain-driven design
- [ ] Implement comprehensive JWT authentication system
- [ ] Set up database connections (TypeORM or Mongoose)
- [ ] Implement validation with class-validator
- [ ] Finalize Swagger API documentation

### Shared Packages

- [ ] Complete the shared utilities in the packages/shared directory
- [ ] Develop reusable UI components in packages/ui-components
- [ ] Implement API client libraries in packages/api-clients
- [ ] Finalize shared configuration in packages/config

### Infrastructure

- [ ] Complete Docker configurations with multi-stage builds
- [ ] Finalize Kubernetes manifests for production deployment
- [ ] Implement Terraform IaC for AWS
- [ ] Set up monitoring and logging infrastructure

### CI/CD

- [ ] Complete GitHub Actions workflows for testing, building, and deployment
- [ ] Implement environment-specific configurations
- [ ] Set up secrets management

### Documentation

- [ ] Create comprehensive API documentation
- [ ] Add more detailed setup instructions for different environments
- [ ] Document project architecture and design decisions

### Testing

- [ ] Implement unit tests for all components
- [ ] Set up integration testing
- [ ] Implement end-to-end testing

### Backstage Integration

- [ ] Complete Backstage template validation
- [ ] Test template functionality in a live Backstage instance
- [ ] Add custom actions for post-deployment setup
- [ ] Create additional template variants for different use cases
- [ ] Implement Backstage software catalog integration with system modeling

## License

This project is licensed under the MIT License - see the LICENSE file for details.
