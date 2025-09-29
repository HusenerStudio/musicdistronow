// Server configuration for MusicDistroNow Client
const config = {
  development: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    cors: true,
    cache: false,
    gzip: true,
    fallback: 'index.html',
    openBrowser: true,
    liveReload: true
  },
  
  production: {
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    cors: false,
    cache: 3600, // 1 hour
    gzip: true,
    fallback: 'index.html',
    openBrowser: false,
    liveReload: false,
    ssl: process.env.SSL_ENABLED === 'true'
  },
  
  preview: {
    port: process.env.PREVIEW_PORT || 4000,
    host: 'localhost',
    cors: true,
    cache: 300, // 5 minutes
    gzip: true,
    fallback: 'index.html',
    openBrowser: true,
    liveReload: false
  }
};

module.exports = config;