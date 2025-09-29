#!/bin/bash

# Unix/Linux shell script for starting MusicDistroNow server

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get environment parameter (default to development)
ENV=${1:-development}

echo -e "${BLUE}🚀 Starting MusicDistroNow server in ${ENV} mode...${NC}"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed or not in PATH${NC}"
    echo -e "${YELLOW}Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo -e "${YELLOW}Please run this script from the client directory${NC}"
    exit 1
fi

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: index.html not found in client directory${NC}"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error: Failed to install dependencies${NC}"
        exit 1
    fi
fi

# Make the script executable
chmod +x scripts/start-server.js

# Start the server using Node.js script
echo -e "${BLUE}🔄 Starting server...${NC}"
node scripts/start-server.js "$ENV"