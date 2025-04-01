# Installation Guide

This guide walks you through setting up your monorepo after creating it from the Backstage template.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **Docker**: Latest stable version
- **Docker Compose**: Latest stable version
- **Git**: Latest stable version

## Step 1: Clone the Repository

After creating your repository through Backstage, clone it to your local machine:

```bash
git clone https://github.com/your-organization/your-repo-name.git
cd your-repo-name
```

## Step 2: Set Up Yarn

This monorepo uses Yarn 4 (Berry) as its package manager. Set it up with:

```bash
corepack enable
corepack prepare yarn@4.0.2 --activate
```

## Step 3: Install Dependencies

Install all dependencies across the monorepo:

```bash
yarn install
```

## Step 4: Configure Environment Variables

### Backend Environment Setup

1. Navigate to the backend directory:

   ```bash
   cd apps/backend
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your specific configuration:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-secure-jwt-secret
   JWT_REFRESH_SECRET=your-secure-refresh-token-secret
   ```

## Step 5: Start the Development Environment

Start the entire monorepo in development mode:

```bash
yarn dev
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger UI: http://localhost:3001/api/docs

## Step 6: Verify the Setup

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the frontend application running
3. Navigate to `http://localhost:3001/api/docs` to verify the backend and API documentation

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Ensure your MongoDB instance is running:

   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. Verify the connection string in your `.env` file

### Port Conflicts

If you have port conflicts:

1. Change the ports in the `.env` files
2. Update any references to these ports in the codebase

## Next Steps

Now that you have your monorepo set up, you can:

1. Explore the project structure
2. Review the architecture documentation
3. Start developing your features
4. Configure CI/CD for your repository

Refer to the [Configuration Guide](./configuration.md) for more details on configuring your monorepo for your specific needs.
