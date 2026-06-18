import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { networkLocations } from '../data/siteData';

interface Hub {
  id: string;
  name: string;
  x: number;
  y: number;
  tier: 1 | 2 | 3;
  labelAnchor?: 'start' | 'middle' | 'end';
  labelDx?: number;
  labelDy?: number;
}

// Stylized positions on a 100×100 canvas — chosen for visual balance,
// not raw geography (advertising-style network composition).
const HUBS: Hub[] = [
  // West (Europe)
  { id: 'rotterdam', name: 'Rotterdam', x: 14, y: 32, tier: 2, labelAnchor: 'start', labelDx: 3, labelDy: 1 },
  // Middle East
  { id: 'dubai', name: 'Dubai', x: 30, y: 44, tier: 2, labelAnchor: 'middle', labelDy: -3 },
  // India (primary)
  { id: 'mumbai', name: 'Mumbai', x: 42, y: 52, tier: 1, labelAnchor: 'end', labelDx: -3.2, labelDy: 1 },
  // Far East
  { id: 'shanghai', name: 'Shanghai', x: 72, y: 30, tier: 2, labelAnchor: 'middle', labelDy: -3 },
  // SE Asia
  { id: 'singapore', name: 'Singapore', x: 60, y: 56, tier: 2, labelAnchor: 'start', labelDx: 3, labelDy: 1 },
  // Australia (primary destination — multiple ports)
  { id: 'darwin', name: 'Darwin', x: 70, y: 64, tier: 3, labelAnchor: 'middle', labelDy: -3 },
  { id: 'perth', name: 'Perth', x: 60, y: 80, tier: 3, labelAnchor: 'end', labelDx: -3, labelDy: 1 },
  { id: 'adelaide', name: 'Adelaide', x: 74, y: 86, tier: 3, labelAnchor: 'middle', labelDy: 5 },
  { id: 'melbourne', name: 'Melbourne', x: 81, y: 90, tier: 3, labelAnchor: 'middle', labelDy: 5 },
  { id: 'sydney', name: 'Sydney', x: 88, y: 82, tier: 1, labelAnchor: 'start', labelDx: 3, labelDy: 1 },
  { id: 'brisbane', name: 'Brisbane', x: 90, y: 70, tier: 3, labelAnchor: 'start', labelDx: 3, labelDy: 1 },
];

// Network web — each pair becomes a high-arc curve
const ROUTES: Array<[string, string]> = [
  ['rotterdam', 'dubai'],
  ['rotterdam', 'mumbai'],
  ['dubai', 'mumbai'],
  ['dubai', 'singapore'],
  ['mumbai', 'singapore'],
  ['mumbai', 'shanghai'],
  ['shanghai', 'singapore'],
  // International → Australian ports
  ['singapore', 'darwin'],
  ['singapore', 'perth'],
  ['shanghai', 'brisbane'],
  ['mumbai', 'perth'],
  ['singapore', 'sydney'],
  ['shanghai', 'sydney'],
  // Domestic Australian corridors between ports
  ['perth', 'adelaide'],
  ['darwin', 'brisbane'],
  ['adelaide', 'melbourne'],
  ['melbourne', 'sydney'],
  ['sydney', 'brisbane'],
];

// Build a fast lookup
const hubMap: Record<string, Hub> = {};
HUBS.forEach((h) => (hubMap[h.id] = h));

// Build curved "union" arcs that always bow upward (concave-up)
function buildArc(a: Hub, b: Hub): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  const nx = -dy / dist;
  const ny = dx / dist;
  // Force the arc to bow upward (toward -y)
  const sign = ny > 0 ? -1 : 1;
  const offset = dist * 0.38;
  const cx = midX + nx * offset * sign;
  const cy = midY + ny * offset * sign;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

const routePaths = ROUTES.map(([fromId, toId]) => {
  const a = hubMap[fromId];
  const b = hubMap[toId];
  if (!a || !b) return null;
  return { from: a, to: b, d: buildArc(a, b) };
}).filter(Boolean) as Array<{ from: Hub; to: Hub; d: string }>;

// Headline corridors that get animated travelling pulses
const SIGNATURE = [
  ['singapore', 'sydney'],
  ['mumbai', 'perth'],
  ['rotterdam', 'mumbai'],
  ['dubai', 'singapore'],
  ['shanghai', 'brisbane'],
  ['singapore', 'darwin'],
];

export default function GlobalNetwork() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="network" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">GLOBAL NETWORK</span>
            <h2 className="h1" style={{ marginTop: 22 }}>
              CONNECTING AUSTRALIAN DEMAND WITH<br />
              <span style={{ color: 'var(--river)' }}>INTERNATIONAL SUPPLY CAPACITY</span>
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 400 }}>
            River Global operates across Asia, connecting Australian demand with supply capacity
            across international markets. Our trade network spans multiple commodity sectors and
            freight corridors — navigating regulatory environments, port infrastructure, and freight
            market conditions across multiple jurisdictions.
          </p>
        </motion.div>

        {/* Side-by-side: compact map (left) + locations list (right) */}
        <div className="network-grid">
          {/* MAP — compact, less than half width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              position: 'relative',
              background: 'var(--ink)',
              borderRadius: 16,
              padding: 18,
              aspectRatio: '1 / 1',
              overflow: 'hidden',
            }}
          >
            {/* Soft radial glow background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(70% 70% at 60% 55%, rgba(29,137,151,0.22) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            {/* Subtle globe arc — suggests world curvature without showing a map */}
            <svg
              viewBox="0 0 100 100"
              style={{ width: '100%', height: '100%', position: 'relative' }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="dotsBg" width="3" height="3" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="0.22" fill="rgba(255,255,255,0.07)" />
                </pattern>

                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(74,195,209,0)" />
                  <stop offset="25%" stopColor="rgba(74,195,209,0.55)" />
                  <stop offset="75%" stopColor="rgba(74,195,209,0.55)" />
                  <stop offset="100%" stopColor="rgba(74,195,209,0)" />
                </linearGradient>

                <linearGradient id="arcGradBright" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(74,195,209,0)" />
                  <stop offset="50%" stopColor="rgba(115, 230, 245, 0.9)" />
                  <stop offset="100%" stopColor="rgba(74,195,209,0)" />
                </linearGradient>

                <radialGradient id="hubGlow">
                  <stop offset="0%" stopColor="rgba(74,195,209,0.95)" />
                  <stop offset="100%" stopColor="rgba(74,195,209,0)" />
                </radialGradient>

                <radialGradient id="hubGlowSoft">
                  <stop offset="0%" stopColor="rgba(29,137,151,0.65)" />
                  <stop offset="100%" stopColor="rgba(29,137,151,0)" />
                </radialGradient>

                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background dots */}
              <rect width="100" height="100" fill="url(#dotsBg)" />

              {/* Subtle globe meridian curves — implies world without using a map */}
              <g opacity="0.18" stroke="rgba(255,255,255,0.4)" strokeWidth="0.12" fill="none">
                <ellipse cx="50" cy="50" rx="38" ry="38" />
                <ellipse cx="50" cy="50" rx="38" ry="14" />
                <ellipse cx="50" cy="50" rx="14" ry="38" />
                <path d="M 12 50 Q 50 28 88 50" />
                <path d="M 12 50 Q 50 72 88 50" />
              </g>

              {/* Route web — high concave arcs */}
              {routePaths.map((r, i) => (
                <motion.path
                  key={`route-${i}`}
                  d={r.d}
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="0.32"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 1.8,
                    delay: 0.5 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}

              {/* Bright traveling glow segment on signature corridors */}
              {SIGNATURE.map(([fromId, toId], i) => {
                const route = routePaths.find(
                  (r) => r.from.id === fromId && r.to.id === toId,
                );
                if (!route) return null;
                return (
                  <g key={`sig-${i}`} filter="url(#softGlow)">
                    {/* Trailing glowing bead */}
                    <circle r="0.9" fill="#73e6f5">
                      <animateMotion
                        dur={`${4.2 + i * 0.7}s`}
                        repeatCount="indefinite"
                        begin={`${1.6 + i * 0.6}s`}
                        path={route.d}
                        rotate="auto"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.1;0.85;1"
                        dur={`${4.2 + i * 0.7}s`}
                        repeatCount="indefinite"
                        begin={`${1.6 + i * 0.6}s`}
                      />
                    </circle>
                    {/* Tiny trailing dot */}
                    <circle r="0.45" fill="#ffffff">
                      <animateMotion
                        dur={`${4.2 + i * 0.7}s`}
                        repeatCount="indefinite"
                        begin={`${1.7 + i * 0.6}s`}
                        path={route.d}
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0.8;0"
                        keyTimes="0;0.5;1"
                        dur={`${4.2 + i * 0.7}s`}
                        repeatCount="indefinite"
                        begin={`${1.7 + i * 0.6}s`}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Hubs */}
              {HUBS.map((hub, i) => {
                const isPrimary = hub.tier === 1;
                const isSupport = hub.tier === 2;
                return (
                  <g key={hub.id}>
                    {isPrimary && (
                      <>
                        {/* Outer soft glow */}
                        <motion.circle
                          cx={hub.x}
                          cy={hub.y}
                          r="4"
                          fill="url(#hubGlow)"
                          initial={{ opacity: 0 }}
                          animate={
                            inView ? { opacity: [0.25, 0.95, 0.25] } : {}
                          }
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            delay: 1 + i * 0.15,
                            ease: 'easeInOut',
                          }}
                        />
                        {/* Expanding sonar ring */}
                        <motion.circle
                          cx={hub.x}
                          cy={hub.y}
                          r="1.6"
                          fill="none"
                          stroke="rgba(115,230,245,0.6)"
                          strokeWidth="0.18"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={inView ? { scale: [0, 2.6], opacity: [0.8, 0] } : {}}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            delay: 1.2 + i * 0.2,
                            ease: 'easeOut',
                          }}
                          style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                        />
                      </>
                    )}

                    {isSupport && (
                      <motion.circle
                        cx={hub.x}
                        cy={hub.y}
                        r="2"
                        fill="url(#hubGlowSoft)"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 0.55 } : {}}
                        transition={{ duration: 0.7, delay: 1 + i * 0.08 }}
                      />
                    )}

                    {/* Core dot */}
                    <motion.circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isPrimary ? 1.1 : isSupport ? 0.8 : 0.55}
                      fill={
                        isPrimary
                          ? '#73e6f5'
                          : isSupport
                          ? '#1d8997'
                          : 'rgba(255,255,255,0.85)'
                      }
                      stroke={isPrimary ? 'rgba(255,255,255,0.6)' : 'none'}
                      strokeWidth={isPrimary ? 0.18 : 0}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.45, delay: 0.7 + i * 0.06 }}
                    />

                    {/* Label */}
                    <motion.text
                      x={hub.x + (hub.labelDx ?? 0)}
                      y={hub.y + (hub.labelDy ?? -2.4)}
                      fontSize="2"
                      fill={isPrimary ? '#ffffff' : 'rgba(255,255,255,0.78)'}
                      textAnchor={hub.labelAnchor ?? 'middle'}
                      fontWeight={isPrimary ? 600 : 500}
                      letterSpacing="0.04"
                      style={{
                        paintOrder: 'stroke',
                        stroke: 'rgba(8,8,8,0.85)',
                        strokeWidth: 0.55,
                        strokeLinejoin: 'round',
                      }}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.1 + i * 0.08 }}
                    >
                      {hub.name}
                    </motion.text>
                  </g>
                );
              })}
            </svg>

            {/* Top-left meta */}
            <div
              style={{
                position: 'absolute',
                left: 18,
                top: 16,
                fontSize: 9.5,
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#73e6f5',
                  boxShadow: '0 0 8px rgba(115,230,245,0.8)',
                }}
              />
              Live network
            </div>

            {/* Top-right counter */}
            <div
              style={{
                position: 'absolute',
                right: 18,
                top: 16,
                fontSize: 9.5,
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                textAlign: 'right',
              }}
            >
              09 hubs · 13 corridors
            </div>

            {/* Legend */}
            <div
              style={{
                position: 'absolute',
                left: 18,
                bottom: 16,
                display: 'flex',
                gap: 14,
                fontSize: 8.5,
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 500,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#73e6f5',
                    boxShadow: '0 0 6px rgba(115,230,245,0.8)',
                  }}
                />
                Primary
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#1d8997',
                  }}
                />
                Support
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                  }}
                />
                Partner
              </span>
            </div>
          </motion.div>

          {/* Locations list — right side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {networkLocations.map((loc, i) => (
              <motion.div
                key={loc.region}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                style={{
                  padding: '18px 0',
                  borderBottom:
                    i < networkLocations.length - 1 ? '1px solid var(--line)' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9.5,
                      padding: '4px 10px',
                      borderRadius: 999,
                      border: '1px solid var(--line-2)',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      whiteSpace: 'nowrap',
                      fontWeight: 600,
                    }}
                  >
                    {loc.type}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    marginBottom: 0,
                    lineHeight: 1.15,
                  }}
                >
                  {loc.region}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .network-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .network-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
