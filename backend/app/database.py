import sqlite3
import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "mahalla.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        player_name TEXT NOT NULL,
        created_at TEXT NOT NULL,
        finished_at TEXT,
        mehr INTEGER DEFAULT 50,
        hamjihatlik INTEGER DEFAULT 50,
        hurmat INTEGER DEFAULT 50,
        obodlik INTEGER DEFAULT 50,
        ishonch INTEGER DEFAULT 50,
        profile_id TEXT,
        profile_title TEXT,
        profile_desc TEXT,
        is_completed INTEGER DEFAULT 0
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS choices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        scene_id TEXT NOT NULL,
        choice_id TEXT NOT NULL,
        choice_text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        effects_json TEXT,
        FOREIGN KEY (session_id) REFERENCES sessions (id)
    )
    """)
    
    conn.commit()
    conn.close()

def create_session(session_id: str, player_name: str) -> Dict[str, Any]:
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    cursor.execute(
        """
        INSERT INTO sessions (id, player_name, created_at, mehr, hamjihatlik, hurmat, obodlik, ishonch, is_completed)
        VALUES (?, ?, ?, 50, 50, 50, 50, 50, 0)
        """,
        (session_id, player_name, now)
    )
    conn.commit()
    conn.close()
    return {
        "id": session_id,
        "player_name": player_name,
        "created_at": now,
        "stats": {
            "mehr": 50,
            "hamjihatlik": 50,
            "hurmat": 50,
            "obodlik": 50,
            "ishonch": 50
        }
    }

def record_choice(session_id: str, scene_id: str, choice_id: str, choice_text: str, effects: Dict[str, int]) -> Dict[str, Any]:
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    
    # 1. Insert choice
    cursor.execute(
        """
        INSERT INTO choices (session_id, scene_id, choice_id, choice_text, created_at, effects_json)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (session_id, scene_id, choice_id, choice_text, now, json.dumps(effects))
    )
    
    # 2. Update session stats
    cursor.execute("SELECT mehr, hamjihatlik, hurmat, obodlik, ishonch FROM sessions WHERE id = ?", (session_id,))
    row = cursor.fetchone()
    if row:
        new_mehr = max(0, min(100, row["mehr"] + effects.get("mehr", 0)))
        new_hamjihatlik = max(0, min(100, row["hamjihatlik"] + effects.get("hamjihatlik", 0)))
        new_hurmat = max(0, min(100, row["hurmat"] + effects.get("hurmat", 0)))
        new_obodlik = max(0, min(100, row["obodlik"] + effects.get("obodlik", 0)))
        new_ishonch = max(0, min(100, row["ishonch"] + effects.get("ishonch", 0)))
        
        cursor.execute(
            """
            UPDATE sessions
            SET mehr = ?, hamjihatlik = ?, hurmat = ?, obodlik = ?, ishonch = ?
            WHERE id = ?
            """,
            (new_mehr, new_hamjihatlik, new_hurmat, new_obodlik, new_ishonch, session_id)
        )
        stats = {
            "mehr": new_mehr,
            "hamjihatlik": new_hamjihatlik,
            "hurmat": new_hurmat,
            "obodlik": new_obodlik,
            "ishonch": new_ishonch
        }
    else:
        stats = {"mehr": 50, "hamjihatlik": 50, "hurmat": 50, "obodlik": 50, "ishonch": 50}

    conn.commit()
    conn.close()
    return stats

def complete_session(session_id: str, profile_id: str, profile_title: str, profile_desc: str, final_stats: Dict[str, int]) -> Dict[str, Any]:
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    cursor.execute(
        """
        UPDATE sessions
        SET finished_at = ?, profile_id = ?, profile_title = ?, profile_desc = ?,
            mehr = ?, hamjihatlik = ?, hurmat = ?, obodlik = ?, ishonch = ?, is_completed = 1
        WHERE id = ?
        """,
        (
            now, profile_id, profile_title, profile_desc,
            final_stats.get("mehr", 50),
            final_stats.get("hamjihatlik", 50),
            final_stats.get("hurmat", 50),
            final_stats.get("obodlik", 50),
            final_stats.get("ishonch", 50),
            session_id
        )
    )
    conn.commit()
    conn.close()
    return {
        "session_id": session_id,
        "finished_at": now,
        "profile": {
            "id": profile_id,
            "title": profile_title,
            "description": profile_desc
        },
        "stats": final_stats
    }

def get_recent_sessions(limit: int = 10) -> List[Dict[str, Any]]:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT id, player_name, finished_at, profile_id, profile_title, profile_desc, mehr, hamjihatlik, hurmat, obodlik, ishonch
        FROM sessions
        WHERE is_completed = 1
        ORDER BY finished_at DESC
        LIMIT ?
        """,
        (limit,)
    )
    rows = cursor.fetchall()
    result = []
    for r in rows:
        result.append({
            "id": r["id"],
            "player_name": r["player_name"],
            "finished_at": r["finished_at"],
            "profile_id": r["profile_id"],
            "profile_title": r["profile_title"],
            "profile_desc": r["profile_desc"],
            "stats": {
                "mehr": r["mehr"],
                "hamjihatlik": r["hamjihatlik"],
                "hurmat": r["hurmat"],
                "obodlik": r["obodlik"],
                "ishonch": r["ishonch"]
            }
        })
    conn.close()
    return result
