@echo off
echo Starting E-commerce Full-Stack Development Environment...
echo.

echo Starting .NET API server...
start "API Server" cmd /k "cd EcommerceApi && dotnet run"

echo Waiting for API to start...
timeout /t 3 /nobreak > nul

echo Starting React development server...
cd project
npm run dev

pause
