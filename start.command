#!/bin/bash
# Goldsmith Lab Simulator Launcher
# Double-click this file to start the simulator

DIR="$(cd "$(dirname "$0")" && pwd)"

# Ensure Ollama CORS is enabled
launchctl setenv OLLAMA_ORIGINS "*"

# Check if Ollama is running
if ! curl -s http://127.0.0.1:11434/api/tags > /dev/null 2>&1; then
  echo "⚠️  Ollama is not running. Starting Ollama..."
  open -a Ollama
  sleep 5
fi

# Kill any existing python server on port 8000
lsof -ti:8000 | xargs kill 2>/dev/null

# Start local server
cd "$DIR"
echo "🚀 Starting Goldsmith Lab Simulator..."
echo "📡 Server running at http://localhost:8000"
echo "🔬 Opening browser..."

# Open browser after a short delay
(sleep 1 && open "http://localhost:8000/goldsmith-lab-simulator.html") &

# Start the server (this keeps the terminal open)
python3 -m http.server 8000
