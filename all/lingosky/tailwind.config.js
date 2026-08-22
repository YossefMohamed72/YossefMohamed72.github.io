/** LingoSky — production Tailwind build config.
 *  Scans the live site's HTML for used classes and extends the
 *  brand color tokens already defined as CSS variables in css/style.css,
 *  so utilities like bg-navy-deep, text-gold, border-gold/20 resolve
 *  instead of being silently dropped by the JIT scanner. */
module.exports = {
  content: ['../lingosky/*.html'],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#071525',
          mid: '#0B1D33',
          soft: '#122A47',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E9CE7A',
          dim: '#8A701C',
        },
        ivory: '#F4F5F7',
        'uae-red': '#CE1126',
      },
    },
  },
  plugins: [],
  // NOTE: preflight stays ON (default) — the CDN script the site currently
  // loads applies Tailwind's base reset, and style.css does not duplicate
  // it. Turning it off here would visibly change every page.
};
