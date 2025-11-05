@echo off
echo Installing Restaurant Website Dependencies...
echo.

echo Installing Frontend Dependencies...
cd frontend
call npm install
echo Frontend dependencies installed!
echo.

echo Installing Backend Dependencies...
cd ..\backend
call npm install
echo Backend dependencies installed!
echo.

echo Setup Complete!
echo.
echo To start the application:
echo 1. Start Backend: cd backend && npm run dev
echo 2. Start Frontend: cd frontend && npm start
echo.
pause