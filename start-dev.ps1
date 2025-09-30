# PowerShell script to start both .NET API and React development servers

Write-Host "Starting E-commerce Full-Stack Development Environment..." -ForegroundColor Green

# Start .NET API in background
Write-Host "Starting .NET API server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd EcommerceApi; & 'C:\Program Files\dotnet\dotnet.exe' run" -WindowStyle Minimized

# Wait a moment for API to start
Start-Sleep -Seconds 3

# Start React development server
Write-Host "Starting React development server..." -ForegroundColor Yellow
Set-Location project
npm run dev

Write-Host "Both servers are now running!" -ForegroundColor Green
Write-Host "React App: http://localhost:5173" -ForegroundColor Cyan
Write-Host "API: https://localhost:7000" -ForegroundColor Cyan
Write-Host "API Swagger: https://localhost:7000/swagger" -ForegroundColor Cyan
