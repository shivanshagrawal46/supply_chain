import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const footerCols = [
  {
    title: 'Capabilities',
    links: ['Integrated Supply', 'Logistics Coordination', 'Freight Coordination', 'International Trade', 'Operational Assurance'],
  },
  {
    title: 'Industries',
    links: ['Agriculture', 'Mining', 'Energy & Oil/Gas', 'Infrastructure', 'Manufacturing', 'Medical & Pharma'],
  },
  {
    title: 'Products',
    links: ['Industrial Minerals', 'Fertilisers', 'Chemicals & Reagents', 'Bulk Commodities', 'Industrial Gases'],
  },
  {
    title: 'Company',
    links: ['Who we are', 'Network', 'Leadership', 'Values', 'Contact'],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', paddingTop: 100, paddingBottom: 40, position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 32,
            paddingBottom: 60,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Supply & Trade Partner</span>
            <h3 className="display" style={{ color: 'var(--paper)', marginTop: 22, fontSize: 'clamp(40px, 6vw, 76px)', maxWidth: 880 }}>
              Integrated supply, <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river-mist)' }}>logistics</span><br />
              and trade execution<br />
              across global markets.
            </h3>
          </div>
          <a href="#contact" className="btn btn-light">
            Start a conversation <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Logo + Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr',
          gap: 40,
          paddingTop: 60,
          paddingBottom: 60,
        }} className="footer-cols">
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, marginBottom: 24 }}>
              <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--paper)' }}>
                RIVER
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 28, paddingTop: 2 }}>
                {'GLOBAL'.split('').map((c, i) => (
                  <span key={i} style={{ fontSize: 6, fontWeight: 700, letterSpacing: '0.2em', lineHeight: 1, color: 'var(--paper)' }}>
                    {c}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: 8, fontWeight: 500, color: 'var(--paper)', marginTop: 2 }}>™</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 20 }}>
              Australian operations · Indian operational support · Cross-border execution across Asia Pacific and the Middle East.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Sydney', 'Mumbai', 'Singapore', 'Dubai'].map((c) => (
                <span key={c} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', marginBottom: 18, fontWeight: 600 }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.75)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--river-mist)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: 12,
          color: 'rgba(255,255,255,0.45)',
        }}>
          <span>© {new Date().getFullYear()} River Global. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.45)' }}>Privacy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.45)' }}>Terms</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.45)' }}>HSE Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.45)' }}>Compliance</a>
          </div>
          <span className="mono">Document control · Rev 1.0 · 05/2026</span>
        </div>
      </div>

      {/* Giant wordmark backdrop */}
      <div style={{
        position: 'absolute',
        bottom: -50,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 'clamp(140px, 24vw, 320px)',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.025)',
        letterSpacing: '-0.06em',
        pointerEvents: 'none',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        RIVER GLOBAL
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
