@echo off
echo Starting Fast Development Mode...
echo.

cd frontend
set FAST_REFRESH=false
set GENERATE_SOURCEMAP=false
npm run dev