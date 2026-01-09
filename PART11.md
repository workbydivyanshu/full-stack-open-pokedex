# Part 11: CI/CD Implementation Guide

This guide documents the implementation of CI/CD pipelines for the Full Stack Open Pokémon application using GitHub Actions, Playwright, and Fly.io.

## Exercise Completion Status

### Exercise 11.1: Discussion Document
✅ **Completed** - See [exercise1.md](./exercise1.md) for discussion on CI/CD benefits for JavaScript applications.

### Exercises 11.3-11.4: Hello World Workflow
✅ **Completed** - See [.github/workflows/hello.yml](.github/workflows/hello.yml)
- Runs on push and pull requests to main branch
- Prints "Hello World!"
- Shows current date with `date` command
- Lists directory contents with `ls -l`

### Exercise 11.5: Linting Workflow
✅ **Completed** - See [.github/workflows/pipeline.yml](.github/workflows/pipeline.yml)
- Checks out code
- Sets up Node.js v20
- Installs dependencies
- Runs ESLint with `npm run eslint`

### Exercise 11.6: Fix Linting Errors
✅ **Completed** - Code passes ESLint checks

### Exercises 11.7-11.8: Build and Test Steps
✅ **Completed** - Extended pipeline.yml includes:
- ESLint quality check
- Webpack build step (`npm run build`)
- Jest test execution with `--passWithNoTests` flag
- Tests pass without errors

### Exercise 11.9: E2E Testing
✅ **Completed** - Playwright integration
- Config file: [playwright.config.js](./playwright.config.js)
- Test file: [tests/app.spec.js](./tests/app.spec.js)
- Tests cover:
  - Homepage loads with Pokémon title
  - Individual Pokémon page navigation
- Runs in separate job after build passes
- E2E tests run in full-pipeline.yml

### Exercise 11.10-11.12: Deployment with Health Checks
✅ **Completed** - Fly.io deployment configuration
- Config file: [fly.toml](./fly.toml)
- Health check endpoint: `GET /health` (added to [app.js](./app.js))
- Returns "ok" when app is running
- Fly.io configured with HTTP health checks every 10 seconds
- 5-second grace period for startup
- Deploy step only runs on main branch push
- Requires `FLY_API_TOKEN` secret in GitHub

### Exercises 11.13-11.22: Advanced CI/CD Features
✅ **Completed** - Extended pipeline features
- Versioning: Automatic version tag creation on deployment (YYYY.MM.DD.HHMM format)
- Deployment conditions: Only deploy on main branch push, not on PRs
- Job dependencies: E2E tests must pass before deployment
- Continue-on-error: E2E test failures don't block deployment
- Git tag push: Versioned releases automatically created

## Setup Instructions

### Prerequisites
- Node.js 20+
- npm 9+
- Fly.io account (for deployment)
- GitHub Actions enabled

### Local Development

```bash
# Install dependencies
npm install

# Run linting
npm run eslint

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start-prod

# Run e2e tests
npx playwright install
npx playwright test
```

### GitHub Secrets Required

1. **FLY_API_TOKEN**: Your Fly.io API token for deployment
   - Get from: https://web.fly.io/app/account/tokens
   - Add to: Settings → Secrets and variables → Actions → New repository secret

### Fly.io Deployment

```bash
# Install flyctl
# MacOS: brew install flyctl
# Linux: curl https://fly.io/install.sh | sh

# Login to Fly.io
flyctl auth login

# Create new app (first time only)
flyctl launch

# Deploy to Fly.io
flyctl deploy
```

## Workflow Files

- **hello.yml**: Simple workflow demonstrating GitHub Actions basics
- **pipeline.yml**: Essential CI/CD pipeline with linting, build, and tests
- **full-pipeline.yml**: Complete pipeline with E2E tests and deployment
- **extended-pipeline.yml**: Advanced features with versioning and deployment

## Health Check Configuration

The `/health` endpoint is used by Fly.io to determine app health:

```javascript
app.get('/health', (req, res) => {
  res.send('ok');
});
```

Fly.io will:
- Check every 10 seconds
- Timeout after 2 seconds
- Wait 5 seconds before first check (grace period)
- Restart if unhealthy

## Troubleshooting

### Tests Fail in CI but Pass Locally
- Clear npm cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`
- Check Node version matches workflow (v20)

### Deployment Fails
- Verify FLY_API_TOKEN secret is set correctly
- Check Fly.io app name matches in fly.toml
- Review Fly.io dashboard for error details

### E2E Tests Timeout
- Increase wait time in full-pipeline.yml (change `sleep 5` to `sleep 10`)
- Check that production build completes successfully
- Verify app starts on port 5000

## GitHub Actions Status

All workflows are available in the GitHub Actions tab:
1. Click "Actions" in your repository
2. Select a workflow to view runs
3. Click a run to see detailed logs
4. Check for any failed steps

## Next Steps

After setup:
1. Push changes to trigger workflows
2. Monitor GitHub Actions for workflow runs
3. Deploy to Fly.io when build and tests pass
4. Monitor app health in Fly.io dashboard
