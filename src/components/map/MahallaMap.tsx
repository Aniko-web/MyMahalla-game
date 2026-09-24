import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationItem } from '../../types/game';
import { LOCATIONS } from '../../data/locations';
import { Lock, MapPin, CheckCircle2, Maximize2, Minimize2 } from 'lucide-react';

interface MahallaMapProps {
  currentLocationId: string;
  currentStage: number;
  onSelectLocation?: (locationId: string) => void;
  isCompact?: boolean;
}

export const MahallaMap: React.FC<MahallaMapProps> = ({
  currentLocationId,
  currentStage,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeLoc = LOCATIONS.find(l => l.id === currentLocationId) || LOCATIONS[0];

  return (
    <div
      className={`relative bg-gradient-to-b from-[#F2ECE1] to-[#E9DEC9] rounded-2xl sm:rounded-3xl border-2 border-mahalla-gold/40 shadow-warm-md overflow-hidden transition-all duration-300 ${
        isExpanded ? 'h-72 sm:h-96 md:h-[420px]' : 'h-44 sm:h-60 md:h-72 lg:h-80'
      }`}
    >
      {/* Top Map Header Badge */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-mahalla-gold/40 shadow-warm-sm">
        <span className="w-2 h-2 rounded-full bg-mahalla-green animate-ping"></span>
        <span className="text-[10px] sm:text-xs font-bold font-heading text-mahalla-navy uppercase tracking-wider flex items-center gap-1">
          <MapPin size={12} className="text-mahalla-terracotta" />
          Mahalla Xaritasi
        </span>
        <span className="text-[9px] sm:text-[10px] text-mahalla-brown font-semibold bg-cream-200 px-1.5 py-0.5 rounded-full truncate max-w-[120px] sm:max-w-none">
          {activeLoc.name}
        </span>
      </div>

      {/* Expand/Collapse Map Toggle Button */}
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-mahalla-gold/40 shadow-warm-sm hover:bg-cream-100 text-mahalla-navy transition-all"
        title={isExpanded ? "Kichraytirish" : "Xaritani kattalashtirish"}
        aria-label="Toggle map size"
      >
        {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      </button>

      {/* Interactive 2D Stylized SVG Map */}
      <svg
        viewBox="0 0 800 420"
        className="w-full h-full object-cover select-none touch-manipulation"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFE7D6" />
            <stop offset="50%" stopColor="#D2DEC5" />
            <stop offset="100%" stopColor="#C4D4B5" />
          </linearGradient>

          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E3D7C3" />
            <stop offset="50%" stopColor="#D9CBAC" />
            <stop offset="100%" stopColor="#CFBE9C" />
          </linearGradient>

          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8AC4D0" />
            <stop offset="100%" stopColor="#5899A6" />
          </linearGradient>
        </defs>

        {/* Map Background Terrain */}
        <rect width="800" height="420" fill="url(#grassGrad)" />

        {/* Water Stream / Ariq with gentle curve */}
        <path
          d="M -10,340 C 200,310 260,240 420,260 C 580,280 660,180 820,160"
          fill="none"
          stroke="url(#waterGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Ariq animated flow dash */}
        <path
          d="M -10,340 C 200,310 260,240 420,260 C 580,280 660,180 820,160"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="8,12"
          opacity="0.6"
        >
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Cobblestone Roads */}
        {/* Main central avenue */}
        <path
          d="M 50,290 C 180,290 280,220 400,220 C 550,220 620,140 760,140"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="32"
          strokeLinecap="round"
        />
        {/* Branch 1 to School & Sports */}
        <path
          d="M 380,220 C 380,120 450,110 500,110 C 600,110 650,130 670,130"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        {/* Branch 2 to Choyxona & Park */}
        <path
          d="M 400,220 C 450,280 500,320 600,330 C 680,335 720,260 760,260"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="26"
          strokeLinecap="round"
        />

        {/* Road center dash marks */}
        <path
          d="M 50,290 C 180,290 280,220 400,220 C 550,220 620,140 760,140"
          fill="none"
          stroke="#B0A080"
          strokeWidth="1.5"
          strokeDasharray="6,8"
          opacity="0.6"
        />

        {/* Decorative Trees / Chinorlar around the map */}
        {[
          { cx: 120, cy: 190, r: 18 },
          { cx: 145, cy: 175, r: 14 },
          { cx: 280, cy: 130, r: 20 },
          { cx: 310, cy: 110, r: 16 },
          { cx: 620, cy: 260, r: 24 },
          { cx: 645, cy: 245, r: 18 },
          { cx: 720, cy: 340, r: 16 },
          { cx: 240, cy: 370, r: 15 },
          { cx: 80, cy: 380, r: 18 },
        ].map((tree, i) => (
          <g key={`tree-${i}`} opacity="0.85">
            <ellipse cx={tree.cx + 2} cy={tree.cy + 4} rx={tree.r} ry={tree.r * 0.7} fill="#A6B995" opacity="0.6" />
            <circle cx={tree.cx} cy={tree.cy} r={tree.r} fill="#2D6A4F" />
            <circle cx={tree.cx - tree.r * 0.25} cy={tree.cy - tree.r * 0.25} r={tree.r * 0.65} fill="#40916C" />
          </g>
        ))}

        {/* Sports field pitch outline */}
        <rect x="625" y="115" width="65" height="42" rx="4" fill="#387A54" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
        <line x1="657.5" y1="115" x2="657.5" y2="157" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
        <circle cx="657.5" cy="136" r="8" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />

        {/* Traditional House Silhouettes on the map background */}
        {/* House 1 (Home) */}
        <g transform="translate(145, 245)">
          <rect x="0" y="12" width="46" height="28" fill="#F4ECE0" stroke="#7F4F24" strokeWidth="1" rx="2" />
          <polygon points="-4,12 23,-3 50,12" fill="#C86D51" stroke="#9E472A" strokeWidth="1" />
          <rect x="8" y="24" width="8" height="16" fill="#582F0E" />
          <rect x="24" y="18" width="12" height="10" fill="#8AC4D0" stroke="#7F4F24" strokeWidth="0.8" />
        </g>

        {/* School Building */}
        <g transform="translate(355, 95)">
          <rect x="0" y="14" width="64" height="34" fill="#FDFBF7" stroke="#1B4332" strokeWidth="1.2" rx="3" />
          <polygon points="-6,14 32,-4 70,14" fill="#1B4332" stroke="#081C15" strokeWidth="1" />
          <rect x="26" y="28" width="12" height="20" fill="#7F4F24" />
          <rect x="8" y="20" width="10" height="10" fill="#E9C46A" />
          <rect x="46" y="20" width="10" height="10" fill="#E9C46A" />
        </g>

        {/* Mahalla Center (Guzar) */}
        <g transform="translate(385, 205)">
          <rect x="0" y="10" width="54" height="32" fill="#FAF6ED" stroke="#D4A373" strokeWidth="1.2" rx="2" />
          <polygon points="-4,10 27,-5 58,10" fill="#D4A373" stroke="#B07D48" strokeWidth="1" />
          <path d="M 21,42 L 21,26 Q 27,20 33,26 L 33,42 Z" fill="#2D6A4F" />
        </g>

        {/* Choyxona / Topchan (So'ri) with Tapestry */}
        <g transform="translate(490, 295)">
          <rect x="0" y="8" width="40" height="26" rx="2" fill="#E07A5F" stroke="#9E472A" strokeWidth="1" />
          <rect x="4" y="12" width="32" height="18" rx="1" fill="#D4A373" />
          <circle cx="20" cy="21" r="4" fill="#0F1E2E" opacity="0.3" />
        </g>

        {/* Render Landmark Pins */}
        {LOCATIONS.map((loc) => {
          const isUnlocked = currentStage >= loc.unlock_stage;
          const isCurrent = loc.id === currentLocationId;
          const posX = (loc.x / 100) * 800;
          const posY = (loc.y / 100) * 420;

          return (
            <g
              key={loc.id}
              transform={`translate(${posX}, ${posY})`}
              className="cursor-pointer group"
              onClick={() => setSelectedLocation(loc)}
            >
              {/* Invisible large touch target for mobile devices */}
              <circle cx="0" cy="0" r="32" fill="transparent" pointerEvents="all" />

              {/* Outer pulsing ring for current active location */}
              {isCurrent && (
                <circle cx="0" cy="0" r="26" fill="#2D6A4F" opacity="0.25">
                  <animate attributeName="r" values="18;34;18" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Pin Base Circle */}
              <circle
                cx="0"
                cy="0"
                r="19"
                fill={isCurrent ? "#2D6A4F" : isUnlocked ? "#FDFBF7" : "#E2DDD3"}
                stroke={isCurrent ? "#FFFFFF" : isUnlocked ? "#D4A373" : "#B5AFA4"}
                strokeWidth={isCurrent ? "3.5" : "2"}
                filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.22))"
                className="transition-transform duration-200 group-hover:scale-110"
              />

              {/* Emoji / Icon text inside pin */}
              <text
                x="0"
                y="5.5"
                textAnchor="middle"
                fontSize={isCurrent ? "17" : "15"}
                className="select-none pointer-events-none"
              >
                {loc.emoji}
              </text>

              {/* Current Location Badge Indicator */}
              {isCurrent && (
                <g transform="translate(0, -26)">
                  <rect
                    x="-28"
                    y="-10"
                    width="56"
                    height="18"
                    rx="9"
                    fill="#1B4332"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="Montserrat, sans-serif"
                  >
                    HOZIRDA
                  </text>
                </g>
              )}

              {/* Lock icon if locked */}
              {!isUnlocked && (
                <circle cx="10" cy="-10" r="7" fill="#6B7280" stroke="#FFFFFF" strokeWidth="1" />
              )}
            </g>
          );
        })}
      </svg>

      {/* Selected Location Info Card (Click or Details) */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-2.5 left-2.5 right-2.5 sm:right-auto sm:max-w-sm z-30 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-mahalla-gold/60 shadow-warm-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl p-1 bg-cream-100 rounded-xl border border-cream-200 shrink-0">
                  {selectedLocation.emoji}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-mahalla-navy font-heading">
                    {selectedLocation.name}
                  </h4>
                  <div className="text-[10px] text-mahalla-green font-medium flex items-center gap-1">
                    {currentStage >= selectedLocation.unlock_stage ? (
                      <>
                        <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                        <span>Ochiq hudud</span>
                      </>
                    ) : (
                      <>
                        <Lock size={11} className="text-gray-500 shrink-0" />
                        <span>{selectedLocation.unlock_stage}-bosqichda ochiladi</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600 text-sm p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-mahalla-navy/80 mt-1.5 font-body leading-relaxed">
              {selectedLocation.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
