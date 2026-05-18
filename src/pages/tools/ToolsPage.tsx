import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Zap, Mail, ArrowRight, Sparkles, Clock, Download } from 'lucide-react';
// import AdSlot from '../../components/AdSlot';
import styles from './ToolsPage.module.css';
import nalaPreview from '../../assets/templates/nala-preview.png';
import masterPreview from '../../assets/templates/master-preview.png';
import modernPreview from '../../assets/templates/modern-preview.png';
import professionalPreview from '../../assets/templates/professional-preview.png';
import twoColumnPreview from '../../assets/templates/two-column-preview.png';
import minimalPreview from '../../assets/templates/minimal-preview.png';
import creativePreview from '../../assets/templates/creative-preview.png';
import classicPreview from '../../assets/templates/classic-preview.png';
import wozberPreview from '../../assets/templates/wozber-preview.png';
import sofaaPreview from '../../assets/templates/sofaa-preview.png';

const tools = [
  {
    id: 'builder',
    icon: FileText,
    name: 'Resume builder',
    tagline: 'Build a professional CV in minutes',
    desc: 'Step-by-step guided builder with SA-specific templates. Fill in your details and export a polished, print-ready PDF - no design skills needed.',
    route: '/tools/builder',
    badge: 'Most popular',
    badgeStyle: styles.badgeTeal,
    iconStyle: styles.iconTeal,
    featured: true,
    perks: ['10 professional templates', 'Live preview as you type', 'Export as PDF - free'],
  },
  {
    id: 'ats',
    icon: ShieldCheck,
    name: 'ATS checker',
    tagline: 'Does your CV pass the bot?',
    desc: 'Most large SA employers use Applicant Tracking Systems to filter CVs before a human ever sees them. Paste your CV and get an instant score.',
    route: '/tools/ats',
    badge: 'Instant check',
    badgeStyle: styles.badgePurple,
    iconStyle: styles.iconPurple,
    featured: false,
    perks: ['Instant pass/fail score', 'Section-by-section feedback', 'Actionable fix suggestions'],
  },
  {
    id: 'keywords',
    icon: Zap,
    name: 'Keyword optimizer',
    tagline: 'Tailor your CV to every job ad',
    desc: 'Paste a job description and your CV text. We extract the keywords the employer is looking for and show you exactly which ones are missing.',
    route: '/tools/keywords',
    badge: 'Smart scan',
    badgeStyle: styles.badgeAmber,
    iconStyle: styles.iconAmber,
    featured: false,
    perks: ['Keyword match score', 'Found vs missing keywords', 'Tips to improve naturally'],
  },
  {
    id: 'cover-letter',
    icon: Mail,
    name: 'Cover letter generator',
    tagline: 'AI-written, personally yours',
    desc: 'Enter the job title, company name and a few notes about yourself. Get a tailored, professional cover letter in seconds that you can edit before sending.',
    route: '/tools/cover-letter',
    badge: 'AI-powered',
    badgeStyle: styles.badgeBlue,
    iconStyle: styles.iconBlue,
    featured: false,
    perks: ['Tailored to job & company', 'Editable before copying', 'SA-appropriate tone'],
  },
];

const templates = [
  { name: 'Nala', accent: '#7a1f2b', preview: nalaPreview },
  { name: 'Master', accent: '#1a4fbf', preview: masterPreview },
  { name: 'Modern', accent: '#1D9E75', preview: modernPreview },
  { name: 'Professional', accent: '#34586bff', preview: professionalPreview },
  { name: 'Two-column', accent: '#534AB7', preview: twoColumnPreview },
  { name: 'Minimal', accent: '#909033ff', preview: minimalPreview },
  { name: 'Creative', accent: '#993C1D', preview: creativePreview },
  { name: 'Classic', accent: '#000000', preview: classicPreview },
  { name: 'Wozber', accent: '#7dd8cfff', preview: wozberPreview },
  { name: 'Sofaa', accent: '#E6E6E6', preview: sofaaPreview }
];

const whyItems = [
  { icon: Sparkles, title: 'Built for SA students', body: 'Content, templates and tools are designed specifically for the South African job market and student context.' },
  { icon: Clock, title: 'Ready in minutes', body: 'No lengthy signups or tutorials. Jump straight in - most tools take under 5 minutes to use.' },
  { icon: Download, title: 'Free to download', body: 'Export your CV as a PDF at no cost. No watermarks, no paywalls, no credit card required.' },
];

export default function ToolsPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroTag}>100% free · No signup required</span>
          <h1 className={styles.heroTitle}>CV & career tools for SA students</h1>
          <p className={styles.heroSub}>
            Professional-grade tools built specifically for South African students and graduates.
            From building your first CV to optimising it for every application - all in one place.
          </p>
          <Link to="/tools/builder" className={styles.heroCta}>
            Build my CV now <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className={styles.inner}>

        {/* <AdSlot size="leaderboard" /> */}

        {/* Tools grid */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>All tools</h2>
            <p className={styles.sectionSub}>Four free tools to help you stand out</p>
          </div>

          <div className={styles.toolsGrid}>
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.route}
                  className={`${styles.toolCard} ${tool.featured ? styles.toolFeatured : ''}`}
                >
                  {tool.featured && <div className={styles.featuredRibbon}>Most popular</div>}
                  <div className={styles.toolCardTop}>
                    <div className={`${styles.toolIcon} ${tool.iconStyle}`}>
                      <Icon size={20} />
                    </div>
                    <span className={`${styles.toolBadge} ${tool.badgeStyle}`}>{tool.badge}</span>
                  </div>
                  <h3 className={styles.toolName}>{tool.name}</h3>
                  <p className={styles.toolTagline}>{tool.tagline}</p>
                  <p className={styles.toolDesc}>{tool.desc}</p>
                  <ul className={styles.toolPerks}>
                    {tool.perks.map((p) => (
                      <li key={p} className={styles.toolPerk}>
                        <span className={styles.perkTick}>✓</span> {p}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.toolCta}>
                    Open tool <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* <AdSlot size="leaderboard" /> */}

        {/* Templates */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>CV templates</h2>
            <p className={styles.sectionSub}>{templates.length} professionally designed templates - pick one inside the builder</p>
          </div>
          <div className={styles.templatesGrid}>
            {templates.map((t, i) => (
              <Link to="/tools/builder" key={t.name} className={`${styles.templateCard} ${i === 0 ? styles.templateActive : ''}`}>
                <div className={styles.templatePreview}>
                  <img
                    src={t.preview}
                    alt={`${t.name} CV template preview`}
                    className={styles.templateImage}
                  />
                </div>
                <div className={styles.templateFooter}>
                  <span className={styles.templateName}>{t.name}</span>
                  <div className={styles.templateDot} style={{ background: t.accent }} />
                </div>
              </Link>
            ))}
          </div>
          <Link to="/tools/builder" className={styles.browseBtn}>
            Browse all templates in the builder <ArrowRight size={14} />
          </Link>
        </section>

        {/* Why use */}
        <section className={styles.whySection}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Why use ProLink ZA tools?</h2>
          </div>
          <div className={styles.whyGrid}>
            {whyItems.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className={styles.whyCard}>
                  <div className={styles.whyIcon}><Icon size={20} /></div>
                  <h3 className={styles.whyTitle}>{w.title}</h3>
                  <p className={styles.whyBody}>{w.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* <AdSlot size="leaderboard" /> */}

        {/* CTA banner */}
        <div className={styles.ctaBanner}>
          <div>
            <h3 className={styles.ctaTitle}>Ready to build your CV?</h3>
            <p className={styles.ctaSub}>Start with the resume builder - it takes less than 10 minutes and your CV will be ready to download.</p>
          </div>
          <Link to="/tools/builder" className={styles.ctaBtn}>
            Start building <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
}