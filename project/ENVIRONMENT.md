# Environment Configuration

## Environment Variables

This project uses Vite's environment variable system. Create a `.env` file in the project root to configure your environment.

### Required Environment Variables

```bash
# API Configuration
VITE_API_URL=https://localhost:7000

# Development Configuration
VITE_APP_NAME=ShopPro
VITE_APP_VERSION=1.0.0
```

### How to Use

1. **Create `.env` file** in the project root:
   ```bash
   touch .env
   ```

2. **Add your configuration**:
   ```bash
   echo "VITE_API_URL=https://localhost:7000" >> .env
   ```

3. **Restart development server**:
   ```bash
   npm run dev
   ```

### Default Values

If no `.env` file is found, the application will use these defaults:
- API URL: `https://localhost:7000`
- App Name: `ShopPro`

### Production Deployment

For production, set these environment variables in your hosting platform:
- Vercel: Add in Project Settings > Environment Variables
- Netlify: Add in Site Settings > Environment Variables
- Railway: Add in Project Variables

### Troubleshooting

If you see `process is not defined` errors:
1. Make sure you're using `import.meta.env` instead of `process.env`
2. Restart your development server
3. Clear browser cache
