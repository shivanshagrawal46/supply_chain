import { motion } from 'framer-motion';

/**
 * Restrained luxury-brand splash. Choreography:
 *  0.00s  black canvas with a subtle radial vignette
 *  0.20s  tiny eyebrow text appears (top)
 *  0.40s  RIVER wordmark mask-reveals upward from below a hairline
 *  0.70s  GLOBAL vertical letters fade in column-by-column
 *  1.10s  thin horizontal line draws beneath the wordmark
 *  1.40s  tagline fades in below the line
 *  2.20s  whole frame fades out to paper
 */
export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(29,137,151,0.06) 0%, rgba(10,10,10,0) 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grain texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          mixBlendMode: 'overlay',
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")',
          pointerEvents: 'none',
        }}
      />

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: 'clamp(40px, 6vh, 64px)',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(250, 250, 247, 0.45)',
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ width: 18, height: 1, background: 'rgba(250,250,247,0.3)' }} />
        Adelaide · Delhi
        <span style={{ width: 18, height: 1, background: 'rgba(250,250,247,0.3)' }} />
      </motion.div>

      {/* Wordmark with mask reveal */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, overflow: 'hidden', position: 'relative' }}>
        <div style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block',
              fontSize: 'clamp(64px, 11vw, 140px)',
              color: '#fafaf7',
              letterSpacing: '-0.06em',
              fontWeight: 800,
              lineHeight: 0.85,
            }}
          >
            RIVER
          </motion.span>
        </div>

        {/* Vertical GLOBAL letters */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 'clamp(54px, 9vw, 118px)',
            paddingTop: 8,
          }}
        >
          {'GLOBAL'.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(7px, 0.85vw, 11px)',
                color: '#fafaf7',
                fontWeight: 700,
                letterSpacing: '0.22em',
                lineHeight: 1,
              }}
            >
              {c}
            </motion.span>
          ))}
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          style={{
            fontSize: 10,
            color: '#fafaf7',
            fontWeight: 500,
            marginTop: 6,
          }}
        >
          ™
        </motion.span>
      </div>

      {/* Drawn line beneath wordmark */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.65, 0, 0.35, 1] }}
        style={{
          width: 'clamp(220px, 24vw, 360px)',
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(29,137,151,0.7) 30%, rgba(29,137,151,0.7) 70%, transparent)',
          marginTop: 28,
          transformOrigin: 'center',
        }}
      />

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          marginTop: 20,
          color: 'rgba(250, 250, 247, 0.55)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        Supply & Trade Partner
      </motion.div>

      {/* Bottom corner annotations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 28,
          left: 32,
          color: 'rgba(250, 250, 247, 0.35)',
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 10,
          letterSpacing: '0.1em',
        }}
      >
        © RIVER GLOBAL · ALL RIGHTS RESERVED
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 28,
          right: 32,
          color: 'rgba(250, 250, 247, 0.35)',
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 10,
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#1d8997' }}
        />
        LOADING OPERATIONS
      </motion.div>
    </motion.div>
  );
}
