import { ExternalLink, Shield, AlertTriangle, CheckCircle, FileText, Mail, Search } from 'lucide-react';
import AdSlot from '../../components/AdSlot';
import styles from './OpportunitiesPage.module.css';

const portalCategories = [
  {
    id: 'graduate',
    title: 'Graduate & internship portals',
    subtitle: 'Platforms focused on students, graduates and entry-level opportunities',
    color: 'purple',
    portals: [
      { name: 'Graduates24', desc: 'Internships, learnerships and graduate opportunities', url: 'https://graduates24.com', domain: 'graduates24.com', badge: 'Recommended' },
      { name: 'NYDA Jobs', desc: 'National Youth Development Agency opportunities for youth', url: 'https://www.nyda.gov.za', domain: 'nyda.gov.za', badge: 'Government' },
      { name: 'SAYouth.mobi', desc: 'Free official government platform for youth aged 18–34', url: 'https://www.sayouth.mobi', domain: 'sayouth.mobi', badge: 'Official' },
      { name: 'StudentRoom SA', desc: 'Student-focused opportunities, bursaries and jobs', url: 'https://www.studentroom.co.za', domain: 'studentroom.co.za', badge: null },
      { name: 'Adzuna SA', desc: 'Smart job search engine aggregating listings from across the web', url: 'https://www.adzuna.co.za', domain: 'adzuna.co.za', badge: null },
      { name: 'GradConnection ZA', desc: 'Graduate programmes and vacation work from top SA employers', url: 'https://za.gradconnection.com', domain: 'gradconnection.com', badge: null },
    ],
  },
  {
    id: 'government',
    title: 'Government & public sector jobs',
    subtitle: 'Official sources for public service and government vacancies',
    color: 'blue',
    portals: [
      { name: 'DPSA Vacancies', desc: 'Weekly public service vacancy circulars - updated every Friday', url: 'https://www.dpsa.gov.za/newsroom/psvc/', domain: 'dpsa.gov.za', badge: 'Official' },
      { name: 'Careers Portal', desc: 'Government, municipal and public sector job listings', url: 'https://www.careersportal.co.za', domain: 'careersportal.co.za', badge: null },
      { name: 'National Treasury Jobs', desc: 'Vacancies within the National Treasury department', url: 'http://www.treasury.gov.za/about/Vacancies', domain: 'treasury.gov.za', badge: 'Official' },
      { name: 'SASSA Vacancies', desc: 'Social grants agency vacancies across all provinces', url: 'https://www.sassa.gov.za/SitePages/Vacancies-Adverts.aspx', domain: 'sassa.gov.za', badge: 'Official' },
      { name: 'DoH Vacancies', desc: 'Department of Health jobs at national and provincial level', url: 'https://www.health.gov.za/vacancies/', domain: 'health.gov.za', badge: 'Official' },
      { name: 'Parliament of SA', desc: 'Parliamentary internship and employment opportunities', url: 'https://www.parliament.gov.za/careers-parliament', domain: 'parliament.gov.za', badge: 'Official' },
    ],
  },
  {
    id: 'general',
    title: 'General job portals',
    subtitle: 'Browse thousands of jobs across every sector in South Africa',
    color: 'teal',
    portals: [
      { name: 'Indeed South Africa', desc: 'Jobs in every sector - search by keyword, location and job type', url: 'https://za.indeed.com', domain: 'za.indeed.com', badge: 'Most popular' },
      { name: 'CareerJunction', desc: 'Verified local job listings from top SA employers', url: 'https://www.careerjunction.co.za', domain: 'careerjunction.co.za', badge: null },
      { name: 'PNet', desc: 'Filter jobs by location, salary, industry and job type', url: 'https://www.pnet.co.za', domain: 'pnet.co.za', badge: null },
      { name: 'Job Mail', desc: 'Admin, retail, general and entry-level jobs', url: 'https://www.jobmail.co.za', domain: 'jobmail.co.za', badge: null },
      { name: 'Gumtree Jobs', desc: 'Informal, part-time and casual job opportunities', url: 'https://www.gumtree.co.za/', domain: 'gumtree.co.za', badge: null },
      { name: 'LinkedIn Jobs', desc: 'Professional network with corporate & graduate roles', url: 'https://www.linkedin.com/jobs', domain: 'linkedin.com', badge: null },
    ],
  },
  {
    id: 'bursaries',
    title: 'Bursaries & funding portals',
    subtitle: 'Find bursaries, scholarships and financial aid for your studies',
    color: 'amber',
    portals: [
      { name: 'ZA Bursaries', desc: 'Comprehensive database of bursaries by field of study', url: 'https://www.zabursaries.co.za/', domain: 'zabursaries.co.za', badge: 'Recommended' },
      { name: 'Funza Lushaka', desc: 'Government bursary for education students becoming teachers', url: 'https://www.funzalushaka.doe.gov.za', domain: 'funzalushaka.doe.gov.za', badge: 'Official' },
      { name: 'NSFAS', desc: 'National Student Financial Aid Scheme for qualifying students', url: 'https://www.nsfas.org.za', domain: 'nsfas.org.za', badge: 'Official' },
      { name: 'Bursaries South Africa', desc: 'Updated list of open bursary applications', url: 'https://www.bursaries-southafrica.co.za', domain: 'bursaries-southafrica.co.za', badge: null },
      { name: 'Bursaries', desc: 'The most comprehensive list of all funding opportunities in South Africa.', url: 'https://bursaries.co.za/', domain: 'bursaries.co.za', badge: null },
      { name: 'Study Trust', desc: 'Several bursary and scholarship programmes for South African and international companies, foundations, trusts and private donors.', url: 'https://studytrust.org.za/bursaries/', domain: 'studytrust.org.za', badge: null },
    ],
  },
];

const safetyTips = [
  { icon: CheckCircle, color: 'teal', tip: 'Only apply through secure websites - look for https:// in the URL before submitting any personal information.' },
  { icon: AlertTriangle, color: 'red', tip: 'Never pay to apply for a job. Legitimate employers do not charge application or registration fees.' },
  { icon: FileText, color: 'blue', tip: 'Use a professional CV and a professional email address. Avoid usernames like "coolboy123@gmail.com".' },
  { icon: Search, color: 'amber', tip: 'Check company reviews on Google or Glassdoor before applying, especially for lesser-known companies.' },
  { icon: Mail, color: 'purple', tip: 'Be cautious of job offers received via WhatsApp or SMS from unknown numbers - verify through official channels.' },
  { icon: Shield, color: 'teal', tip: 'Never share your ID number, banking details or personal photos during the initial application stage.' },
];

const colorMap: Record<string, { card: string; badge: string; btn: string; icon: string }> = {
  teal: { card: styles.cardTeal, badge: styles.badgeTeal, btn: styles.btnTeal, icon: styles.iconTeal },
  purple: { card: styles.cardPurple, badge: styles.badgePurple, btn: styles.btnPurple, icon: styles.iconPurple },
  blue: { card: styles.cardBlue, badge: styles.badgeBlue, btn: styles.btnBlue, icon: styles.iconBlue },
  amber: { card: styles.cardAmber, badge: styles.badgeAmber, btn: styles.btnAmber, icon: styles.iconAmber },
};

const tipColorMap: Record<string, string> = {
  teal: styles.tipTeal, red: styles.tipRed, blue: styles.tipBlue,
  amber: styles.tipAmber, purple: styles.tipPurple,
};

export default function OpportunitiesPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTag}>
            <span className={styles.heroTagDot} />
            Verified sources only
          </div>
          <h1 className={styles.heroTitle}>Find jobs, internships & bursaries</h1>
          <p className={styles.heroSub}>
            We don't post jobs directly - instead we point you to the official, trusted platforms where SA employers actually advertise. Apply safely and directly.
          </p>
        </div>
      </div>

      <div className={styles.inner}>

        <AdSlot size="leaderboard" />

        {/* Portal categories */}
        {portalCategories.map((cat) => {
          const colors = colorMap[cat.color];
          return (
            <section key={cat.id} className={styles.section}>
              <div className={styles.sectionHead}>
                <div>
                  <h2 className={styles.sectionTitle}>{cat.title}</h2>
                  <p className={styles.sectionSub}>{cat.subtitle}</p>
                </div>
              </div>

              <div className={styles.portalGrid}>
                {cat.portals.map((portal) => (
                  <a
                    key={portal.name}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.portalCard} ${colors.card}`}
                  >
                    <div className={styles.portalCardTop}>
                      <div className={styles.portalInfo}>
                        <div className={styles.portalName}>{portal.name}</div>
                        <div className={styles.portalDomain}>{portal.domain}</div>
                      </div>
                      <div className={styles.portalActions}>
                        {portal.badge && (
                          <span className={`${styles.portalBadge} ${colors.badge}`}>{portal.badge}</span>
                        )}
                        <ExternalLink size={15} className={styles.portalArrow} />
                      </div>
                    </div>
                    <p className={styles.portalDesc}>{portal.desc}</p>
                    <div className={`${styles.portalBtn} ${colors.btn}`}>
                      Visit {portal.name} <ExternalLink size={12} />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        <AdSlot size="leaderboard" />

        {/* Safety tips */}
        <section className={styles.safetySection}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>
                <Shield size={18} className={styles.safetyTitleIcon} /> Tips for safe job searching
              </h2>
              <p className={styles.sectionSub}>Protect yourself from scams and fraudulent job postings</p>
            </div>
          </div>
          <div className={styles.tipsGrid}>
            {safetyTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className={`${styles.tipCard} ${tipColorMap[tip.color]}`}>
                  <Icon size={16} className={styles.tipIcon} />
                  <p className={styles.tipText}>{tip.tip}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <div className={styles.disclaimer}>
          <Shield size={14} />
          <p>
            ProLink ZA does not post, verify or endorse specific job listings. All links redirect to external platforms. Always verify job authenticity before sharing personal information. If you suspect a scam, report it to the <a href="https://www.saps.gov.za" target="_blank" rel="noopener noreferrer">SAPS</a> or <a href="https://www.cipro.gov.za" target="_blank" rel="noopener noreferrer">CIPRO</a>.
          </p>
        </div>

        <AdSlot size="leaderboard" />
      </div>
    </div>
  );
}