import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks } from '../data/siteData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: scrolled ? '16px 0' : '24px 0',
    background: scrolled ? 'rgba(250, 250, 247, 0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={navStyles}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: '-0.06em',
                lineHeight: 1,
                color: 'var(--ink)',
              }}
            >
              RIVER
            </span>
            {/* GLOBAL column sized to match RIVER's cap-height (≈ 30px at 40px font) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 30,
                marginTop: 5,
              }}
            >
              {'GLOBAL'.split('').map((c, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 6.2,
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    lineHeight: 0.75,
                    color: 'var(--ink)',
                    height: 4.6,
                    display: 'block',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--ink)',
                marginTop: 4,
                letterSpacing: '0.05em',
              }}
            >
              ™
            </span>
          </a>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--ink)',
                  position: 'relative',
                  letterSpacing: '-0.005em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="#contact" className="btn nav-cta">
              Request Sourcing <ArrowUpRight size={14} />
            </a>
            <button
              className="nav-burger"
              onClick={() => setOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid var(--ink)',
                width: 40,
                height: 40,
                borderRadius: 999,
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--ink)',
              color: 'var(--paper)',
              zIndex: 200,
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--paper)', fontWeight: 800, letterSpacing: '-0.04em', fontSize: 22 }}>RIVER GLOBAL</span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', width: 40, height: 40, borderRadius: 999, color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 60, flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  style={{ fontSize: 32, fontWeight: 500, color: 'var(--paper)', letterSpacing: '-0.02em' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Integrated supply, logistics, and trade execution across global markets.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
