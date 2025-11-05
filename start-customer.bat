@echo off
echo Starting Customer Interface...
cd frontend
set PORT=3000
set ESLINT_NO_DEV_ERRORS=true
npm run dev