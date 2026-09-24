#!/usr/bin/env bash
# ==============================================================================
# MAHALLA: BIR KUN — Ishga Tushirish Skripti (Frontend + Python Backend)
# ==============================================================================

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🏘️ MAHALLA: BIR KUN loyihasi ishga tushirilmoqda..."
echo "📍 Loyiha manzili: $PROJECT_ROOT"

# 1. Backendni ishga tushirish (FastAPI)
echo "🐍 Python Backend ishga tushmoqda (Port 8000)..."
if [ ! -d "$PROJECT_ROOT/backend/venv" ]; then
    echo "⚙️ Python virtual muhit yaratilmoqda..."
    python3 -m venv "$PROJECT_ROOT/backend/venv"
    "$PROJECT_ROOT/backend/venv/bin/pip" install -r "$PROJECT_ROOT/backend/requirements.txt"
fi

"$PROJECT_ROOT/backend/venv/bin/python" "$PROJECT_ROOT/backend/run.py" &
BACKEND_PID=$!
echo "✅ Backend ishga tushdi (PID: $BACKEND_PID) -> http://127.0.0.1:8000"

# 2. Frontendni ishga tushirish (Vite + React)
echo "⚡ React Frontend ishga tushmoqda (Port 5173)..."
cd "$PROJECT_ROOT"
npm run dev -- --host 127.0.0.1 --port 5173 &
FRONTEND_PID=$!
echo "✅ Frontend ishga tushdi (PID: $FRONTEND_PID) -> http://127.0.0.1:5173"

echo ""
echo "✨ O‘YIN TAYYOR! Brauzeringizda quyidagi manzilni oching:"
echo "👉 http://127.0.0.1:5173"
echo ""
echo "To'xtatish uchun: Ctrl+C"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; exit 0" SIGINT SIGTERM EXIT
wait
