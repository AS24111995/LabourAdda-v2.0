import React from "react";

interface IllustrationProps {
  className?: string;
  alt?: string;
}

// 1. Profession Illustrations (25 professions)
export function ProfessionIllustration({ id, className = "w-full h-full", alt = "Profession Illustration" }: { id: string; className?: string; alt?: string }) {
  const normId = id.toLowerCase();

  // Common styles: glassmorphic warm background, bright amber/orange accents
  switch (normId) {
    case "mason":
    case "p1":
    case "masonry": // Rajmistri
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-mason" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#291a0a" />
              <stop offset="100%" stopColor="#0f0a05" />
            </radialGradient>
            <linearGradient id="brick-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="trowel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-mason)" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Brick wall construction outline */}
          <g stroke="#f59e0b" strokeOpacity="0.15" strokeWidth="0.75" fill="none">
            <line x1="10" y1="75" x2="90" y2="75" />
            <line x1="10" y1="65" x2="90" y2="65" />
            <line x1="10" y1="55" x2="90" y2="55" />
            <line x1="10" y1="45" x2="90" y2="45" />
            <line x1="25" y1="75" x2="25" y2="65" />
            <line x1="55" y1="75" x2="55" y2="65" />
            <line x1="40" y1="65" x2="40" y2="55" />
            <line x1="70" y1="65" x2="70" y2="55" />
            <line x1="25" y1="55" x2="25" y2="45" />
            <line x1="55" y1="55" x2="55" y2="45" />
          </g>
          {/* Active brick with glow */}
          <rect x="40" y="47" width="22" height="8" rx="1.5" fill="url(#brick-grad)" />
          {/* Trowel tool */}
          <path d="M35,42 L52,25 L45,18 Z" fill="url(#trowel-grad)" stroke="#475569" strokeWidth="0.5" />
          <path d="M48,22 L55,27 L50,32" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M50,32 L62,38" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          {/* Worker safety helmet indicator */}
          <circle cx="75" cy="25" r="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1" />
          <path d="M68,25 C68,18 82,18 82,25" fill="#f59e0b" />
          <rect x="70" y="25" width="10" height="2" rx="0.5" fill="#d97706" />
        </svg>
      );

    case "plumber":
    case "p5":
    case "plumbing":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-plumber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="wrench-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-plumber)" stroke="#0284c7" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Intertwined water pipes */}
          <path d="M15,50 L55,50 C58,50 60,52 60,55 L60,85" fill="none" stroke="url(#pipe-grad)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="55" cy="50" r="4.5" fill="#0284c7" />
          {/* Water Splash droplets */}
          <circle cx="68" cy="48" r="1.5" fill="#38bdf8" />
          <circle cx="73" cy="54" r="2" fill="#38bdf8" />
          <circle cx="62" cy="42" r="1" fill="#7dd3fc" />
          {/* Heavy Duty Pipe Wrench */}
          <g transform="translate(10, -5) rotate(15 45 45)">
            <rect x="35" y="30" width="30" height="5" rx="1.5" fill="url(#wrench-grad)" />
            <path d="M25,24 L38,24 L38,36 L25,36 Z" fill="#475569" />
            <path d="M22,20 L30,20 L30,26 L22,26 Z" fill="#64748b" />
            <path d="M22,26 C18,28 18,34 22,36 L30,36" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* Safety badge */}
          <path d="M80,15 L88,23 L80,31 L72,23 Z" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1" />
          <path d="M76,23 L79,26 L84,20" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "painter":
    case "p3":
    case "painting":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-painter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="paint-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
            <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-painter)" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* S-curve vibrant paint stroke */}
          <path d="M15,75 Q35,15 75,45 T85,15" fill="none" stroke="url(#paint-grad)" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.8" />
          <path d="M25,65 Q40,25 70,50" fill="none" stroke="url(#accent-grad)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.6" />
          {/* Paint Roller Tool */}
          <g transform="translate(35, 10) rotate(-10 30 30)">
            <rect x="20" y="25" width="22" height="7" rx="1.5" fill="#f4f4f5" stroke="#0d9488" strokeWidth="1" />
            <path d="M42,28.5 L48,28.5 L48,45 L38,45 L38,55" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <rect x="36" y="55" width="4" height="10" rx="1" fill="#f59e0b" />
            {/* Paint drip */}
            <path d="M30,32 C30,36 32,36 32,32 Z" fill="#2dd4bf" />
          </g>
        </svg>
      );

    case "electrician":
    case "p4":
    case "electrical":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-elec" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#0f0505" />
            </radialGradient>
            <linearGradient id="lightning-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-elec)" stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Circuit board pathways backplate */}
          <g stroke="#fef08a" strokeOpacity="0.1" strokeWidth="1" fill="none">
            <path d="M15,15 L40,15 L50,25 L50,50" />
            <path d="M85,85 L60,85 L50,75 L50,50" />
            <circle cx="40" cy="15" r="2" fill="#ef4444" fillOpacity="0.3" />
            <circle cx="60" cy="85" r="2" fill="#ef4444" fillOpacity="0.3" />
          </g>
          {/* Large dynamic lightning bolt */}
          <polygon points="58,15 32,52 48,52 42,88 68,50 52,50" fill="url(#lightning-grad)" filter="drop-shadow(0px 0px 8px rgba(234, 179, 8, 0.5))" />
          {/* Glowing plug wire connection */}
          <path d="M15,80 Q35,85 50,70 T85,80" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
      );

    case "welder":
    case "p16":
    case "welding":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-welder" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>
            <linearGradient id="sparks-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-welder)" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Welding safety mask */}
          <rect x="35" y="25" width="30" height="36" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <rect x="42" y="32" width="16" height="8" rx="1" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M44,34 L56,34" stroke="#e0f2fe" strokeWidth="1" strokeOpacity="0.8" />
          {/* Blue-white arc sparks */}
          <circle cx="50" cy="72" r="5" fill="#f0f9ff" />
          <g stroke="url(#sparks-grad)" strokeWidth="1.5" strokeLinecap="round">
            <line x1="50" y1="72" x2="30" y2="62" />
            <line x1="50" y1="72" x2="25" y2="76" />
            <line x1="50" y1="72" x2="38" y2="88" />
            <line x1="50" y1="72" x2="62" y2="88" />
            <line x1="50" y1="72" x2="75" y2="76" />
            <line x1="50" y1="72" x2="70" y2="62" />
            <line x1="50" y1="72" x2="50" y2="92" />
          </g>
          {/* Welding torch holder */}
          <path d="M50,72 L25,92" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "carpenter":
    case "p2":
    case "woodwork":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-carp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2d1500" />
              <stop offset="100%" stopColor="#0c0500" />
            </radialGradient>
            <linearGradient id="saw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-carp)" stroke="#f97316" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Diagonal textured wood plank */}
          <path d="M10,85 L85,10 L92,17 L17,92 Z" fill="#7c2d12" stroke="#ea580c" strokeWidth="0.75" />
          <path d="M16,83 L80,19" stroke="#9a3412" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M22,89 L86,25" stroke="#9a3412" strokeWidth="1" strokeOpacity="0.5" />
          {/* Hand Saw cutting */}
          <g transform="translate(10, 0) rotate(5 40 40)">
            <path d="M25,50 L75,30 L72,25 L25,43 Z" fill="url(#saw-grad)" />
            {/* Saw teeth */}
            <path d="M25,50 L28,49 L30,50 L33,49 L35,50 L38,49 L40,50 L43,49 L45,50 L48,49 L50,50 L53,49 L55,50 L58,49 L60,50 L63,49 L65,50 L68,49 L70,50 L73,49 L75,50" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            {/* Wooden handle */}
            <path d="M22,38 C20,38 18,40 18,43 L18,53 C18,56 20,58 22,58 L28,58 L28,38 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
            <circle cx="23" cy="48" r="2" fill="#f59e0b" />
          </g>
        </svg>
      );

    case "general labourer":
    case "general labour":
    case "p6":
    case "labour":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-labour" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <linearGradient id="shovel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-labour)" stroke="#64748b" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Ground excavation piles */}
          <path d="M10,85 Q30,65 50,85 T90,85 Z" fill="#475569" fillOpacity="0.4" />
          <path d="M30,85 Q50,70 70,85 Z" fill="#334155" fillOpacity="0.6" />
          {/* Heavy Shovel Tool */}
          <g transform="translate(10, 5) rotate(-35 50 50)">
            <rect x="47" y="20" width="6" height="55" rx="1" fill="#d97706" />
            {/* Shovel blade */}
            <path d="M40,20 L60,20 L58,5 L42,5 Z" fill="url(#shovel-grad)" stroke="#334155" strokeWidth="1" />
            {/* Shovel D-Handle */}
            <path d="M44,75 L56,75 L56,82 C56,84 54,86 52,86 L48,86 C46,86 44,84 44,82 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <line x1="47" y1="80" x2="53" y2="80" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>
          {/* Safety Hard Hat overlay */}
          <path d="M68,32 C68,22 84,22 84,32 Z" fill="#f59e0b" />
          <rect x="65" y="32" width="22" height="2" rx="0.5" fill="#ca8a04" />
        </svg>
      );

    case "agricultural worker":
    case "agri worker":
    case "p7":
    case "farming":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-farm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </radialGradient>
            <linearGradient id="sickle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="wheat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-farm)" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Rising sun backplate */}
          <circle cx="50" cy="50" r="28" fill="#fbbf24" fillOpacity="0.08" />
          <circle cx="50" cy="50" r="20" fill="#fbbf24" fillOpacity="0.15" />
          {/* Ripe wheat stalks */}
          <g transform="translate(15, 25)">
            <path d="M10,60 Q15,30 35,15" fill="none" stroke="url(#wheat-grad)" strokeWidth="2.5" />
            {/* Grain seeds */}
            <circle cx="35" cy="15" r="3" fill="#fbbf24" />
            <circle cx="31" cy="18" r="2.5" fill="#f59e0b" />
            <circle cx="28" cy="22" r="2.5" fill="#fbbf24" />
            <circle cx="25" cy="27" r="2.5" fill="#f59e0b" />
            <circle cx="21" cy="33" r="2.5" fill="#fbbf24" />
          </g>
          {/* Curved sickle blade */}
          <g transform="translate(45, 30)">
            <path d="M5,40 C5,10 35,5 35,25 C35,15 15,15 15,40" fill="url(#sickle-grad)" stroke="#475569" strokeWidth="1" />
            {/* Wooden handle */}
            <rect x="11" y="40" width="8" height="22" rx="2" fill="#7c2d12" stroke="#451a03" strokeWidth="1" />
            <rect x="13" y="43" width="4" height="4" rx="0.5" fill="#ea580c" />
          </g>
        </svg>
      );

    case "domestic helper":
    case "helper":
    case "p8":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-helper" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#0f052d" />
            </radialGradient>
            <linearGradient id="bottle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-helper)" stroke="#8b5cf6" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Shimmer / clean sparkles */}
          <path d="M75,25 L77,29 L81,31 L77,33 L75,37 L73,33 L69,31 L73,29 Z" fill="#a78bfa" />
          <path d="M25,35 L26,37 L28,38 L26,39 L25,41 L24,39 L22,38 L24,37 Z" fill="#ddd6fe" />
          {/* Professional Cleaning spray & broom */}
          <g transform="translate(25, 30)">
            {/* Crossed Broom stick */}
            <line x1="-5" y1="50" x2="45" y2="0" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
            <path d="M-5,50 L-10,58 C-12,62 -6,64 -4,60 L1,52" fill="none" stroke="#ca8a04" strokeWidth="5" />
            {/* Spray bottle */}
            <rect x="22" y="24" width="12" height="22" rx="2" fill="url(#bottle-grad)" />
            <path d="M24,24 L32,24 L30,16 L26,16 Z" fill="#ddd6fe" />
            <path d="M22,16 L32,16 L34,19" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "tile worker":
    case "p9":
    case "tile":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-tile" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <linearGradient id="t-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-tile)" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Tile Grid */}
          <rect x="20" y="20" width="25" height="25" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="47" y="20" width="25" height="25" fill="url(#t-grad)" stroke="#cbd5e1" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="20" y="47" width="25" height="25" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="47" y="47" width="25" height="25" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeOpacity="0.8" />
          {/* Level spacers (crosses) */}
          <path d="M46,25 L46,29 M44,27 L48,27" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M46,52 L46,56 M44,54 L48,54" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
          {/* Rubber Mallet */}
          <g transform="translate(15, -10) rotate(15 45 45)">
            <rect x="62" y="32" width="12" height="18" rx="2.5" fill="#334155" />
            <line x1="50" y1="41" x2="65" y2="41" stroke="#d97706" strokeWidth="3" />
          </g>
        </svg>
      );

    case "pop worker":
    case "p10":
    case "pop":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-pop" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-pop)" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Architectural ceiling curves / molds */}
          <path d="M15,15 C45,15 45,35 85,35" fill="none" stroke="#e0e7ff" strokeWidth="4" strokeLinecap="round" />
          <path d="M15,25 C45,25 45,45 85,45" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
          {/* Plaster spatula tool */}
          <g transform="translate(40, 45)">
            <path d="M5,15 L25,15 L32,32 L-2,32 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
            <rect x="8" y="32" width="14" height="15" rx="1.5" fill="#ea580c" />
            {/* Plaster splash */}
            <path d="M-2,13 C2,16 -2,22 -2,13 Z" fill="#f8fafc" />
          </g>
        </svg>
      );

    case "steel fixer":
    case "p11":
    case "steelfixer":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-steel" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-steel)" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Rebar grid pattern */}
          <g stroke="#64748b" strokeWidth="4.5" strokeLinecap="round">
            <line x1="25" y1="15" x2="25" y2="85" />
            <line x1="50" y1="15" x2="50" y2="85" />
            <line x1="75" y1="15" x2="75" y2="85" stroke="#475569" />
            <line x1="15" y1="25" x2="85" y2="25" />
            <line x1="15" y1="50" x2="85" y2="50" />
            <line x1="15" y1="75" x2="85" y2="75" stroke="#475569" />
          </g>
          {/* Binding wire loops with glowing orange accents */}
          <circle cx="25" cy="25" r="4" fill="none" stroke="#ea580c" strokeWidth="1.5" />
          <circle cx="50" cy="25" r="4" fill="none" stroke="#ea580c" strokeWidth="1.5" />
          <circle cx="25" cy="50" r="4" fill="none" stroke="#ea580c" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="4" fill="none" stroke="#f59e0b" strokeWidth="2" />
          {/* Fixing pliers */}
          <g transform="translate(42, 45) rotate(-20 15 15)">
            <line x1="5" y1="5" x2="15" y2="28" stroke="#f4f4f5" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="15" y1="5" x2="5" y2="28" stroke="#f4f4f5" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="2" y="1" width="16" height="5" rx="1" fill="#334155" />
          </g>
        </svg>
      );

    case "bar bender":
    case "p12":
    case "barbender":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-bender" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#0c0a09" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-bender)" stroke="#a8a29e" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Curved steel rod showing bending */}
          <path d="M15,75 L45,75 C55,75 60,70 65,55 L80,15" fill="none" stroke="#cbd5e1" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M17,73 L45,73 C53,73 57,69 62,56 L77,17" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Bending pins/jig */}
          <circle cx="45" cy="65" r="5" fill="#78716c" stroke="#44403c" strokeWidth="2" />
          <circle cx="55" cy="80" r="5" fill="#78716c" stroke="#44403c" strokeWidth="2" />
          {/* Bending Lever lever arm */}
          <line x1="25" y1="85" x2="65" y2="85" stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case "fabricator":
    case "p13":
    case "fabrication":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-fab" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3c1518" />
              <stop offset="100%" stopColor="#0f0204" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-fab)" stroke="#f43f5e" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Metal sheet frame corner */}
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="#cbd5e1" strokeWidth="5" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.3" />
          {/* Angle Grinder spark shower */}
          <g transform="translate(40, 30) rotate(35 25 25)">
            <rect x="15" y="22" width="22" height="8" rx="1.5" fill="#0284c7" />
            <circle cx="15" cy="26" r="6" fill="#334155" />
            <path d="M9,20 C5,23 5,29 9,32" stroke="#f43f5e" strokeWidth="2.5" fill="none" />
            {/* Sparks */}
            <circle cx="3" cy="18" r="1" fill="#fbbf24" />
            <circle cx="-2" cy="24" r="1.5" fill="#fbbf24" />
            <circle cx="2" cy="32" r="1" fill="#fbbf24" />
          </g>
        </svg>
      );

    case "roofer":
    case "p14":
    case "roofing":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-roof" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#082f49" />
            </radialGradient>
            <linearGradient id="tile-grad-r" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-roof)" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* House Roof truss silhouette */}
          <polygon points="50,15 15,50 25,50 50,25 75,50 85,50" fill="none" stroke="#94a3b8" strokeWidth="3" />
          {/* Overlapping terracotta shingles / tiles */}
          <g fill="url(#tile-grad-r)" stroke="#7c2d12" strokeWidth="0.5">
            <path d="M42,28 C45,25 55,25 58,28 L54,34 C51,32 49,32 46,34 Z" />
            <path d="M34,36 C38,32 48,32 52,36 L48,42 C45,40 41,40 38,42 Z" />
            <path d="M48,36 C52,32 62,32 66,36 L62,42 C59,40 55,40 52,42 Z" />
          </g>
          {/* Hammer driving nail */}
          <g transform="translate(62, 12)">
            <rect x="5" y="10" width="16" height="6" rx="1" fill="#334155" />
            <line x1="13" y1="16" x2="13" y2="34" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="3" y1="13" x2="5" y2="13" stroke="#f59e0b" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case "driver":
    case "p22":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-driver" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="wheel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-driver)" stroke="#64748b" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Receding perspective highway road lines */}
          <polygon points="50,45 10,85 90,85" fill="#1e293b" opacity="0.6" />
          <line x1="50" y1="45" x2="50" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" />
          {/* Steering Wheel centered */}
          <g transform="translate(25, 25)">
            <circle cx="25" cy="25" r="22" fill="none" stroke="url(#wheel-grad)" strokeWidth="4.5" />
            <circle cx="25" cy="25" r="5" fill="#334155" />
            {/* Steering spokes */}
            <line x1="25" y1="25" x2="25" y2="44" stroke="#475569" strokeWidth="3" />
            <line x1="25" y1="25" x2="7" y2="20" stroke="#475569" strokeWidth="3" />
            <line x1="25" y1="25" x2="43" y2="20" stroke="#475569" strokeWidth="3" />
          </g>
        </svg>
      );

    case "security guard":
    case "security":
    case "p23":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-security" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-security)" stroke="#eab308" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Highly stylized security shield with star */}
          <path d="M25,20 C45,20 50,12 50,12 C50,12 55,20 75,20 C75,45 50,75 50,85 C50,75 25,45 25,20 Z" fill="url(#shield-grad)" stroke="#ca8a04" strokeWidth="1.5" />
          <polygon points="50,28 53,38 63,38 55,45 58,55 50,49 42,55 45,45 37,38 47,38" fill="#1e1b4b" />
          {/* Flashlight glowing beam ray */}
          <path d="M10,80 L28,62 L32,68 L14,86 Z" fill="#fef08a" opacity="0.3" />
          <rect x="25" y="58" width="10" height="4" rx="1" fill="#475569" transform="rotate(-45 30 60)" />
        </svg>
      );

    case "hvac technician":
    case "hvac":
    case "p18":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-hvac" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-hvac)" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Air conditioning blower vent */}
          <rect x="20" y="25" width="60" height="30" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="25" y1="42" x2="75" y2="42" stroke="#cbd5e1" strokeWidth="2" />
          {/* Cool airflow winds */}
          <path d="M30,62 C35,68 30,75 35,82" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M50,62 C55,68 50,75 55,82" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M70,62 C75,68 70,75 75,82" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Service wrench indicator */}
          <g transform="translate(15, -10) rotate(45 50 50)">
            <rect x="47" y="30" width="6" height="28" rx="1" fill="#94a3b8" />
            <circle cx="50" cy="30" r="5" fill="#64748b" />
          </g>
        </svg>
      );

    case "solar technician":
    case "solar":
    case "p19":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-solar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="solar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-solar)" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Radiant Sun in corner */}
          <circle cx="80" cy="20" r="10" fill="#fef08a" />
          <circle cx="80" cy="20" r="16" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3 3" />
          {/* Solar Panel grid */}
          <g transform="translate(15, 30) rotate(-10 35 35)">
            <polygon points="10,45 60,35 70,65 20,75" fill="url(#solar-grad)" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="35" y1="40" x2="45" y2="70" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="22" y1="42" x2="32" y2="72" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="48" y1="37" x2="58" y2="67" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="15" y1="55" x2="65" y2="45" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case "helper_role":
    case "helper":
    case "p20":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-help" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-help)" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Support helping hand */}
          <path d="M15,85 L45,55 C48,52 52,52 55,55 L85,85" stroke="#94a3b8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Supporting up arrows */}
          <path d="M50,15 L50,45 M38,27 L50,15 L62,27" stroke="#ea580c" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>
      );

    case "machine operator":
    case "machine":
    case "p21":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-mach" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#0f052d" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-mach)" stroke="#8b5cf6" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Interlocking heavy industrial gears */}
          <g transform="translate(30, 30)">
            <circle cx="15" cy="15" r="12" fill="none" stroke="#cbd5e1" strokeWidth="3" />
            <path d="M15,0 L15,30 M0,15 L30,15 M4,4 L26,26 M4,26 L26,4" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="15" cy="15" r="6" fill="#1e1b4b" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>
          <g transform="translate(58, 58) rotate(22 10 10)">
            <circle cx="10" cy="10" r="8" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
            <path d="M10,0 L10,20 M0,10 L20,10" stroke="#8b5cf6" strokeWidth="2" />
          </g>
          {/* Dashboard dial/gauge */}
          <circle cx="75" cy="25" r="10" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1" />
          <line x1="75" y1="25" x2="81" y2="17" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "scaffolding worker":
    case "scaffolding":
    case "p14-scaffold":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-scaff" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-scaff)" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Scaffolding tube matrices */}
          <g stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <line x1="20" y1="10" x2="20" y2="90" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#cbd5e1" />
            <line x1="80" y1="10" x2="80" y2="90" />
            <line x1="10" y1="30" x2="90" y2="30" />
            <line x1="10" y1="65" x2="90" y2="65" />
            {/* Bracing diagonals */}
            <line x1="20" y1="30" x2="50" y2="65" stroke="#ea580c" strokeWidth="2" />
            <line x1="50" y1="30" x2="80" y2="65" stroke="#ea580c" strokeWidth="2" />
            <line x1="50" y1="30" x2="20" y2="65" stroke="#475569" strokeWidth="1.5" />
            <line x1="80" y1="30" x2="50" y2="65" stroke="#475569" strokeWidth="1.5" />
          </g>
          {/* Scaffold Couplers (clamps) */}
          <circle cx="20" cy="30" r="3" fill="#cbd5e1" />
          <circle cx="50" cy="30" r="3" fill="#fbbf24" />
          <circle cx="80" cy="30" r="3" fill="#cbd5e1" />
          <circle cx="50" cy="65" r="3" fill="#fbbf24" />
        </svg>
      );

    case "road construction worker":
    case "roadwork":
    case "p15-road":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-road" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-road)" stroke="#ca8a04" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Asphalt road segment */}
          <polygon points="50,20 15,90 85,90" fill="#334155" />
          <line x1="50" y1="20" x2="50" y2="90" stroke="#facc15" strokeWidth="3" strokeDasharray="6 4" />
          {/* Orange traffic cone */}
          <g transform="translate(62, 52)">
            <polygon points="10,32 15,5 25,5 30,32" fill="#f97316" stroke="#c2410c" strokeWidth="0.5" />
            <polygon points="12,14 28,14 26,20 14,20" fill="#ffffff" />
            <ellipse cx="20" cy="32" rx="12" ry="3" fill="#f97316" />
          </g>
          {/* Road construction barrier stripes */}
          <rect x="15" y="15" width="28" height="5" fill="#facc15" transform="rotate(15 20 20)" />
          <rect x="15" y="15" width="5" height="5" fill="#1e293b" transform="rotate(15 20 20)" />
          <rect x="25" y="15" width="5" height="5" fill="#1e293b" transform="rotate(15 20 20)" />
          <rect x="35" y="15" width="5" height="5" fill="#1e293b" transform="rotate(15 20 20)" />
        </svg>
      );

    case "civil supervisor":
    case "supervisor":
    case "p24-sup":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-sup" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-sup)" stroke="#14b8a6" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Site Clipboard checklist */}
          <rect x="25" y="22" width="50" height="60" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <rect x="42" y="16" width="16" height="8" rx="1.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
          {/* Checklist ticks */}
          <circle cx="36" cy="38" r="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
          <path d="M34,38 L36,40 L40,35" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="36" cy="52" r="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
          <path d="M34,52 L36,54 L40,49" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="46" y1="38" x2="66" y2="38" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="52" x2="62" y2="52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          {/* Yellow Supervisor safety helmet */}
          <g transform="translate(68, 55)">
            <ellipse cx="12" cy="12" rx="10" ry="7" fill="#eab308" />
            <rect x="2" y="12" width="20" height="2.5" rx="0.5" fill="#ca8a04" />
          </g>
        </svg>
      );

    case "site engineer":
    case "engineer":
    case "p25-eng":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-eng" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#031f30" />
            </radialGradient>
            <linearGradient id="helm-eng" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-eng)" stroke="#0ea5e9" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Tower crane silhouette backplate */}
          <path d="M15,85 L15,15 L65,15 M15,30 L50,15 M15,85 L85,85" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.15" />
          {/* Surveyor theodolite alignment instrument */}
          <g transform="translate(25, 30)">
            <polygon points="12,50 5,20 45,20 38,50" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <line x1="12" y1="50" x2="-2" y2="85" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
            <line x1="38" y1="50" x2="52" y2="85" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
            <line x1="25" y1="50" x2="25" y2="85" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="25" cy="20" r="10" fill="#0284c7" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Telescope sight */}
            <rect x="12" y="16" width="26" height="8" rx="1" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" transform="rotate(-15 25 20)" />
          </g>
          {/* White engineer hard hat indicator */}
          <path d="M72,25 C72,16 88,16 88,25" fill="url(#helm-eng)" stroke="#cbd5e1" strokeWidth="0.5" />
          <rect x="70" y="25" width="20" height="2" rx="0.5" fill="#cbd5e1" />
        </svg>
      );

    default: // Custom dynamic backup illustration
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="bg-def" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22252a" />
              <stop offset="100%" stopColor="#0f1115" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bg-def)" stroke="#475569" strokeWidth="0.5" strokeOpacity="0.2" />
          <g transform="translate(25, 25)" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M5,40 L45,40 M25,10 L25,45 M10,25 L40,25" />
            <circle cx="25" cy="25" r="12" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
          <path d="M30,80 L70,80" stroke="#f4f4f5" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>
      );
  }
}

// 2. Category Illustrations (9 wide banners)
export function CategoryIllustration({ id, className = "w-full h-32", alt = "Category Banner" }: { id: string; className?: string; alt?: string }) {
  const normId = id.toLowerCase();
  switch (normId) {
    case "construction":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-const" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-const)" />
          {/* Construction scaffold overlay grids */}
          <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1">
            <line x1="30" y1="0" x2="30" y2="120" />
            <line x1="80" y1="0" x2="80" y2="120" />
            <line x1="130" y1="0" x2="130" y2="120" />
            <line x1="180" y1="0" x2="180" y2="120" />
            <line x1="0" y1="40" x2="400" y2="40" />
            <line x1="0" y1="80" x2="400" y2="80" />
          </g>
          {/* Tower crane silhouette */}
          <path d="M320,120 L320,20 L370,20 M320,35 L350,20" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeOpacity="0.3" />
          {/* Heavy iron structures */}
          <rect x="40" y="85" width="220" height="15" rx="3" fill="url(#beam-grad)" />
          <path d="M40,85 L80,100 M100,85 L140,100 M160,85 L200,100 M220,85 L260,100" stroke="#78350f" strokeWidth="2" />
          {/* Dynamic Indian labor helmet icons */}
          <g transform="translate(280, 70)">
            <ellipse cx="15" cy="15" rx="12" ry="8" fill="#fbbf24" />
            <rect x="2" y="15" width="26" height="3" rx="0.5" fill="#d97706" />
          </g>
        </svg>
      );

    case "repair":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-rep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-rep)" />
          {/* Floating blueprint drawings */}
          <path d="M30,95 L140,75 L120,35 L10,55 Z" fill="#0284c7" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="30" y1="85" x2="110" y2="69" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.3" />
          {/* Intersecting Tools (wrench & hammer) */}
          <g transform="translate(180, 20)">
            {/* Wrench */}
            <path d="M5,70 L45,10 C48,7 55,7 58,10 L68,20 C71,23 71,30 68,33 L28,93 Z" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="58" cy="20" r="8" fill="#020617" stroke="#38bdf8" strokeWidth="3" />
            {/* Hammer */}
            <line x1="10" y1="20" x2="80" y2="80" stroke="#eab308" strokeWidth="5.5" strokeLinecap="round" />
            <rect x="5" y="5" width="28" height="15" rx="2.5" fill="#334155" transform="rotate(15 15 15)" />
          </g>
        </svg>
      );

    case "electrical":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-elec" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-elec)" />
          {/* Neon energy wave lines */}
          <path d="M10,60 Q100,20 200,80 T390,40" fill="none" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.4" />
          <path d="M10,70 Q90,90 210,30 T390,60" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" />
          {/* Sparking lightbulb center */}
          <g transform="translate(180, 30)">
            <circle cx="20" cy="20" r="14" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeOpacity="0.8" />
            <path d="M14,32 L26,32 L23,38 L17,38 Z" fill="#94a3b8" />
            {/* Lightning inside */}
            <polygon points="23,10 14,23 20,23 17,30 26,17 20,17" fill="#fbbf24" />
          </g>
        </svg>
      );

    case "painting":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-paint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-paint)" />
          {/* Multicolored dynamic paint splashes */}
          <path d="M30,30 C60,5 90,45 130,20 C170,45 220,10 270,35 C320,10 350,45 380,25" fill="none" stroke="#2dd4bf" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.4" />
          <path d="M50,45 Q150,15 250,75 T350,45" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.4" />
          {/* Hanging bucket pouring colors */}
          <g transform="translate(170, 45)">
            <rect x="20" y="10" width="25" height="22" rx="2" fill="#cbd5e1" />
            <path d="M22,10 Q32.5,-4 43,10" fill="none" stroke="#475569" strokeWidth="2" />
            {/* Swirling color drop */}
            <path d="M32.5,32 Q32.5,50 40,55" fill="none" stroke="#2dd4bf" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "agriculture":
    case "rural":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-agri" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-agri)" />
          {/* Green paddy field perspectives */}
          <polygon points="100,120 180,60 220,60 300,120" fill="#10b981" fillOpacity="0.15" />
          <line x1="180" y1="60" x2="100" y2="120" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="220" y1="60" x2="300" y2="120" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.4" />
          {/* Golden sun rays over horizons */}
          <circle cx="200" cy="50" r="18" fill="#fbbf24" fillOpacity="0.1" />
          <circle cx="200" cy="50" r="10" fill="#fbbf24" fillOpacity="0.2" />
          {/* Wheat crop bundles */}
          <g transform="translate(70, 40)">
            <path d="M10,60 Q20,25 35,25" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
            <path d="M25,60 Q15,25 5,25" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          </g>
        </svg>
      );

    case "general":
    case "general labour":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-gen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-gen)" />
          {/* Stylized physical workers in team */}
          <g stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeOpacity="0.15">
            <circle cx="160" cy="50" r="12" />
            <path d="M140,90 C140,70 180,70 180,90" />
            <circle cx="200" cy="45" r="14" stroke="#f59e0b" strokeOpacity="0.4" />
            <path d="M175,90 C175,65 225,65 225,90" stroke="#f59e0b" strokeOpacity="0.4" />
            <circle cx="240" cy="50" r="12" />
            <path d="M220,90 C220,70 260,70 260,90" />
          </g>
          {/* Shovel and pile */}
          <path d="M50,105 Q90,90 130,105" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case "helpers":
    case "helper":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-help" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-help)" />
          {/* Supporting hand shake / interlocking rings */}
          <g transform="translate(150, 25)">
            <circle cx="30" cy="30" r="22" fill="none" stroke="#a78bfa" strokeWidth="3" strokeOpacity="0.6" />
            <circle cx="60" cy="30" r="22" fill="none" stroke="#f59e0b" strokeWidth="3" strokeOpacity="0.6" />
            <path d="M42,30 L48,30" stroke="#ffffff" strokeWidth="4" />
          </g>
        </svg>
      );

    case "rural jobs":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-rural" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#022c22" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-rural)" />
          {/* Windmill & rustic village hills */}
          <path d="M10,110 Q120,75 220,110 T390,110" fill="none" stroke="#047857" strokeWidth="4" strokeOpacity="0.4" />
          {/* Windmill */}
          <g transform="translate(80, 45)" stroke="#fbbf24" strokeWidth="1.5" fill="none">
            <line x1="20" y1="50" x2="20" y2="10" />
            <circle cx="20" cy="10" r="1.5" fill="#fbbf24" />
            <line x1="20" y1="10" x2="5" y2="2" />
            <line x1="20" y1="10" x2="35" y2="18" />
            <line x1="20" y1="10" x2="12" y2="25" />
            <line x1="20" y1="10" x2="28" y2="-5" />
          </g>
        </svg>
      );

    case "infrastructure projects":
    case "infrastructure":
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-infra" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#0c0a09" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-infra)" />
          {/* Cable stayed bridge spans */}
          <line x1="50" y1="110" x2="350" y2="110" stroke="#64748b" strokeWidth="5.5" />
          <line x1="200" y1="110" x2="200" y2="20" stroke="#cbd5e1" strokeWidth="3" />
          {/* Cable stays */}
          <g stroke="#38bdf8" strokeWidth="1.25" strokeOpacity="0.6">
            <line x1="200" y1="30" x2="120" y2="110" />
            <line x1="200" y1="50" x2="140" y2="110" />
            <line x1="200" y1="70" x2="160" y2="110" />
            <line x1="200" y1="30" x2="280" y2="110" />
            <line x1="200" y1="50" x2="260" y2="110" />
            <line x1="200" y1="70" x2="240" y2="110" />
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 120" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-cat-def" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#bg-cat-def)" />
          <circle cx="200" cy="60" r="30" fill="#f59e0b" fillOpacity="0.1" />
          <path d="M180,60 L220,60" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      );
  }
}

// 3. Dashboard Illustrations (5 types)
export function DashboardIllustration({ type, className = "w-full h-40", alt = "Dashboard Banner" }: { type: string; className?: string; alt?: string }) {
  const normType = type.toLowerCase();
  switch (normType) {
    case "worker":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-dash-worker" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#042f2e" />
            </linearGradient>
            <linearGradient id="pass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="url(#bg-dash-worker)" stroke="#2dd4bf" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Large Passport outline illustration */}
          <g transform="translate(30, 25)">
            <rect x="0" y="0" width="70" height="100" rx="6" fill="#0f172a" stroke="url(#pass-grad)" strokeWidth="2.5" />
            {/* Ashok emblem stylized */}
            <circle cx="35" cy="40" r="14" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 1" />
            <line x1="35" y1="20" x2="35" y2="60" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="20" y1="40" x2="50" y2="40" stroke="#fbbf24" strokeWidth="1.5" />
            {/* Indian Flag color ribbons */}
            <rect x="10" y="80" width="50" height="3" fill="#ff9933" />
            <rect x="10" y="83" width="50" height="3" fill="#ffffff" />
            <rect x="10" y="86" width="50" height="3" fill="#128807" />
          </g>
          {/* AI Matching gears / network points */}
          <g transform="translate(160, 40)">
            <circle cx="50" cy="40" r="30" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50" cy="40" r="4" fill="#2dd4bf" />
            <circle cx="25" cy="25" r="3" fill="#2dd4bf" />
            <circle cx="75" cy="55" r="3" fill="#2dd4bf" />
            <circle cx="25" cy="55" r="3" fill="#2dd4bf" />
            <circle cx="75" cy="25" r="3" fill="#2dd4bf" />
            <line x1="25" y1="25" x2="50" y2="40" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="75" y1="55" x2="50" y2="40" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="25" y1="55" x2="50" y2="40" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="75" y1="25" x2="50" y2="40" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.6" />
          </g>
        </svg>
      );

    case "employer":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-dash-emp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="url(#bg-dash-emp)" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Hiring / Finding workers concept */}
          <g transform="translate(30, 35)" stroke="#38bdf8" strokeWidth="2" fill="none">
            <circle cx="50" cy="40" r="28" strokeDasharray="6 3" />
            {/* Search Glass */}
            <line x1="70" y1="60" x2="95" y2="85" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="50" cy="40" r="14" fill="#1e1b4b" />
          </g>
          {/* Verified workers grid with checkmarks */}
          <g transform="translate(160, 30)">
            {/* Card 1 */}
            <rect x="0" y="5" width="100" height="24" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
            <circle cx="15" cy="17" r="6" fill="#10b981" />
            <path d="M12,17 L14,19 L18,15" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="30" y1="17" x2="85" y2="17" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
            {/* Card 2 */}
            <rect x="0" y="38" width="100" height="24" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
            <circle cx="15" cy="50" r="6" fill="#10b981" />
            <path d="M12,50 L14,52 L18,48" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="30" y1="50" x2="80" y2="50" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
            {/* Card 3 */}
            <rect x="0" y="71" width="100" height="24" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <circle cx="15" cy="83" r="6" fill="#64748b" />
            <line x1="30" y1="83" x2="75" y2="83" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "contractor":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-dash-cont" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="url(#bg-dash-cont)" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Construction Site Infrastructure */}
          <g stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1.5">
            <line x1="20" y1="0" x2="20" y2="150" />
            <line x1="70" y1="0" x2="70" y2="150" />
            <line x1="120" y1="0" x2="120" y2="150" />
            <line x1="170" y1="0" x2="170" y2="150" />
            <line x1="0" y1="40" x2="300" y2="40" />
            <line x1="0" y1="90" x2="300" y2="90" />
          </g>
          {/* Live site monitoring blueprint */}
          <g transform="translate(30, 30)" stroke="#f59e0b" strokeWidth="1.5" fill="none">
            <polygon points="10,80 60,10 110,80" />
            <line x1="60" y1="10" x2="60" y2="80" strokeDasharray="3 3" />
            <rect x="50" y="40" width="20" height="10" fill="#3f1e05" strokeWidth="1" />
          </g>
          {/* Workforce deployment counter bar chart */}
          <g transform="translate(180, 40)">
            <rect x="10" y="50" width="12" height="40" rx="2" fill="#ea580c" />
            <rect x="30" y="20" width="12" height="70" rx="2" fill="#fbbf24" />
            <rect x="50" y="35" width="12" height="55" rx="2" fill="#f97316" />
            <line x1="0" y1="90" x2="80" y2="90" stroke="#cbd5e1" strokeWidth="2" />
          </g>
        </svg>
      );

    case "admin":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-dash-admin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="admin-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="url(#bg-dash-admin)" stroke="#e11d48" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* National control room system nodes */}
          <g transform="translate(40, 25)">
            <rect x="0" y="0" width="220" height="100" rx="8" fill="#020617" stroke="#334155" strokeWidth="1.5" />
            {/* World / India geographic mesh stylized */}
            <path d="M20,50 C40,30 80,70 120,40 T200,60" fill="none" stroke="#e11d48" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="80" cy="50" r="3" fill="#e11d48" />
            <circle cx="140" cy="45" r="4" fill="url(#admin-glow)" />
            <circle cx="140" cy="45" r="10" fill="none" stroke="#e11d48" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 1" />
            {/* Monitoring server columns */}
            <rect x="25" y="15" width="40" height="15" rx="2" fill="#1e293b" />
            <circle cx="32" cy="22.5" r="2" fill="#10b981" />
            <line x1="42" y1="22.5" x2="60" y2="22.5" stroke="#cbd5e1" strokeWidth="2" />
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <rect width="300" height="150" rx="16" fill="#1e293b" />
          <circle cx="150" cy="75" r="20" fill="#cbd5e1" />
        </svg>
      );
  }
}

// 4. National Intelligence Illustrations (6 types)
export function IntelIllustration({ type, className = "w-full h-40", alt = "Intelligence Panel" }: { type: string; className?: string; alt?: string }) {
  const normType = type.toLowerCase();
  switch (normType) {
    case "india_network":
    case "network":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-intel-net" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#022c22" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="url(#bg-intel-net)" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Nodes spreading out */}
          <g stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5">
            <line x1="150" y1="75" x2="80" y2="40" />
            <line x1="150" y1="75" x2="220" y2="40" />
            <line x1="150" y1="75" x2="80" y2="110" />
            <line x1="150" y1="75" x2="220" y2="110" />
          </g>
          <circle cx="150" cy="75" r="8" fill="#10b981" />
          <circle cx="150" cy="75" r="18" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="80" cy="40" r="5" fill="#34d399" />
          <circle cx="220" cy="40" r="5" fill="#34d399" />
          <circle cx="80" cy="110" r="5" fill="#34d399" />
          <circle cx="220" cy="110" r="5" fill="#34d399" />
        </svg>
      );

    case "district":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-intel-dist" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="url(#bg-intel-dist)" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Stylized territorial / regional maps */}
          <g fill="none" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1.5">
            <polygon points="40,30 80,20 120,40 100,80 50,70" />
            <polygon points="120,40 170,25 210,50 180,90 100,80" />
            <polygon points="100,80 180,90 150,130 90,120" />
          </g>
          {/* Active hotspot location indicator */}
          <circle cx="130" cy="65" r="5" fill="#f59e0b" />
          <circle cx="130" cy="65" r="14" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 3" />
        </svg>
      );

    case "heatmap":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <radialGradient id="heat-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="#0f172a" stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Heat map density clouds */}
          <circle cx="150" cy="75" r="45" fill="url(#heat-glow)" />
          <circle cx="90" cy="50" r="30" fill="url(#heat-glow)" />
          <circle cx="210" cy="100" r="35" fill="url(#heat-glow)" />
          {/* Grid lines */}
          <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5">
            <line x1="50" y1="0" x2="50" y2="150" />
            <line x1="100" y1="0" x2="100" y2="150" />
            <line x1="150" y1="0" x2="150" y2="150" />
            <line x1="200" y1="0" x2="200" y2="150" />
            <line x1="250" y1="0" x2="250" y2="150" />
          </g>
        </svg>
      );

    case "skills":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <rect width="300" height="150" rx="16" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Skill Radar / spider web analytics */}
          <polygon points="150,20 220,55 220,110 150,135 80,110 80,55" fill="none" stroke="#a78bfa" strokeOpacity="0.2" strokeWidth="1" />
          <polygon points="150,40 195,65 195,100 150,115 105,100 105,65" fill="none" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="1" />
          {/* Active Skill Area fill */}
          <polygon points="150,30 210,60 180,105 150,115 115,80 90,55" fill="#c084fc" fillOpacity="0.25" stroke="#a78bfa" strokeWidth="2" />
        </svg>
      );

    case "migration":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <defs>
            <linearGradient id="bg-intel-mig" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="300" height="150" rx="16" fill="url(#bg-intel-mig)" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Arched migration direction vectors */}
          <path d="M40,110 Q145,15 250,110" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 4" />
          <path d="M60,110 Q145,35 230,110" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Flight arrow heads */}
          <polygon points="250,110 242,102 248,100" fill="#38bdf8" />
          <polygon points="230,110 224,104 229,102" fill="#f59e0b" />
          {/* Origin/Destination dots */}
          <circle cx="40" cy="110" r="4.5" fill="#ef4444" />
          <circle cx="250" cy="110" r="5" fill="#10b981" />
        </svg>
      );

    case "digital_infra":
    case "infrastructure":
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <rect width="300" height="150" rx="16" fill="#111827" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.3" />
          {/* Isometric Blockchain blocks or Server racks stacked up */}
          <g transform="translate(100, 20)">
            {/* Block 1 (top) */}
            <polygon points="50,15 90,30 50,45 10,30" fill="#374151" stroke="#4b5563" strokeWidth="1" />
            <polygon points="10,30 50,45 50,60 10,45" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
            <polygon points="50,45 90,30 90,45 50,60" fill="#111827" stroke="#4b5563" strokeWidth="1" />
            {/* Block 2 (bottom) */}
            <polygon points="50,45 90,60 50,75 10,60" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1" />
            <polygon points="10,60 50,75 50,90 10,75" fill="#1d4ed8" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
            <polygon points="50,75 90,60 90,75 50,90" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
            {/* Connection beam line */}
            <line x1="50" y1="45" x2="50" y2="55" stroke="#f59e0b" strokeWidth="2.5" />
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 300 150" className={className} aria-label={alt}>
          <rect width="300" height="150" rx="16" fill="#1e293b" />
          <circle cx="150" cy="75" r="20" fill="#cbd5e1" />
        </svg>
      );
  }
}

// 5. Main Home Page Hero Illustration (wide banner, Indian workers confident)
export function HeroIllustration({ className = "w-full h-full", alt = "LabourAdda Hero Illustration" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 600 350" className={className} aria-label={alt}>
      <defs>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#d97706" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flag-orange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff9933" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="flag-green" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#128807" />
          <stop offset="100%" stopColor="#0d5205" />
        </linearGradient>
        <linearGradient id="helmet-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="sky-grid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Deep twilight atmospheric sky */}
      <rect width="600" height="350" rx="24" fill="url(#sky-grid)" stroke="#475569" strokeWidth="0.75" />

      {/* Giant glowing Indian sun */}
      <circle cx="300" cy="180" r="160" fill="url(#hero-sun)" />

      {/* Background industrial infrastructure grid / crane */}
      <g stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.08" fill="none">
        <line x1="50" y1="0" x2="50" y2="350" />
        <line x1="150" y1="0" x2="150" y2="350" />
        <line x1="250" y1="0" x2="250" y2="350" />
        <line x1="350" y1="0" x2="350" y2="350" />
        <line x1="450" y1="0" x2="450" y2="350" />
        <line x1="550" y1="0" x2="550" y2="350" />
        <line x1="0" y1="100" x2="600" y2="100" />
        <line x1="0" y1="200" x2="600" y2="200" />
      </g>
      <path d="M480,350 L480,110 L560,110 M480,130 L520,110 M480,350 L580,350" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeOpacity="0.1" />

      {/* Digital blockchain network coordinates overhead (AI Matching theme) */}
      <g stroke="#38bdf8" strokeWidth="1.25" strokeOpacity="0.2">
        <line x1="200" y1="60" x2="300" y2="100" />
        <line x1="300" y1="100" x2="400" y2="60" />
        <circle cx="200" cy="60" r="3" fill="#38bdf8" />
        <circle cx="300" cy="100" r="4" fill="#fbbf24" />
        <circle cx="400" cy="60" r="3" fill="#38bdf8" />
      </g>

      {/* Foreground Silhouette / stylized bodies of Confident Indian Workers */}
      {/* 1. Left: Agriculture Worker (female) */}
      <g transform="translate(100, 160)">
        {/* Body and headwrap */}
        <path d="M10,190 C10,120 70,120 70,190 Z" fill="url(#flag-orange)" fillOpacity="0.8" />
        <circle cx="40" cy="100" r="15" fill="#fbcfe8" fillOpacity="0.25" stroke="#f472b6" strokeWidth="1.5" />
        {/* Head wrap (saree/ghunghat) */}
        <path d="M22,95 C22,75 58,75 58,95 C58,115 22,115 22,95" fill="#f43f5e" />
        {/* Sickle tool */}
        <path d="M15,150 C5,130 5,110 20,110 C20,115 10,120 15,140" fill="#94a3b8" />
        <rect x="13" y="140" width="4" height="12" rx="1" fill="#7c2d12" />
      </g>

      {/* 2. Right: Site Engineer (holding blueprint) */}
      <g transform="translate(360, 150)">
        <path d="M20,200 C20,130 80,130 80,200 Z" fill="url(#flag-green)" fillOpacity="0.8" />
        <circle cx="50" cy="110" r="16" fill="#bae6fd" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Engineer white hard hat */}
        <path d="M34,108 C34,95 66,95 66,108 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="30" y="108" width="40" height="2.5" rx="0.5" fill="#cbd5e1" />
        {/* Blueprint roll */}
        <rect x="15" y="150" width="40" height="10" rx="2" fill="#cbd5e1" transform="rotate(-15 35 155)" />
      </g>

      {/* 3. Center: Chief Mason / Contractor (in yellow helmet & safety vest) */}
      <g transform="translate(220, 110)">
        {/* Reflective safety vest and neck */}
        <path d="M20,240 C20,150 110,150 110,240 Z" fill="#1e293b" />
        {/* Safety vest stripes */}
        <path d="M35,190 L50,240 M95,190 L80,240" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
        <path d="M30,210 L100,210" stroke="#fbbf24" strokeWidth="5" />
        <circle cx="65" cy="120" r="22" fill="#fed7aa" fillOpacity="0.25" stroke="#f97316" strokeWidth="2" />
        {/* Yellow hard hat */}
        <path d="M42,115 C42,95 88,95 88,115 Z" fill="url(#helmet-yellow)" />
        <rect x="36" y="115" width="58" height="3.5" rx="1" fill="#ca8a04" />
        <path d="M60,105 L70,105 L65,115" fill="#ca8a04" /> {/* Helmet rib */}
      </g>

      {/* Decorative Brand Tag overlay */}
      <rect x="230" y="20" width="140" height="30" rx="8" fill="#1e293b" fillOpacity="0.9" stroke="#f59e0b" strokeWidth="1" />
      <text x="300" y="39" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
        LABOURADDA v2.0
      </text>
    </svg>
  );
}
