#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const config = require('../server.config.js');

// Get environment from command line args or default to development
const env = process.argv[2] || 'development';
const serverConfig = config[env] || config.development;

console.log(`🚀 Starting MusicDistroNow server in ${env} mode...`);
console.log(`📍 Server will run on http://${serverConfig.host}:${serverConfig.port}`);

// Check if index.html exists
const indexPath = path.join(__dirname, '..', 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: index.html not found in client directory');
  process.exit(1);
}

// Determine which server to use based on availability and environment
function startServer() {
  const serverOptions = [];
  
  if (env === 'development') {
    // For development, prefer live-server for hot reload
    serverOptions.push({
      command: 'npx',
      args: [
        'live-server',
        '--port=' + serverConfig.port,
        '--host=' + serverConfig.host,
        '--entry-file=index.html',
        serverConfig.openBrowser ? '--open' : '--no-browser',
        '--cors'
      ],
      name: 'live-server'
    });
  }
  
  // http-server as fallback
  serverOptions.push({
    command: 'npx',
    args: [
      'http-server',
      '.',
      '-p', serverConfig.port.toString(),
      '-a', serverConfig.host,
      serverConfig.cors ? '--cors' : '',
      serverConfig.cache === false ? '-c-1' : `-c${serverConfig.cache}`,
      serverConfig.gzip ? '-g' : '',
      serverConfig.openBrowser ? '-o' : ''
    ].filter(arg => arg !== ''),
    name: 'http-server'
  });
  
  // serve as another option
  serverOptions.push({
    command: 'npx',
    args: [
      'serve',
      '.',
      '-s',
      '-l', serverConfig.port.toString(),
      serverConfig.cors ? '--cors' : ''
    ].filter(arg => arg !== ''),
    name: 'serve'
  });
  
  // Python server as final fallback
  serverOptions.push({
    command: 'python',
    args: ['-m', 'http.server', serverConfig.port.toString()],
    name: 'python-server'
  });
  
  // Try each server option
  function tryServer(index = 0) {
    if (index >= serverOptions.length) {
      console.error('❌ No server could be started. Please install one of: live-server, http-server, serve, or python');
      process.exit(1);
    }
    
    const server = serverOptions[index];
    console.log(`🔄 Trying ${server.name}...`);
    
    const child = spawn(server.command, server.args, {
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname, '..')
    });
    
    child.on('error', (error) => {
      console.log(`⚠️  ${server.name} failed: ${error.message}`);
      tryServer(index + 1);
    });
    
    child.on('exit', (code) => {
      if (code !== 0) {
        console.log(`⚠️  ${server.name} exited with code ${code}`);
        tryServer(index + 1);
      }
    });
    
    // If process starts successfully, show success message
    setTimeout(() => {
      console.log(`✅ Server started successfully with ${server.name}`);
      console.log(`🌐 Open your browser to: http://${serverConfig.host}:${serverConfig.port}`);
      console.log(`📁 Serving files from: ${path.join(__dirname, '..')}`);
      console.log(`🛑 Press Ctrl+C to stop the server`);
    }, 2000);
  }
  
  tryServer();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated');
  process.exit(0);
});

startServer();