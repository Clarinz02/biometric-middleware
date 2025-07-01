# Biometric Middleware

A Node.js middleware service for collecting and managing biometric attendance logs from various devices.

## Features

- REST API for receiving biometric logs
- Support for ZKTeco devices (LAN-based)
- USB biometric device support
- Firebase Firestore integration
- Test interface for manual log entry

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (copy `.env.example` to `.env`):
```bash
cp .env.example .env
```

3. Add your Firebase service account key to the environment variable

4. Start the server:
```bash
npm start
```

## Deploying to Render

### Method 1: Using Render Dashboard

1. **Connect your repository** to Render
2. **Create a new Web Service**
3. **Configure the service:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. **Add environment variables:**
   - `NODE_ENV`: `production`
   - `FIREBASE_SERVICE_ACCOUNT_KEY`: Your Firebase service account JSON (as a single line string)

### Method 2: Using render.yaml (Auto-deploy)

The included `render.yaml` file will automatically configure your deployment. Just connect your repository and Render will use this configuration.

### Environment Variables for Render

Add these in your Render dashboard under Environment Variables:

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | Yes |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Your Firebase service account JSON string | Optional* |

*If not provided, the app will use a mock database for testing

### Firebase Setup

1. Create a Firebase project
2. Generate a service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Convert the JSON to a single line string and add it to your Render environment variables

## API Endpoints

- `GET /` - Health check and API info
- `GET /health` - Simple health check
- `GET /test-log` - Test interface for manual log entry
- `POST /biometric-log` - Submit biometric logs
- `GET /sync-logs` - Pull logs from connected devices

## Troubleshooting

### Common Deployment Issues

1. **Port binding errors**: Render automatically sets the PORT environment variable
2. **Missing files**: All required files are now included in the repository
3. **Firebase connection**: The app will fall back to a mock database if Firebase is not configured

### Local Testing

Test the deployment locally:
```bash
PORT=3000 NODE_ENV=production npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request