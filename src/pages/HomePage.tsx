import { Link } from 'react-router-dom';
import {
  AlertCircle, ChevronRight, FileText, ShieldCheck, Zap, Mail,
  ExternalLink, GraduationCap, BookOpen, ArrowRight, HandCoins,
  FileUser, LayoutTemplate, Info
} from 'lucide-react';
import AdSlot from '../components/AdSlot';
import SectionHeader from '../components/SectionHeader';
import { nsfasUpdates, cvTools, resumeTemplates } from '../data';
import styles from './HomePage.module.css';

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

const jobPortals = [
  { name: 'Graduates24', desc: 'Internships & learnerships', url: 'https://graduates24.com', badge: 'Internships', badgeStyle: styles.badgePurple },
  { name: 'ZA Bursaries', desc: 'Bursaries by field of study', url: 'https://www.zabursaries.co.za/', badge: 'Bursaries', badgeStyle: styles.badgeAmber },
  { name: 'Indeed SA', desc: 'Jobs in every sector', url: 'https://za.indeed.com', badge: 'General', badgeStyle: styles.badgeTeal },
  { name: 'StudentRoom SA', desc: 'Graduate programmes', url: 'https://www.studentroom.co.za', badge: 'Graduate', badgeStyle: styles.badgePurple },
  { name: 'SAYouth.mobi', desc: 'Official youth platform (18–34)', url: 'https://www.sayouth.mobi', badge: 'Official', badgeStyle: styles.badgeAmber },
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

const gettingStartedSteps = [
  {
    num: '01',
    title: 'Check your NSFAS eligibility',
    body: 'If your household income is below R350,000 per year, you may qualify for NSFAS funding. This covers tuition, accommodation, meals, transport and a personal care allowance. Visit our NSFAS page for the full 2027 guide.',
    link: '/nsfas',
    linkLabel: 'NSFAS guide →',
  },
  {
    num: '02',
    title: 'Calculate your APS score',
    body: 'Your Admission Point Score (APS) determines which universities and programmes you qualify for. Use our free APS calculator to see which of the 26 public universities in South Africa you are eligible to apply to.',
    link: '/universities',
    linkLabel: 'APS calculator →',
  },
  {
    num: '03',
    title: 'Apply for bursaries early',
    body: 'Many bursaries open in March and close by September each year. Do not wait for your university acceptance before applying - most bursaries accept applications before you are registered. Search by field of study on our opportunities page.',
    link: '/opportunities',
    linkLabel: 'Browse bursaries →',
  },
  {
    num: '04',
    title: 'Build a professional CV',
    body: 'A well-formatted CV is essential for internship and bursary applications. Use our free CV builder to create a professional, ATS-friendly resume in minutes. You can also check your existing CV against our ATS checker to see how it performs.',
    link: '/tools/builder',
    linkLabel: 'Build my CV →',
  },
];

export default function HomePage() {
  const featuredUpdate = nsfasUpdates[0];
  const recentUpdates = nsfasUpdates.slice(1, 4);

  return (
    <div className={styles.page}>

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
              ProLink ZA is a free platform built for South African students and graduates. We bring together
              NSFAS information, university application guides, bursaries, internships, graduate programmes
              and free CV tools - all in one place, at no cost.
            </p>
            <div className={styles.heroQuickLinks}>
              <Link to="/nsfas" className={styles.heroQL}>NSFAS 2027 <span>→</span></Link>
              <Link to="/universities" className={styles.heroQL}>Universities <span>→</span></Link>
              <Link to="/opportunities" className={styles.heroQL}>Bursaries <span>→</span></Link>
              <Link to="/tools/builder" className={styles.heroQL}>Build my CV <span>→</span></Link>
            </div>
            <div className={styles.statsRow}>
              {[
                { num: '26', label: 'universities listed' },
                { num: '50+', label: 'TVET colleges' },
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
          <section className={styles.section}>
            <div className={styles.aboutBlurb}>
              <div className={styles.aboutBlurbIcon}><Info size={18} /></div>
              <div>
                <h2 className={styles.aboutBlurbTitle}>What is ProLink ZA?</h2>
                <p className={styles.aboutBlurbText}>
                  ProLink ZA is a free South African student career platform. We help matric learners,
                  university students and recent graduates navigate NSFAS applications, find bursaries and
                  internships, understand university admission requirements, and build professional CVs -
                  without paying a cent. The platform was built by a South African Computer Science graduate
                  from the Eastern Cape who experienced first-hand how difficult it is to find this
                  information when you are a first-generation university student.
                </p>
                <Link to="/about" className={styles.aboutBlurbLink}>Read our story →</Link>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <SectionHeader title="NSFAS updates" viewAllTo="/nsfas" viewAllLabel="View all NSFAS updates →" />
            <p className={styles.sectionIntro}>
              The National Student Financial Aid Scheme (NSFAS) provides funding to eligible South African
              students at public universities and TVET colleges. Applications for the 2027 academic year
              open in September 2026. Here are the latest announcements.
            </p>
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
              <HandCoins size={15} /> View full NSFAS guide →
            </Link>
          </section>
          <section className={styles.section}>
            <SectionHeader title="How to get started as an SA student" />
            <p className={styles.sectionIntro}>
              Whether you are in matric, starting university, or looking for your first job after graduating -
              here is a practical step-by-step guide tailored to the South African education and employment system.
            </p>
            <div className={styles.stepsGrid}>
              {gettingStartedSteps.map((s) => (
                <div key={s.num} className={styles.stepCard}>
                  <div className={styles.stepNum}>{s.num}</div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                  <Link to={s.link} className={styles.stepLink}>{s.linkLabel}</Link>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.adMid}>
            <AdSlot size="leaderboard" />
          </div>
          <section className={styles.section}>
            <SectionHeader title="University applications 2026" viewAllTo="/universities" viewAllLabel="View all universities →" />
            <p className={styles.sectionIntro}>
              South Africa has 26 public universities across all 9 provinces. Applications for the 2027
              academic year are currently open at most institutions. Below are a few key deadlines - visit
              our universities page for the full list, including TVET colleges and our free APS calculator.
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
              <GraduationCap size={15} /> View all 26 universities + APS Calculator →
            </Link>
          </section>

          <section className={styles.section}>
            <SectionHeader title="Getting started as a South African student: a practical guide" />
            <div className={styles.proseBlock}>
              <p>
                Figuring out how to fund your studies, get accepted into a programme, and eventually
                find work can feel overwhelming when you are the first person in your family to go
                through the South African higher education system. There is no single office that
                walks you through all of it, and the information that does exist is often scattered
                across government websites, university portals and word of mouth. This guide brings
                the basics together in one place, in the order most students actually need them.
              </p>

              <h3>Start with funding, not university choice</h3>
              <p>
                It is tempting to pick a university first and worry about money later, but the
                opposite order saves a lot of stress. If your household income falls below the NSFAS
                threshold, you may qualify for funding that covers tuition, accommodation, transport,
                meals, books and a personal care allowance, and for most qualifying students this
                does not need to be repaid. Applications for the 2027 academic year open in September
                2026, and the smartest move is to gather your supporting documents, such as your ID,
                proof of income and academic results, well before the portal opens rather than during
                the rush. Even if you are unsure whether you qualify, it costs nothing to apply and
                find out.
              </p>
              <p>
                Bursaries work differently from NSFAS and are worth applying for at the same time,
                not instead of it. Companies, government departments and industry bodies offer
                bursaries tied to specific fields of study, often in areas where South Africa has a
                shortage of skilled workers, such as engineering, accounting, teaching and the health
                sciences. Many bursaries open for applications as early as March and close well before
                the academic year even starts, so waiting until you have a university acceptance
                letter in hand often means missing the window entirely. There is also no rule against
                applying to several bursaries and NSFAS in the same year, so apply broadly rather than
                betting everything on one source of funding.
              </p>

              <h3>Work out which universities you can realistically get into</h3>
              <p>
                South Africa has 26 public universities spread across all nine provinces, plus more
                than 50 TVET colleges offering vocational and technical qualifications. Each
                university programme sets its own minimum Admission Point Score, calculated from your
                final matric results, so the same set of marks can qualify you for one programme and
                fall short for another. Most universities allow you to submit your application before
                your final results are released, using your most recent school report, and then update
                the application once your official results are out. Submitting early, even with
                provisional marks, is almost always better than waiting, since popular programmes can
                close once they reach capacity regardless of the official deadline.
              </p>

              <h3>Build a CV before you think you need one</h3>
              <p>
                Many students only start thinking about a CV once they are applying for an internship
                or graduate role, but bursary applications, learnership programmes and even some
                university scholarships often ask for one too. A strong entry-level CV in South Africa
                is typically no longer than two pages, written in plain language, and structured so
                that an Applicant Tracking System, the software many large employers use to filter
                applications automatically, can read it correctly. That generally means avoiding
                complex tables, graphics or unusual fonts, and instead using clear section headings,
                consistent formatting and keywords that match the language used in the job or bursary
                advert itself.
              </p>

              <h3>Know where to look once you start job hunting</h3>
              <p>
                When you do start applying for internships, learnerships or your first job, stick to
                platforms that South African employers actually use, such as SAYouth.mobi for the
                18 to 34 age group, the Department of Public Service and Administration's vacancy
                circulars for government roles, and general job boards for the private sector. A
                useful habit is registering on more than one platform, since some learnerships and
                graduate programmes are advertised exclusively on a single site. Whichever platform
                you use, treat any request for an upfront payment to "process" your application or
                "release" a bursary or job offer as an immediate red flag. Legitimate opportunities in
                South Africa are free to apply for, without exception.
              </p>
              <p>
                None of these steps need to happen perfectly or in complete isolation from each other.
                In practice, most students are doing two or three of them at once, applying for NSFAS
                while finalising university applications, or building a CV while waiting to hear back
                from a bursary. The goal of this guide is simply to make sure you know what exists and
                roughly when to act on it, so that funding deadlines and application windows do not
                catch you off guard.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <SectionHeader title="Free CV & career tools" viewAllTo="/tools" viewAllLabel="View all CV tools →" />
            <p className={styles.sectionIntro}>
              Professional CV services can cost hundreds of rands - money most students do not have.
              Our free tools help you build an ATS-friendly CV, check it against employer systems,
              optimise your keywords and generate a cover letter, all for free.
            </p>
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
              <FileUser size={15} /> View all tools →
            </Link>
          </section>
          <section className={styles.section}>
            <SectionHeader title="CV templates" viewAllTo="/tools" viewAllLabel="Browse all templates →" />
            <p className={styles.sectionIntro}>
              Choose from professionally designed CV templates built for the South African job market.
              Each template is ATS-compatible, meaning it is readable by the automated systems
              most large SA employers use to screen applications.
            </p>
            <div className={styles.templatesRow}>
              {resumeTemplates.slice(0, 5).map((t, i) => (
                <Link to="/tools/builder" key={t.id} className={`${styles.templateThumb} ${i === 0 ? styles.templateActive : ''}`}>
                  <div className={styles.thumbPreview}>
                    <div className={styles.thumbHeader} style={{ background: t.accentColor }} />
                    <div className={styles.thumbLines}>
                      <div className={styles.thumbLine} style={{ width: '70%' }} />
                      <div className={styles.thumbLine} style={{ width: '50%' }} />
                      <div className={styles.thumbLine} style={{ width: '80%' }} />
                      <div className={styles.thumbLine} style={{ width: '60%' }} />
                    </div>
                  </div>
                  <div className={styles.thumbLabel}>{t.name}</div>
                </Link>
              ))}
            </div>
            <Link to="/tools" className={styles.viewMoreBtn}>
              <LayoutTemplate size={15} /> View all CV templates →
            </Link>
          </section>
          <section className={styles.section}>
            <SectionHeader title="Find jobs, bursaries & internships" viewAllTo="/opportunities" viewAllLabel="View all portals →" />
            <p className={styles.sectionIntro}>
              ProLink ZA does not post job listings directly. Instead, we point you to the official,
              trusted platforms where South African employers actually advertise. All applications on
              these platforms are free - never pay to apply for a job or bursary.
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
              <BookOpen size={15} /> Browse all job & bursary portals →
            </Link>
          </section>

        </main>
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
            <Link to="/nsfas" className={styles.nsfasWidgetBtn}>Learn more →</Link>
          </div>

          <AdSlot size="square" />
        </aside>
      </div>
    </div>
  );
}