@echo off
echo Starting Admin Interface...
cd frontend
set PORT=3001
set REACT_APP_ADMIN_MODE=true
set ESLINT_NO_DEV_ERRORS=true
npm run dev