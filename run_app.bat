@echo off
echo Starting AI Architecture Platform...
echo.

IF NOT EXIST "node_modules" (
    echo Node modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies.
        pause
        exit /b %errorlevel%
    )
)

echo Starting development server...
call npm run dev

pause
