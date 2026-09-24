from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import init_db
from app.routers import game, session, news

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize SQLite tables
    init_db()
    yield

app = FastAPI(
    title="MAHALLA: BIR KUN - API",
    description="Mahalla — qadriyatlar beshigi, jamiyatning ma’naviy asoslari interaktiv hikoya o'yini backend API xizmati",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(game.router)
app.include_router(session.router)
app.include_router(news.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "title": "MAHALLA: BIR KUN API",
        "version": "1.0.0",
        "message": "Mahalla — qadriyatlar beshigi, jamiyatning ma’naviy asoslari."
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
