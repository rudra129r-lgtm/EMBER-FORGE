#!/usr/bin/env bash
set -e
pip install -r requirements.txt
cd frontend
npm ci
npm run build
cd ..
