from typing import Dict, List, Optional
from pydantic import BaseModel, Field

class Stats(BaseModel):
    mehr: int = Field(default=50, ge=0, le=100)
    hamjihatlik: int = Field(default=50, ge=0, le=100)
    hurmat: int = Field(default=50, ge=0, le=100)
    obodlik: int = Field(default=50, ge=0, le=100)
    ishonch: int = Field(default=50, ge=0, le=100)

class StatEffects(BaseModel):
    mehr: Optional[int] = 0
    hamjihatlik: Optional[int] = 0
    hurmat: Optional[int] = 0
    obodlik: Optional[int] = 0
    ishonch: Optional[int] = 0

class Choice(BaseModel):
    id: str
    letter: str  # A, B, C
    text: str
    feedback: str
    effects: StatEffects

class Scene(BaseModel):
    id: str
    stage_number: int
    title: str
    location_id: str
    location_name: str
    time_of_day: str  # Tong, Peshin, Tushdan keyin, Oqshom, Kechqurun
    situation: str
    question: str
    dialogue_lore: Optional[str] = None
    lore_author: Optional[str] = None
    choices: List[Choice]

class Location(BaseModel):
    id: str
    name: str
    icon: str
    x: float  # Percentage on map
    y: float  # Percentage on map
    description: str
    unlock_stage: int

class NewsItem(BaseModel):
    id: str
    title: str
    content: str
    category: str  # Tadbir, Xushxabar, Hashar, E'lon
    time_ago: str
    icon: str

class CommunityProfile(BaseModel):
    id: str
    title: str
    tagline: str
    description: str
    icon: str
    badge_color: str
    primary_stat: str

class SessionStartRequest(BaseModel):
    player_name: str

class SessionStartResponse(BaseModel):
    session_id: str
    player_name: str
    stats: Stats

class ChoiceSubmitRequest(BaseModel):
    session_id: str
    scene_id: str
    choice_id: str

class ChoiceSubmitResponse(BaseModel):
    stats: Stats
    feedback: str
    effects: StatEffects
    next_scene_id: Optional[str] = None

class FinishSessionRequest(BaseModel):
    session_id: str
    stats: Stats

class FinishSessionResponse(BaseModel):
    session_id: str
    profile: CommunityProfile
    stats: Stats
    completed_at: str

class CommunityHistoryItem(BaseModel):
    id: str
    player_name: str
    finished_at: str
    profile_id: str
    profile_title: str
    profile_desc: str
    stats: Stats
