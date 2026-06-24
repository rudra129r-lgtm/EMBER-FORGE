#!/usr/bin/env bash
set -e

echo "--- Installing Python deps ---"
pip install -r requirements.txt

echo "--- Node version ---"
node --version
npm --version

echo "--- Installing frontend deps ---"
cd frontend
yarn install
echo "--- Building frontend ---"
yarn build
cd ..

echo "--- Build output ---"
ls -la frontend/build/
