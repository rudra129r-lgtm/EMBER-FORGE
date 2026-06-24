#!/usr/bin/env bash
set -e
pip install -r requirements.txt
echo "--- Node version ---"
node --version
npm --version
echo "--- Installing frontend deps ---"
cd frontend
npm install
echo "--- Building frontend ---"
npm run build
echo "--- Build output ---"
ls -la build/ 2>/dev/null || echo "BUILD FAILED: no build/ directory"
cd ..
