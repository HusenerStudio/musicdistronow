@echo off
REM Windows batch script for starting MusicDistroNow server

setlocal enabledelayedexpansion

REM Get environment parameter (default to development)
set ENV=%1
if "%ENV%"=="" set ENV=development

echo 🚀 Starting MusicDistroNow server in %ENV% mode...

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ Error: package.json not found
    echo Please run this script from the client directory
    pause
    exit /b 1
)

REM Check if index.html exists
if not exist "index.html" (
    echo ❌ Error: index.html not found in client directory
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the server using Node.js script
echo 🔄 Starting server...
node scripts/start-server.js %ENV%

pause