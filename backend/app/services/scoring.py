from typing import Dict, Any
from app.data.profiles import PROFILES

def calculate_community_profile(stats: Dict[str, int]) -> Dict[str, Any]:
    mehr = stats.get("mehr", 50)
    hamjihatlik = stats.get("hamjihatlik", 50)
    hurmat = stats.get("hurmat", 50)
    obodlik = stats.get("obodlik", 50)
    ishonch = stats.get("ishonch", 50)
    
    # Check if ideal
    avg_score = (mehr + hamjihatlik + hurmat + obodlik + ishonch) / 5.0
    min_score = min(mehr, hamjihatlik, hurmat, obodlik, ishonch)
    
    if avg_score >= 70 and min_score >= 55:
        return PROFILES["ideal"]
    
    # Find dominant dimension
    stat_map = {
        "mehr": (mehr, "mehrli"),
        "hamjihatlik": (hamjihatlik, "birdam"),
        "hurmat": (hurmat, "avlodlar"),
        "obodlik": (obodlik, "obod")
    }
    
    # Sort by value descending
    sorted_stats = sorted(stat_map.items(), key=lambda item: item[1][0], reverse=True)
    best_profile_key = sorted_stats[0][1][1]
    
    return PROFILES.get(best_profile_key, PROFILES["mehrli"])
