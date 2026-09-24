import uuid
from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from app.schemas import (
    SessionStartRequest,
    SessionStartResponse,
    ChoiceSubmitRequest,
    ChoiceSubmitResponse,
    FinishSessionRequest,
    FinishSessionResponse,
    Stats,
    StatEffects
)
from app.database import (
    create_session,
    record_choice,
    complete_session,
    get_recent_sessions
)
from app.data.scenes import SCENES
from app.services.scoring import calculate_community_profile

router = APIRouter(prefix="/api/session", tags=["session"])

@router.post("/start", response_model=SessionStartResponse)
def start_game_session(req: SessionStartRequest):
    name = req.player_name.strip()
    if not name:
        name = "Hamshahri"
    session_id = str(uuid.uuid4())[:8]
    data = create_session(session_id, name)
    return {
        "session_id": session_id,
        "player_name": name,
        "stats": data["stats"]
    }

@router.post("/choice", response_model=ChoiceSubmitResponse)
def submit_choice(req: ChoiceSubmitRequest):
    # Find scene and choice
    scene = next((s for s in SCENES if s["id"] == req.scene_id), None)
    if not scene:
        raise HTTPException(status_code=404, detail="Sahna topilmadi")
    
    choice = next((c for c in scene["choices"] if c["id"] == req.choice_id), None)
    if not choice:
        raise HTTPException(status_code=404, detail="Tanlov topilmadi")
    
    effects = choice["effects"]
    new_stats = record_choice(
        session_id=req.session_id,
        scene_id=req.scene_id,
        choice_id=req.choice_id,
        choice_text=choice["text"],
        effects=effects
    )
    
    # Determine next scene
    next_scene_id = None
    curr_stage = scene["stage_number"]
    next_scene = next((s for s in SCENES if s["stage_number"] == curr_stage + 1), None)
    if next_scene:
        next_scene_id = next_scene["id"]
        
    return {
        "stats": new_stats,
        "feedback": choice["feedback"],
        "effects": effects,
        "next_scene_id": next_scene_id
    }

@router.post("/finish", response_model=FinishSessionResponse)
def finish_game_session(req: FinishSessionRequest):
    stats_dict = req.stats.model_dump()
    profile = calculate_community_profile(stats_dict)
    
    res = complete_session(
        session_id=req.session_id,
        profile_id=profile["id"],
        profile_title=profile["title"],
        profile_desc=profile["description"],
        final_stats=stats_dict
    )
    
    return {
        "session_id": req.session_id,
        "profile": profile,
        "stats": req.stats,
        "completed_at": res["finished_at"]
    }

@router.get("/history")
def get_community_history():
    return get_recent_sessions(limit=10)
