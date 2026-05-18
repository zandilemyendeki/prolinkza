import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const navCols = [
  {
    title: 'Resources',
    links: [
      { label: 'NSFAS updates', to: '/nsfas' },
      { label: 'University Applications', to: '/universities' },
      { label: 'Bursaries, Internships & Graduate Programmes', to: '/opportunities?type=bursary' },
      { label: 'CV Tools', to: '/tools' },
    ],
  },
  {
    title: 'CV Tools',
    links: [
      { label: 'Resume builder', to: '/tools/builder' },
      { label: 'ATS checker', to: '/tools/ats' },
      { label: 'Keyword optimizer', to: '/tools/keywords' },
      { label: 'Cover letter generator', to: '/tools/cover-letter' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Advertise', to: '/advertise' },
      { label: 'Privacy policy', to: '/privacy-policy' },
      { label: 'Terms of use', to: '/terms' },
    ],
  },
];

const pageColorSchemes: Record<string, {
  band: string;
  mid: string;
  bottom: string;
  accent: string;
  ctaText: string;
  ctaHover: string;
}> = {
  '/tools/ats': {
    band: '#8B2A80', 
    mid: '#6E2266',
    bottom: '#4A1745',
    accent: '#E8B3E3',
    ctaText: '#8B2A80',
    ctaHover: '#F5E6F4',
  },
  '/tools/keywords': {
    band: '#9A5F13',
    mid: '#7A4C0F',
    bottom: '#52330A',
    accent: '#F4D7A6',
    ctaText: '#9A5F13',
    ctaHover: '#FDF5E6',
  },
  '/tools/cover-letter': {
    band: '#1F5FA3',    
    mid: '#194C82',
    bottom: '#11335A', 
    accent: '#A8CEFA',   
    ctaText: '#1F5FA3',
    ctaHover: '#E6F2FF',  
  },
};

export default function Footer() {
  const location = useLocation();
  
  // Get color scheme for current page
  const colorScheme = pageColorSchemes[location.pathname];
  
  return (
    <footer 
      className={styles.footer}
      style={colorScheme ? {
        '--footer-band': colorScheme.band,
        '--footer-mid': colorScheme.mid,
        '--footer-bottom': colorScheme.bottom,
        '--footer-accent': colorScheme.accent,
        '--footer-cta-text': colorScheme.ctaText,
        '--footer-cta-hover': colorScheme.ctaHover,
      } as React.CSSProperties : undefined}
    >
      {/* Top brand band */}
      <div className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.bandLeft}>
            <div className={styles.logo}>
              <span className={styles.logoDot} />
              ProLink <span className={styles.logoZa}>ZA</span>
            </div>
            <p className={styles.tagline}>
              South Africa's free student career hub - bursaries, internships, graduate programs and CV tools all in one place.
            </p>
          </div>
          <Link to="/tools/builder" className={styles.bandCta}>
            Build your CV free →
          </Link>
        </div>
      </div>

      <div className={styles.mid}>
        <div className={styles.midInner}>
          {navCols.map((col) => (
            <div key={col.title} className={styles.col}>
              <div className={styles.colTitle}>{col.title}</div>
              {col.links.map((l) => (
                <Link key={l.to} to={l.to} className={styles.link}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          
          <div className={styles.col}>
            <div className={styles.colTitle}>Disclaimer</div>
            <p className={styles.disclaimer}>
              ProLink ZA is an independent platform. We are not affiliated with NSFAS, any university, or employer listed on this site. Information is provided for guidance only - always verify with official sources.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copy}>© {new Date().getFullYear()} ProLink ZA. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <Link to="/privacy" className={styles.bottomLink}>Privacy</Link>
            <span className={styles.sep}>·</span>
            <Link to="/terms" className={styles.bottomLink}>Terms</Link>
            <span className={styles.sep}>·</span>
            <Link to="/advertise" className={styles.bottomLink}>Advertise</Link>
          </div>
          <span className={styles.flag}>Built for SA students 🇿🇦</span>
        </div>
      </div>
    </footer>
  );
}