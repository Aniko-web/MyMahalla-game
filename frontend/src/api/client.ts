import { Stats, Choice, Scene, CommunityProfile, CommunityHistoryItem, NewsItem } from '../types/game';
import { SCENES } from '../data/scenes';
import { PROFILES } from '../data/profiles';
import { NEWS_ITEMS } from '../data/news';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

class MahallaApiClient {
  private isOnline: boolean = true;

  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      this.isOnline = res.ok;
      return res.ok;
    } catch {
      this.isOnline = false;
      return false;
    }
  }

  async startSession(playerName: string): Promise<{ sessionId: string; stats: Stats }> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_name: playerName }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        return {
          sessionId: data.session_id,
          stats: data.stats
        };
      }
    } catch {
      // Local fallback
    }
    return {
      sessionId: 'local-' + Math.random().toString(36).substring(2, 9),
      stats: { mehr: 50, hamjihatlik: 50, hurmat: 50, obodlik: 50, ishonch: 50 }
    };
  }

  async submitChoice(sessionId: string, sceneId: string, choiceId: string, currentStats: Stats): Promise<{
    stats: Stats;
    feedback: string;
    effects: Partial<Stats>;
    nextSceneId: string | null;
  }> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/session/choice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, scene_id: sceneId, choice_id: choiceId }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        return {
          stats: data.stats,
          feedback: data.feedback,
          effects: data.effects,
          nextSceneId: data.next_scene_id
        };
      }
    } catch {
      // Local fallback
    }

    // Local calculation
    const scene = SCENES.find(s => s.id === sceneId);
    const choice = scene?.choices.find(c => c.id === choiceId);
    const eff = choice?.effects || {};
    
    const newStats: Stats = {
      mehr: Math.max(0, Math.min(100, currentStats.mehr + (eff.mehr || 0))),
      hamjihatlik: Math.max(0, Math.min(100, currentStats.hamjihatlik + (eff.hamjihatlik || 0))),
      hurmat: Math.max(0, Math.min(100, currentStats.hurmat + (eff.hurmat || 0))),
      obodlik: Math.max(0, Math.min(100, currentStats.obodlik + (eff.obodlik || 0))),
      ishonch: Math.max(0, Math.min(100, currentStats.ishonch + (eff.ishonch || 0))),
    };

    const currStage = scene?.stage_number || 1;
    const nextScene = SCENES.find(s => s.stage_number === currStage + 1);

    return {
      stats: newStats,
      feedback: choice?.feedback || "Qaroringiz mahalla hayotiga ta'sir qildi.",
      effects: eff,
      nextSceneId: nextScene?.id || null
    };
  }

  async finishSession(sessionId: string, stats: Stats, playerName: string): Promise<{
    profile: CommunityProfile;
    completedAt: string;
  }> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/session/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, stats }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        return {
          profile: data.profile,
          completedAt: data.completed_at
        };
      }
    } catch {
      // Local fallback
    }

    // Local profile calculation
    const avg = (stats.mehr + stats.hamjihatlik + stats.hurmat + stats.obodlik + stats.ishonch) / 5;
    const minStat = Math.min(stats.mehr, stats.hamjihatlik, stats.hurmat, stats.obodlik, stats.ishonch);
    
    let chosen = PROFILES.mehrli;
    if (avg >= 70 && minStat >= 55) {
      chosen = PROFILES.ideal;
    } else {
      const scores = [
        { key: 'mehr', val: stats.mehr, prof: PROFILES.mehrli },
        { key: 'hamjihatlik', val: stats.hamjihatlik, prof: PROFILES.birdam },
        { key: 'hurmat', val: stats.hurmat, prof: PROFILES.avlodlar },
        { key: 'obodlik', val: stats.obodlik, prof: PROFILES.obod }
      ];
      scores.sort((a, b) => b.val - a.val);
      chosen = scores[0].prof;
    }

    // Save in localStorage for memory solnomasi
    try {
      const localHistory = JSON.parse(localStorage.getItem('mahalla_history') || '[]');
      localHistory.unshift({
        id: sessionId,
        player_name: playerName,
        finished_at: new Date().toISOString(),
        profile_id: chosen.id,
        profile_title: chosen.title,
        profile_desc: chosen.description,
        stats
      });
      localStorage.setItem('mahalla_history', JSON.stringify(localHistory.slice(0, 10)));
    } catch {}

    return {
      profile: chosen,
      completedAt: new Date().toISOString()
    };
  }

  async getHistory(): Promise<CommunityHistoryItem[]> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/session/history`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    
    try {
      return JSON.parse(localStorage.getItem('mahalla_history') || '[]');
    } catch {
      return [];
    }
  }

  async getRandomNews(): Promise<NewsItem> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/news/random`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    return NEWS_ITEMS[Math.floor(Math.random() * NEWS_ITEMS.length)];
  }
}

export const api = new MahallaApiClient();
