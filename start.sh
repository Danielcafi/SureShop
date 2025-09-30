#!/bin/bash

echo "Starting E-commerce Full-Stack Development Environment..."

# Start .NET API in background
echo "Starting .NET API server..."
cd EcommerceApi
dotnet run &
API_PID=$!

# Wait for API to start
sleep 3

# Start React development server
echo "Starting React development server..."
cd ../project
npm run dev

# Cleanup function
cleanup() {
    echo "Stopping servers..."
    kill $API_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM
