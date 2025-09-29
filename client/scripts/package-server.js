#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 MusicDistroNow Server Packager');
console.log('==================================');

const packageType = process.argv[2] || 'portable';
const outputDir = path.join(__dirname, '..', 'dist');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function createPortablePackage() {
  console.log('🔄 Creating portable package...');
  
  const packageContent = {
    name: 'musicdistronow-server-portable',
    version: '1.0.0',
    description: 'Portable MusicDistroNow Server Package',
    main: 'server.js',
    bin: {
      'musicdistronow-server': './server.js'
    },
    files: [
      'server.js',
      'config.js',
      'index.html',
      'src/',
      'public/',
      'assets/',
      'README.md'
    ],
    dependencies: {
      'http-server': '^14.1.1',
      'serve': '^14.2.1'
    },
    scripts: {
      'start': 'node server.js',
      'dev': 'node server.js development',
      'prod': 'node server.js production'
    },
    keywords: ['music', 'distribution', 'server', 'static'],
    author: 'MusicDistroNow',
    license: 'MIT'
  };

  // Create portable server.js
  const portableServer = `#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const env = process.argv[2] || 'development';
const config = require('./config.js')[env] || require('./config.js').development;

console.log('🚀 MusicDistroNow Portable Server');
console.log('Environment:', env);
console.log('Port:', config.port);
console.log('Host:', config.host);

// Check if index.html exists
const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: index.html not found');
  process.exit(1);
}

// Start http-server
const args = [
  '.',
  '-p', config.port.toString(),
  '-a', config.host,
  config.cors ? '--cors' : '',
  config.cache === false ? '-c-1' : \`-c\${config.cache}\`,
  config.gzip ? '-g' : ''
].filter(arg => arg !== '');

const server = spawn('npx', ['http-server', ...args], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

server.on('error', (error) => {
  console.error('❌ Server error:', error.message);
  process.exit(1);
});

console.log(\`🌐 Server running at http://\${config.host}:\${config.port}\`);
console.log('🛑 Press Ctrl+C to stop');
`;

  // Write files
  fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify(packageContent, null, 2));
  fs.writeFileSync(path.join(outputDir, 'server.js'), portableServer);
  
  // Copy config
  const configPath = path.join(__dirname, '..', 'server.config.js');
  if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, path.join(outputDir, 'config.js'));
  }
  
  // Copy index.html and other assets
  const indexPath = path.join(__dirname, '..', 'index.html');
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(outputDir, 'index.html'));
  }
  
  // Copy src directory if exists
  const srcPath = path.join(__dirname, '..', 'src');
  if (fs.existsSync(srcPath)) {
    copyDirectory(srcPath, path.join(outputDir, 'src'));
  }
  
  // Copy public directory if exists
  const publicPath = path.join(__dirname, '..', 'public');
  if (fs.existsSync(publicPath)) {
    copyDirectory(publicPath, path.join(outputDir, 'public'));
  }

  console.log('✅ Portable package created in:', outputDir);
  console.log('📋 To use:');
  console.log('   cd dist');
  console.log('   npm install');
  console.log('   npm start');
}

function createExecutable() {
  console.log('🔄 Creating executable package...');
  
  try {
    // Check if pkg is available
    execSync('npx pkg --version', { stdio: 'pipe' });
    
    // Create executable using pkg
    const pkgConfig = {
      name: 'musicdistronow-server',
      version: '1.0.0',
      bin: './server.js',
      pkg: {
        targets: ['node16-win-x64', 'node16-linux-x64', 'node16-macos-x64'],
        outputPath: 'dist/executables'
      }
    };
    
    fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify(pkgConfig, null, 2));
    
    // Create the executable
    execSync('npx pkg . --out-path dist/executables', { 
      cwd: outputDir,
      stdio: 'inherit' 
    });
    
    console.log('✅ Executables created in: dist/executables/');
    
  } catch (error) {
    console.log('⚠️  pkg not available, creating portable package instead');
    createPortablePackage();
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main execution
switch (packageType) {
  case 'portable':
    createPortablePackage();
    break;
  case 'executable':
    createExecutable();
    break;
  default:
    console.log('Usage: node package-server.js [portable|executable]');
    console.log('Default: portable');
    createPortablePackage();
}