@echo off
echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Customer Interface on port 3000...
start cmd /k "cd frontend && set PORT=3000 && set ESLINT_NO_DEV_ERRORS=true && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting Admin Interface on port 3001...
start cmd /k "cd frontend && set PORT=3001 && set REACT_APP_ADMIN_MODE=true && set ESLINT_NO_DEV_ERRORS=true && npm run dev"

echo All servers started!
echo Customer: http://localhost:3000
echo Admin: http://localhost:3001
echo Backend: http://localhost:5000