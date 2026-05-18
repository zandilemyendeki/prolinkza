import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight, FileText, ShieldCheck, Zap, Mail, ExternalLink, GraduationCap, BookOpen, ArrowRight, HandCoins, FileUser, LayoutTemplate } from 'lucide-react';
import AdSlot from '../components/AdSlot';
import SectionHeader from '../components/SectionHeader';
import { nsfasUpdates, cvTools, resumeTemplates } from '../data';
import styles from './HomePage.module.css';
import nalaPreview from '../assets/templates/nala-preview.png';
import masterPreview from '../assets/templates/master-preview.png';
import modernPreview from '../assets/templates/modern-preview.png';
import professionalPreview from '../assets/templates/professional-preview.png';
import twoColumnPreview from '../assets/templates/two-column-preview.png';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  Zap: <Zap size={16} />,
  Mail: <Mail size={16} />,
};

const badgeColorMap: Record<string, string> = {
  teal: styles.badgeTeal,
  purple: styles.badgePurple,
  amber: styles.badgeAmber,
  blue: styles.badgeBlue,
};

const toolIconBg: Record<string, string> = {
  teal: styles.iconTeal,
  purple: styles.iconPurple,
  amber: styles.iconAmber,
  blue: styles.iconBlue,
};

const templatePreviewMap: Record<string, string> = {
  'nala': nalaPreview,
  'master': masterPreview,
  'modern': modernPreview,
  'professional': professionalPreview,
  'two-column': twoColumnPreview,
};

const jobPortals = [
  { name: 'Graduates24', desc: 'Internships & learnerships', url: 'https://graduates24.com', badge: 'Internships', badgeStyle: styles.badgePurple },
  { name: 'ZA Bursaries', desc: 'Bursaries by field of study', url: 'https://www.zabursaries.co.za/', badge: 'Bursaries', badgeStyle: styles.badgeAmber },
  { name: 'Indeed SA', desc: 'Jobs in every sector', url: 'https://za.indeed.com', badge: 'General', badgeStyle: styles.badgeTeal },
  { name: 'StudentRoon SA', desc: 'Graduate programmes', url: 'https://www.studentroom.co.za', badge: 'Graduate', badgeStyle: styles.badgePurple },
  { name: 'SAYouth.mobi', desc: 'Official youth platform (18-34)', url: 'https://www.sayouth.mobi', badge: 'Official', badgeStyle: styles.badgeAmber },
  { name: 'DPSA Vacancies', desc: 'Weekly government vacancies', url: 'https://www.dpsa.gov.za/newsroom/psvc/', badge: 'Government', badgeStyle: styles.badgeBlue },
];

const uniHighlights = [
  { abbr: 'UCT', name: 'University of Cape Town', deadline: '31 Jul 2026', province: 'Western Cape' },
  { abbr: 'Wits', name: 'University of the Witwatersrand', deadline: '30 Sep 2026', province: 'Gauteng' },
  { abbr: 'UP', name: 'University of Pretoria', deadline: '31 Aug 2026', province: 'Gauteng' },
  { abbr: 'SU', name: 'Stellenbosch University', deadline: '31 Jul 2026', province: 'Western Cape' },
];

const quickLinks = [
  { label: 'Apply for NSFAS', to: '/nsfas', external: false },
  { label: 'University applications', to: '/universities', external: false },
  { label: 'Browse bursaries', to: '/opportunities', external: false },
  { label: 'Build my CV', to: '/tools/builder', external: false },
  { label: 'SAYouth.mobi', to: 'https://www.sayouth.mobi', external: true },
  { label: 'DPSA vacancies', to: 'https://www.dpsa.gov.za/newsroom/psvc/', external: true },
];

export default function HomePage() {

  const featuredUpdate = nsfasUpdates[0];
  const recentUpdates = nsfasUpdates.slice(1, 4);

  return (
    <div className={styles.page}>
      <div className={styles.adLeaderboard}>
        <AdSlot size="leaderboard" />
      </div>

      <div className={styles.layout}>
        <main className={styles.main}>

          <section className={styles.hero}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              South Africa's student career hub
            </div>
            <h1 className={styles.heroTitle}>
              Everything you need to <em className={styles.heroEm}>land your first opportunity</em>
            </h1>
            <p className={styles.heroSub}>
              NSFAS updates, bursaries, university applications, internships, graduate programs - plus free CV tools built for SA students.
            </p>
            <p className={styles.quickAccessLabel}>What are you looking for?</p>
            <div className={styles.quickAccessGrid}>
              {[
                { icon: <HandCoins size={20} />, label: 'NSFAS', desc: 'Funding, updates & how to apply', to: '/nsfas', color: 'teal' },
                { icon: <GraduationCap size={20} />, label: 'Universities', desc: '26 universities, deadlines & APS', to: '/universities', color: 'teal' },
                { icon: <FileUser size={20} />, label: 'CV tools', desc: 'Free builder, templates & tips', to: '/tools', color: 'teal' },
                { icon: <BookOpen size={20} />, label: 'Bursaries', desc: 'Funding by field of study', to: '/opportunities?type=bursary', color: 'teal' },
                { icon: <Zap size={20} />, label: 'Internships', desc: 'Learnerships & graduate jobs', to: '/opportunities?type=internship', color: 'teal' },
              ].map((c) => (
                <Link key={c.label} to={c.to} className={`${styles.accessCard} ${styles[`access_${c.color}`]}`}>
                  <div className={styles.accessIcon}>{c.icon}</div>
                  <div className={styles.accessLabel}>{c.label}</div>
                  <div className={styles.accessDesc}>{c.desc}</div>
                  <span className={styles.accessArrow}>Explore →</span>
                </Link>
              ))}
            </div>
            <div className={styles.statsRow}>
              {[
                { num: '26', label: 'universities listed' },
                { num: '50+', label: 'TVET colleges listed' },
                { num: '20+', label: 'private  institutions listed' },
                { num: '10+', label: 'job portals' },
                { num: '9', label: 'provinces covered' },
                { num: 'Free', label: 'CV builder & tools' },
              ].map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* NSFAS Updates */}
          <section className={styles.section}>
            <SectionHeader title="NSFAS updates" viewAllTo="/nsfas" viewAllLabel="View all nsfas updates →" />
            {featuredUpdate && (
              <div className={styles.nsfasAlert}>
                <AlertCircle size={16} className={styles.alertIcon} />
                <div className={styles.alertBody}>
                  <div className={styles.alertTitle}>{featuredUpdate.title}</div>
                  <p className={styles.alertText}>{featuredUpdate.body}</p>
                  {featuredUpdate.badge && (
                    <span className={styles.alertBadge}>{featuredUpdate.badge}</span>
                  )}
                </div>
              </div>
            )}
            <div className={styles.updateList}>
              {recentUpdates.map((u) => (
                <Link to={`/nsfas#${u.id}`} key={u.id} className={styles.updateItem}>
                  <span className={styles.updateDot} />
                  <div className={styles.updateContent}>
                    <span className={styles.updateTitle}>{u.title}</span>
                    <span className={styles.updateDate}>{u.date}</span>
                  </div>
                  <ChevronRight size={14} className={styles.updateChevron} />
                </Link>
              ))}
            </div>
            <Link to="/nsfas" className={styles.viewMoreBtn}>
              <HandCoins size={15} />
              View all the updates →
            </Link>
          </section>

          {/* University Applications */}
          <section className={styles.section}>
            <SectionHeader title="University applications 2026" viewAllTo="/universities" viewAllLabel="View all universities →" />
            <p className={styles.sectionIntro}>
              Applications are open for the 2027 academic year. Check closing dates and apply directly on each university's official website.
            </p>
            <div className={styles.uniGrid}>
              {uniHighlights.map((u) => (
                <Link to="/universities" key={u.abbr} className={styles.uniCard}>
                  <div className={styles.uniAbbr}>{u.abbr}</div>
                  <div className={styles.uniInfo}>
                    <div className={styles.uniName}>{u.name}</div>
                    <div className={styles.uniMeta}>
                      <span className={styles.uniProvince}>{u.province}</span>
                      <span className={styles.uniDeadline}>Closes {u.deadline}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className={styles.uniChevron} />
                </Link>
              ))}
            </div>
            <Link to="/universities" className={styles.viewMoreBtn}>
              <GraduationCap size={15} />
              View all 26 universities + APS Calculator →
            </Link>
          </section>

          {/* CV Tools */}
          <section className={styles.section}>
            <SectionHeader title="Free CV & career tools" viewAllTo="/tools" viewAllLabel="View all CV tools →" />
            <div className={styles.toolsGrid}>
              {cvTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.route}
                  className={`${styles.toolCard} ${tool.featured ? styles.toolCardFeatured : ''}`}
                >
                  <div className={`${styles.toolIcon} ${toolIconBg[tool.badgeColor]}`}>
                    {iconMap[tool.icon]}
                  </div>
                  <div className={styles.toolName}>{tool.name}</div>
                  <div className={styles.toolDesc}>{tool.description}</div>
                  <span className={`${styles.toolBadge} ${badgeColorMap[tool.badgeColor]}`}>
                    {tool.badge}
                  </span>
                </Link>
              ))}
            </div>
            <Link to="/tools" className={styles.viewMoreBtn}>
              <FileUser size={15} />
              View all tools →
            </Link>
          </section>

          {/* Resume Templates */}
          <section className={styles.section}>
            <SectionHeader title="CV templates" viewAllTo="/tools" viewAllLabel="Browse all templates →" />
            <div className={styles.templatesRow}>
              {resumeTemplates.slice(0, 5).map((t, i) => (
                <Link to="/tools/builder" key={t.id} className={`${styles.templateThumb} ${i === 0 ? styles.templateActive : ''}`}>
                  <div className={styles.thumbPreview}>
                    <img
                      src={templatePreviewMap[t.style]}
                      alt={`${t.name} CV template preview`}
                      className={styles.thumbImage}
                    />
                  </div>
                  <div className={styles.thumbLabel}>{t.name}</div>
                </Link>
              ))}
            </div>
            <Link to="/tools" className={styles.viewMoreBtn}>
              <LayoutTemplate size={15} />
              View all CV templates →
            </Link>
          </section>

          <div className={styles.adMid}>
            <AdSlot size="rectangle" />
          </div>

          <section className={styles.section}>
            <SectionHeader title="Find jobs, bursaries & internships" viewAllTo="/opportunities" viewAllLabel="View all portals →" />
            <p className={styles.sectionIntro}>
              We redirect you to official, trusted platforms where SA employers advertise. Never pay to apply.
            </p>
            <div className={styles.portalGrid}>
              {jobPortals.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.portalCard}
                >
                  <div className={styles.portalTop}>
                    <span className={`${styles.portalBadge} ${p.badgeStyle}`}>{p.badge}</span>
                    <ExternalLink size={13} className={styles.portalArrow} />
                  </div>
                  <div className={styles.portalName}>{p.name}</div>
                  <div className={styles.portalDesc}>{p.desc}</div>
                </a>
              ))}
            </div>
            <Link to="/opportunities" className={`${styles.viewMoreBtn} ${styles.viewMorePortals}`}>
              <BookOpen size={15} />
              Browse all job & bursary portals →
            </Link>
          </section>

        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <AdSlot size="skyscraper" />

          <div className={styles.quickLinksWidget}>
            <div className={styles.widgetTitle}>Quick links</div>
            {quickLinks.map((l) =>
              l.external ? (
                <a key={l.label} href={l.to} target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                  {l.label} <ExternalLink size={10} />
                </a>
              ) : (
                <Link key={l.label} to={l.to} className={styles.quickLink}>
                  {l.label} <ArrowRight size={10} />
                </Link>
              )
            )}
          </div>

          <div className={styles.nsfasWidget}>
            <div className={styles.nsfasWidgetTag}>Applications open</div>
            <div className={styles.nsfasWidgetTitle}>NSFAS 2027</div>
            <p className={styles.nsfasWidgetSub}>Opens September 2026. Prepare your documents early.</p>
            <Link to="/nsfas" className={styles.nsfasWidgetBtn}>
              Learn more →
            </Link>
          </div>

          <AdSlot size="square" />
        </aside>
      </div>
    </div>
  );
}