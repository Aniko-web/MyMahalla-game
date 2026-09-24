from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.data.scenes import SCENES
from app.data.locations import LOCATIONS
from app.data.profiles import PROFILES

router = APIRouter(prefix="/api/game", tags=["game"])

@router.get("/scenes")
def get_all_scenes():
    return SCENES

@router.get("/scenes/{scene_id}")
def get_scene(scene_id: str):
    for s in SCENES:
        if s["id"] == scene_id:
            return s
    raise HTTPException(status_code=404, detail="Sahna topilmadi")

@router.get("/locations")
def get_locations():
    return LOCATIONS

@router.get("/profiles")
def get_profiles():
    return PROFILES
