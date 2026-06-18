import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Package, Truck, Ship, Globe2, MessageSquare, ShieldCheck } from 'lucide-react';

const NODES = [
  {
    id: 'sourcing', label: 'Sourcing', icon: Package, angle: 0,
    desc: 'Supplier identification, qualification, procurement pathway development, and sourcing support.',
  },
  {
    id: 'safety', label: 'Safety & Quality', icon: ShieldCheck, angle: 60,
    desc: 'Quality assurance, compliance management, risk assessment, audit oversight, and safety review.',
  },
  {
    id: 'logistics', label: 'Logistics', icon: Truck, angle: 120,
    desc: 'Supply chain planning, operational coordination, inventory movement, and network optimization.',
  },
  {
    id: 'freight', label: 'Freight', icon: Ship, angle: 180,
    desc: 'Freight coordination, transport management, shipment visibility, and multimodal route execution.',
  },
  {
    id: 'trade', label: 'Trade', icon: Globe2, angle: 240,
    desc: 'Trade documentation, commercial coordination, regulatory support, and international market facilitation.',
  },
  {
    id: 'advisory', label: 'Advisory', icon: MessageSquare, angle: 300,
    desc: 'Supply chain guidance, risk review, execution planning, and operational improvement support.',
  },
];

const R = 36;
const C = 50;
const positions = NODES.map((n) => {
  const rad = ((n.angle - 90) * Math.PI) / 180;
  return { ...n, x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) };
});

export default function WhoWeAre() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section id="who" className="section" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <span className="eyebrow">WHO WE ARE</span>
            <h2 className="h1" style={{ marginTop: 22 }}>
              WE SIMPLIFY<br />
              <span style={{ color: 'var(--river)' }}>COMPLEX SUPPLY CHAINS</span>
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 420 }}>
            River Global was built for the realities of modern trade, where fragmented sourcing,
            disconnected logistics, and opaque freight markets create constant operational frictions
            and commercial risk.
          </p>
        </motion.div>

        {/* Two-col: copy left, diagram right */}
        <div className="who-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="lead" style={{ marginBottom: 24 }}>
              We create clarity through integrated edge. We are not simply a supplier, nor simply
              logistics, not simply freight forwarding.
            </p>
            <p className="body" style={{ marginBottom: 24 }}>
              We operate as a unified commercial execution partner — coordinating sourcing,
              logistics, freight, and international trade from origin to delivery.
            </p>
            <p className="body">
              Our model is built on Australian compliance frameworks combined with on-the-ground
              Indian operational support — giving customers cross-border capability without the
              coordination overhead of managing multiple vendors.
            </p>
          </motion.div>

          {/* Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{
                fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase',
                letterSpacing: '0.18em', fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ width: 18, height: 1, background: 'var(--muted-2)' }} />
                ONE ACCOUNTABLE TEAM
                <span style={{ width: 18, height: 1, background: 'var(--muted-2)' }} />
              </span>
            </div>

            <div className="who-diagram">
              <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: '100%', display: 'block' }}>
                <defs>
                  <radialGradient id="hubGrad2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--ink)" />
                    <stop offset="100%" stopColor="var(--ink-soft)" />
                  </radialGradient>
                  <radialGradient id="nodeGlow2">
                    <stop offset="0%" stopColor="var(--river-soft)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--river-soft)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Orbit ring */}
                <motion.circle cx={C} cy={C} r={R} fill="none" stroke="var(--line-2)"
                  strokeWidth="0.18" strokeDasharray="0.6 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Spokes */}
                {positions.map((node, i) => (
                  <motion.line key={`spoke-${node.id}`}
                    x1={C} y1={C} x2={node.x} y2={node.y}
                    stroke={hoveredNode === node.id ? 'var(--river)' : 'rgba(14,85,96,0.55)'}
                    strokeWidth={hoveredNode === node.id ? 0.55 : 0.38}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.7 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                ))}

                {/* Pulse beads */}
                {positions.map((node, i) => (
                  <circle key={`pulse-${node.id}`} r="0.5" fill="var(--river)">
                    <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"
                      begin={`${1.5 + i * 0.5}s`} path={`M ${C} ${C} L ${node.x} ${node.y}`} />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1"
                      dur={`${3 + i * 0.3}s`} repeatCount="indefinite" begin={`${1.5 + i * 0.5}s`} />
                  </circle>
                ))}

                {/* Soft glow only on hover — keeps the default diagram clean */}
                {positions.map((node) => (
                  <circle key={`glow-${node.id}`} cx={node.x} cy={node.y} r="5" fill="url(#nodeGlow2)"
                    style={{ opacity: hoveredNode === node.id ? 0.7 : 0, transition: 'opacity 0.3s' }} />
                ))}

                {/* Center hub — enlarged */}
                <motion.circle cx={C} cy={C} r="14" fill="none" stroke="var(--river)"
                  strokeWidth="0.15" strokeDasharray="0.4 0.6"
                  initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 0.5 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ transformOrigin: `${C}px ${C}px` }}
                />
                <motion.circle cx={C} cy={C} r="10.5" fill="url(#hubGrad2)"
                  initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: `${C}px ${C}px` }}
                />
                <text x={C} y={C} dy="-0.4" fontSize="3" fill="var(--paper)" textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="700" letterSpacing="0.1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  RIVER
                </text>
                <text x={C} y={C} dy="3" fontSize="1.7" fill="rgba(250,250,247,0.65)" textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="500" letterSpacing="0.42" style={{ fontFamily: 'Inter, sans-serif' }}>
                  GLOBAL
                </text>
              </svg>

              {/* Labels — icon sits exactly on the ring, text floats radially outward */}
              {positions.map((node, i) => {
                const Icon = node.icon;
                const isHover = hoveredNode === node.id;
                const above = node.y < C - 1;
                return (
                  <motion.div key={`label-${node.id}`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
                    style={{
                      position: 'absolute',
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      width: 0,
                      height: 0,
                      cursor: 'default',
                    }}
                  >
                    {/* Icon marker — centered exactly on the ring point */}
                    <div style={{
                      position: 'absolute',
                      left: 0, top: 0,
                      width: 38, height: 38, borderRadius: 999,
                      transform: `translate(-50%, -50%) scale(${isHover ? 1.1 : 1})`,
                      background: isHover ? 'var(--ink)' : 'var(--paper)',
                      border: `1px solid ${isHover ? 'var(--ink)' : 'var(--line-2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isHover ? 'var(--paper)' : 'var(--river-soft)',
                      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      boxShadow: '0 0 0 4px var(--paper)',
                    }}>
                      <Icon size={15} strokeWidth={1.6} />
                    </div>
                    {/* Text label — pushed radially outward so it never shifts the icon */}
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      [above ? 'bottom' : 'top']: 24,
                      transform: 'translateX(-50%)',
                      fontSize: 10.5, fontWeight: 600, letterSpacing: '0.04em',
                      color: isHover ? 'var(--ink)' : 'var(--muted)',
                      whiteSpace: 'nowrap', transition: 'color 0.3s',
                    }}>
                      {node.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Description boxes — 3 per row, 2 rows */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="who-desc-grid"
        >
          {NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.id} style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 12,
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={18} strokeWidth={1.5} color="var(--river-soft)" />
                  <span style={{
                    fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em',
                    color: 'var(--ink)',
                  }}>
                    {node.label}
                  </span>
                </div>
                <motion.div style={{ height: 1, background: 'var(--river)', width: 24, opacity: 0.5 }}
                  whileHover={{ width: 48, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <p style={{
                  fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6,
                }}>
                  {node.desc}
                </p>
              </div>
            );
          })}
        </motion.div>

      </div>

      <style>{`
        .who-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
          margin-bottom: 56px;
        }
        .who-diagram {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 420px;
          margin: 0 auto;
        }
        .who-desc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 960px) {
          .who-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .who-desc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .who-desc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
