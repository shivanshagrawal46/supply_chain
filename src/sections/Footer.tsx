import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

const NAV_MAP = [
  {
    title: 'Company',
    links: [
      { label: 'Who We Are', href: '#who' },
      { label: 'What We Do', href: '#capabilities' },
      { label: 'Values', href: '#values' },
    ],
  },
  {
    title: 'Offerings',
    links: [
      { label: 'Industries We Serve', href: '#industries' },
      { label: 'Products & Materials', href: '#products' },
      { label: 'How We Do It', href: '#motion' },
      { label: 'Global Network', href: '#network' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Why River Global', href: '#why' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>

      {/* ─── START A CONVERSATION strip ─── */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: 'clamp(48px, 7vw, 80px) 0',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 32,
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>
                START A CONVERSATION
              </span>
              <h3 style={{
                fontFamily: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                marginTop: 18,
                fontSize: 'clamp(22px, 3vw, 38px)',
                fontWeight: 600,
                letterSpacing: '0.01em',
                lineHeight: 1.18,
                color: 'var(--paper)',
                maxWidth: 760,
              }}>
                INTEGRATED SUPPLY<br />
                COORDINATED LOGISTICS<br />
                <span style={{ color: 'var(--river-mist)' }}>GLOBAL TRADE EXECUTION</span>
              </h3>
            </div>
            <a href="#contact" className="btn btn-light">
              Talk to us <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ─── LOGO + SITE MAP + CONTACT ─── */}
      <div style={{ padding: '56px 0 0' }}>
        <div className="container">
          <div className="footer-map-grid">

            {/* Brand column */}
            <div>
              {/* Logo wordmark */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: 18 }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 28, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1, color: 'var(--paper)',
                }}>
                  RIVER
                </span>
                <div style={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  height: 20, marginTop: 4,
                }}>
                  {'GLOBAL'.split('').map((c, i) => (
                    <span key={i} style={{
                      fontSize: 4.2, fontWeight: 800, letterSpacing: '0.14em',
                      lineHeight: 0.75, color: 'var(--paper)',
                      height: 3.2, display: 'block',
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
                <span style={{
                  fontSize: 8, fontWeight: 600, color: 'var(--paper)', marginTop: 3, letterSpacing: '0.05em',
                }}>™</span>
              </div>

              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 20, maxWidth: 260 }}>
                Integrated supply, coordinated logistics, and global trade execution.
              </p>

              {/* Contact */}
              <a
                href="mailto:contact@riverglobal.com.au"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 12.5, color: 'var(--river-mist)', textDecoration: 'none',
                  fontWeight: 500, transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--paper)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--river-mist)')}
              >
                <Mail size={13} strokeWidth={1.5} />
                contact@riverglobal.com.au
              </a>
            </div>

            {/* Nav columns */}
            {NAV_MAP.map((col) => (
              <div key={col.title}>
                <div style={{
                  fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.38)', marginBottom: 16, fontWeight: 600,
                }}>
                  {col.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--river-mist)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM STRIP ─── */}
      <div style={{
        marginTop: 48,
        paddingTop: 22,
        paddingBottom: 28,
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
          fontSize: 11.5,
          color: 'rgba(255,255,255,0.38)',
        }}>
          <span>© {new Date().getFullYear()} River Global Pty Ltd. All rights reserved.</span>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em' }}>
            General inquiries: contact@riverglobal.com.au
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms'].map((l) => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--river-mist)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant backdrop wordmark */}
      <div style={{
        position: 'absolute', bottom: -30, left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 'clamp(100px, 18vw, 240px)',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.018)',
        letterSpacing: '-0.06em',
        pointerEvents: 'none',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        zIndex: 0,
      }}>
        RIVER GLOBAL
      </div>

      <style>{`
        .footer-map-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 900px) {
          .footer-map-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-map-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
