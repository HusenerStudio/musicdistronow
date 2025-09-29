# MusicDistroNow - Localhost Server Package

## 🚀 Quick Start

The MusicDistroNow client has been packaged with multiple server options for easy localhost deployment.

### Simple Commands

```bash
# Start development server (with live reload)
npm run localhost

# Start production server
npm run production

# Start preview server
npm run preview

# Package for distribution
npm run package
```

## 📋 Available Scripts

| Script | Description | Environment | Port |
|--------|-------------|-------------|------|
| `npm run localhost` | Development server with live reload | development | 3000 |
| `npm run dev` | Same as localhost | development | 3000 |
| `npm run production` | Production server | production | 8080 |
| `npm run preview` | Preview server | preview | 4000 |
| `npm run serve` | Default server | development | 3000 |
| `npm run package` | Create portable package | - | - |
| `npm run package:exe` | Create executable | - | - |
| `npm run setup` | Install all dependencies | - | - |

## 🔧 Server Configuration

The server automatically detects and uses the best available server:

1. **live-server** (development) - Hot reload, CORS enabled
2. **http-server** - Fast static server with caching
3. **serve** - Production-ready static server
4. **python** - Fallback HTTP server

### Environment Configurations

#### Development Mode
- Port: 3000 (configurable via PORT env var)
- Host: localhost
- CORS: Enabled
- Cache: Disabled
- Live Reload: Enabled
- Auto-open browser: Yes

#### Production Mode
- Port: 8080 (configurable via PORT env var)
- Host: 0.0.0.0 (all interfaces)
- CORS: Disabled
- Cache: 1 hour
- Live Reload: Disabled
- Auto-open browser: No

#### Preview Mode
- Port: 4000 (configurable via PREVIEW_PORT env var)
- Host: localhost
- CORS: Enabled
- Cache: 5 minutes
- Live Reload: Disabled
- Auto-open browser: Yes

## 🌐 Cross-Platform Support

### Windows
```cmd
# Using batch script
scripts\start-server.bat development

# Using npm
npm run localhost
```

### Linux/Mac
```bash
# Using shell script
./scripts/start-server.sh development

# Using npm
npm run localhost
```

### Node.js (All platforms)
```bash
node scripts/start-server.js development
```

## 📦 Packaging Options

### Portable Package
Creates a self-contained package with all dependencies:

```bash
npm run package
```

Output: `dist/` folder with:
- `package.json`
- `server.js`
- `config.js`
- All static files

### Executable Package
Creates standalone executables for Windows, Linux, and macOS:

```bash
npm run package:exe
```

Output: `dist/executables/` folder with platform-specific executables.

## 🔧 Environment Variables

You can customize server behavior using environment variables:

```bash
# Development
PORT=3001 npm run localhost

# Production
PORT=8080 HOST=0.0.0.0 npm run production

# Preview
PREVIEW_PORT=4001 npm run preview
```

## 🛠️ Setup & Installation

### First Time Setup
```bash
# Install all dependencies (local and global)
npm run setup
```

### Manual Installation
```bash
# Install project dependencies
npm install

# Install global server dependencies (optional)
npm install -g http-server serve live-server
```

## 🚨 Troubleshooting

### Server Won't Start
1. Check if Node.js is installed: `node --version`
2. Install dependencies: `npm install`
3. Try different server: The script will automatically fallback

### Port Already in Use
```bash
# Use different port
PORT=3001 npm run localhost
```

### Permission Issues (Linux/Mac)
```bash
# Make scripts executable
chmod +x scripts/start-server.sh
chmod +x scripts/start-server.js
```

## 📁 File Structure

```
client/
├── scripts/
│   ├── start-server.js      # Main server script
│   ├── start-server.bat     # Windows batch script
│   ├── start-server.sh      # Unix shell script
│   └── package-server.js    # Packaging script
├── server.config.js         # Server configurations
├── package.json            # Enhanced with server scripts
└── index.html              # Main application file
```

## 🎯 Usage Examples

### Development Workflow
```bash
# Start development server
npm run localhost
# Opens http://localhost:3000 with live reload

# Make changes to files
# Browser automatically refreshes
```

### Production Deployment
```bash
# Build and serve production version
npm run deploy:local
# Builds optimized version and serves on port 8080
```

### Creating Portable Package
```bash
# Create portable package
npm run package

# Navigate to package
cd dist

# Install and run
npm install
npm start
```

## 🔒 Security Features

- CORS configuration per environment
- Host binding restrictions
- Cache control headers
- Gzip compression
- SPA routing support via `_redirects`

## 📊 Performance Features

- Automatic server selection
- Environment-specific caching
- Gzip compression
- Static asset optimization
- CDN-ready configuration

## 🤝 Contributing

To add new server configurations:

1. Edit `server.config.js`
2. Update `start-server.js` with new server options
3. Add corresponding npm scripts to `package.json`
4. Test across platforms

## 📄 License

MIT License - see main project LICENSE file.