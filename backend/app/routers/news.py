import random
from fastapi import APIRouter
from typing import List, Dict
from app.data.news import NEWS_ITEMS

router = APIRouter(prefix="/api/news", tags=["news"])

@router.get("")
def get_all_news():
    return NEWS_ITEMS

@router.get("/random")
def get_random_news():
    return random.choice(NEWS_ITEMS)
