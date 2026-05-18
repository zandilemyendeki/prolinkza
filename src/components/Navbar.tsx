import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'NSFAS', to: '/nsfas' },
  { label: 'University Applications', to: '/universities'},
  { label: 'Bursaries', to: '/opportunities?type=bursary' },
  { label: 'Internships', to: '/opportunities?type=internship' },
  { label: 'Graduate Programmes', to: '/opportunities?type=graduate' },
  { label: 'CV Tools', to: '/tools' },
];

// Page-specific colors (only for specific tool pages)
const pageColors: Record<string, string> = {
  '/tools/ats': '#b134a8',
  '/tools/keywords': '#BA7517',
  '/tools/cover-letter': '#2874CC',
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  // Get the color for the current page (undefined if not in the map)
  const currentColor = pageColors[location.pathname];
  
  return (
    <header 
      className={styles.header}
      style={currentColor ? { 
        '--navbar-brand-color': currentColor 
      } as React.CSSProperties : undefined}
    >
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoDot} />
          ProLink <span className={styles.logoZa}>ZA</span>
        </Link>

        <div className={styles.links}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`${styles.link} ${location.pathname === l.to.split('?')[0] ? styles.linkActive : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link to="/tools/builder" className={styles.cta}>
          Build my CV
        </Link>

        <button className={styles.menuBtn} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className={styles.mobileMenu}>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className={styles.mobileLink} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/tools/builder" className={styles.mobileCta} onClick={() => setOpen(false)}>
            Build my CV - free
          </Link>
        </div>
      )}
    </header>
  );
}