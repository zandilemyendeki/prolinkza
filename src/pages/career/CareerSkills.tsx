import { Link } from "react-router-dom";
import {
  ArrowLeft, Clock, Calendar, Info, AlertTriangle,
  Zap, HardHat, Cpu, Stethoscope, Wheat, Hammer,
  CheckCircle2, ArrowRight, GraduationCap,
} from "lucide-react";
import AdSlot from "../../components/AdSlot";
import styles from "./CareerSkills.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "scarce-skills", label: "Scarce & Critical Skills" },
  { id: "recovery-sectors", label: "Reconstruction & Recovery Sectors" },
  { id: "demand-table", label: "Occupations in Demand" },
  { id: "how-to-use", label: "Using This List" },
];

const recoverySectors = [
  {
    icon: <HardHat size={18} />,
    name: "Infrastructure & Construction",
    desc: "A multi-year rollout of roads, energy, water, transport and social infrastructure forms one of the plan's core priorities, creating sustained demand for built-environment skills.",
    skills: ["Civil engineering", "Quantity surveying", "Project management", "Plumbing & artisan trades"],
  },
  {
    icon: <Zap size={18} />,
    name: "Energy",
    desc: "Achieving secure, reliable energy supply is one of the plan's headline goals, spanning grid maintenance, generation and the shift toward renewable capacity.",
    skills: ["Electrical engineering", "Renewable energy technicians", "Grid & systems engineering", "Energy auditing"],
  },
  {
    icon: <Cpu size={18} />,
    name: "Digital Economy & ICT",
    desc: "Expanding broadband access and lowering data costs are explicit plan priorities, alongside a broader push to position South Africa as a hub for digitally-enabled business services.",
    skills: ["Software development", "Cybersecurity", "Data analysis", "Network engineering"],
  },
  {
    icon: <Hammer size={18} />,
    name: "Manufacturing & Industrialisation",
    desc: "Reviving local manufacturing through deeper localisation, Special Economic Zones and industrial park revitalisation is identified as central to reindustrialising the economy.",
    skills: ["Industrial/mechanical engineering", "Automation & instrumentation", "Quality assurance", "Toolmaking & fabrication"],
  },
  {
    icon: <Wheat size={18} />,
    name: "Agriculture & Agro-Processing",
    desc: "Agriculture is highlighted as a sector with strong job-creation potential, with localisation targets specifically extending into agro-processing.",
    skills: ["Agricultural science", "Food technology", "Supply chain & logistics", "Agri-business management"],
  },
  {
    icon: <Stethoscope size={18} />,
    name: "Health Care & Localisation",
    desc: "Health care is named among the goods and services targeted for local procurement and production, alongside basic consumer goods and industrial equipment.",
    skills: ["Nursing", "Pharmaceutical sciences", "Biomedical engineering", "Health technology management"],
  },
];

const demandOccupations = [
  { occ: "Electricians & instrumentation artisans", sector: "Energy / Manufacturing", level: "high" },
  { occ: "Civil & electrical engineers", sector: "Infrastructure / Energy", level: "high" },
  { occ: "Software developers & ICT specialists", sector: "Digital Economy", level: "high" },
  { occ: "Cybersecurity specialists", sector: "Digital Economy", level: "rising" },
  { occ: "Millwrights & automation technicians", sector: "Manufacturing", level: "high" },
  { occ: "Financial & risk professionals", sector: "Cross-sector", level: "steady" },
  { occ: "Data analysts", sector: "Digital Economy", level: "rising" },
  { occ: "Agricultural scientists & technicians", sector: "Agriculture", level: "rising" },
  { occ: "Health professionals (nursing, allied health)", sector: "Health Care", level: "steady" },
  { occ: "Project & construction managers", sector: "Infrastructure", level: "steady" },
];

const levelLabel: Record<string, string> = {
  high: "High demand",
  rising: "Rising demand",
  steady: "Steady demand",
};

const levelClass: Record<string, string> = {
  high: styles.levelHigh,
  rising: styles.levelRising,
  steady: styles.levelSteady,
};

const relatedArticles = [
  { title: "Top 10 Bursaries for Engineering Students in South Africa", meta: "Bursaries · 6 min read", to: "/opportunities" },
  { title: "How to Build an ATS-Friendly CV for the SA Job Market", meta: "CV Tools · 5 min read", to: "/tools/builder" },
  { title: "NSFAS 2027 Application Guide", meta: "NSFAS · 8 min read", to: "/nsfas" },
];

export default function CareerSkills() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link to="/" className={styles.back}>
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>Career Guidance</span>
            <span className={styles.metaDot}>·</span>
            <Clock size={12} />
            <span>9 min read</span>
            <span className={styles.metaDot}>·</span>
            <Calendar size={12} />
            <span>Updated June 2026</span>
          </div>
          <h1 className={styles.title}>
            High-Demand Occupations and Scarce Skills in South Africa: A Student's Guide
          </h1>
          <p className={styles.lead}>
            Choosing a field of study is easier when you know where the country's labour market is
            actually short of skills. This guide brings together South Africa's critical and scarce
            skills picture with the sectors prioritised under the Economic Reconstruction and
            Recovery Plan, so you can see which qualifications are likely to lead to real
            opportunities.
          </p>
        </header>

        <nav className={styles.toc}>
          <span className={styles.tocTitle}>On this page</span>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={styles.tocLink}>
              <ArrowRight size={12} /> {s.label}
            </a>
          ))}
        </nav>

        <article className={styles.article}>
          <h2 id="overview">Overview</h2>
          <p>
            South Africa regularly faces two related but distinct labour market challenges: a
            shortage of specific scarce skills that employers across sectors struggle to fill, and a
            set of strategic priority sectors that government has identified as critical to economic
            recovery and job creation. Understanding both helps students and graduates make informed
            decisions about what to study, which bursaries to target, and where job opportunities are
            most likely to grow over the next several years.
          </p>
          <p>
            This guide does not replace official sources. The South African government periodically
            publishes a Critical Skills List through the Department of Higher Education and Training
            (DHET) and the Department of Home Affairs, and the figures below are drawn from recent
            industry survey data and official government communications. Always confirm current
            details against official sources before making study or career decisions.
          </p>

          <h2 id="scarce-skills">Scarce and Critical Skills in South Africa</h2>
          <p>
            Independent labour market research consistently points to a deepening shortage of
            technical and specialist skills in South Africa. According to Xpatweb's 2025 Critical
            Skills Survey, the proportion of large companies struggling to source highly skilled
            talent rose to 84% in 2025, with engineers, ICT
            specialists, artisans, financial professionals and foreign language speakers continuing
            to dominate the list of hardest-to-fill roles.
          </p>
          <p className={styles.source}>Source: Xpatweb 2025 Critical Skills Survey, via Polity.org.za</p>

          <p>
            The shortage of skilled tradespeople has worsened sharply in a short space of time: the
            share of companies struggling to hire artisans climbed from 10%
            in 2024 to 22% in 2025, with electricians, millwrights, automation
            specialists and instrumentation specialists named as the most sought-after trades.
          </p>
          <p className={styles.source}>Source: Xpatweb 2025 Critical Skills Survey, via Polity.org.za</p>

          <div className={styles.infoBox}>
            <Info size={16} />
            <span>
              Looking beyond current shortages, the World Economic Forum's
              2025 Future of Jobs Report identifies AI, big data, cybersecurity and digital literacy
              as the fastest-growing skill areas over the next five years - useful
              context if you're choosing a field of study with a long runway ahead of you.
            </span>
          </div>

          <p>
            These industry survey findings don't exist in isolation. They have historically fed
            directly into government policy: Xpatweb's research has been
            used as an input into the DHET's Occupations in High Demand report, which in turn informs
            the Department of Home Affairs' official Critical Skills List, the gazetted
            list that determines which occupations qualify for the Critical Skills Work Visa.
          </p>
          <p className={styles.source}>Source: Xpatweb, via Polity.org.za</p>

          <div className={styles.warnBox}>
            <AlertTriangle size={16} />
            <span>
              The official Critical Skills List is periodically revised and is not the same thing as
              "what's easy to get a job in." It is primarily a visa and immigration tool. Treat it as
              one useful signal among several, not a guarantee of local employment.
            </span>
          </div>

          <div className={styles.adMid}>
            <AdSlot size="rectangle" />
          </div>

          <h2 id="recovery-sectors">Key Sectors Under the Economic Reconstruction and Recovery Plan</h2>
          <p>
            In October 2020, President Cyril Ramaphosa presented South Africa's Economic
            Reconstruction and Recovery Plan to a joint sitting of Parliament. The plan set out
             four priority areas: a massive rollout of infrastructure,
            expanded energy generation capacity, an employment stimulus, and measures to
            deepen industrialisation and local manufacturing. Since then, the President has continued
            to reference and update progress on the plan, including more recent commitments to
             invest R1 trillion over three years in roads, dams, schools,
            hospitals, clinics and energy, logistics and transport infrastructure.
          </p>
          <p className={styles.source}>Sources: The Presidency; SAnews.gov.za</p>

          <p>
            The plan also names specific sectors for support and revival. Government has worked with
            business and labour to set localisation targets for goods in
            areas such as agro-processing, health care, basic consumer goods, industrial equipment,
            construction materials and transport rolling stock, while separately
            committing to resuscitate vulnerable sectors such as tourism
            and protect jobs in distressed industries.
          </p>
          <p className={styles.source}>Sources: The Presidency; SAnews.gov.za</p>

          <p>
            Below is a simplified breakdown of the sectors most consistently named under the
            recovery plan, along with the kinds of skills typically associated with each one.
          </p>

          <div className={styles.sectorGrid}>
            {recoverySectors.map((s) => (
              <div key={s.name} className={styles.sectorCard}>
                <div className={styles.sectorIcon}>{s.icon}</div>
                <div className={styles.sectorName}>{s.name}</div>
                <p className={styles.sectorDesc}>{s.desc}</p>
                <div className={styles.sectorSkills}>
                  {s.skills.map((sk) => (
                    <span key={sk} className={styles.skillTag}>{sk}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 id="demand-table">Occupations Currently in Demand</h2>
          <p>
            Combining the scarce-skills survey data with the recovery plan's priority sectors gives a
            practical shortlist of occupations worth researching further. "Demand level" here is a
            general indication based on the sources above, not a formal ranking - always verify
            specific job market conditions before committing to a study path.
          </p>

          <div className={styles.demandTable}>
            <div className={styles.demandHeader}>
              <span>Occupation</span>
              <span>Related sector</span>
              <span>Demand level</span>
            </div>
            {demandOccupations.map((row) => (
              <div key={row.occ} className={styles.demandRow}>
                <span className={styles.occLabel}>{row.occ}</span>
                <span className={styles.occSector}>{row.sector}</span>
                <span className={`${styles.levelBadge} ${levelClass[row.level]}`}>
                  {levelLabel[row.level]}
                </span>
              </div>
            ))}
          </div>

          <h2 id="how-to-use">How to Use This Information</h2>
          <p>
            None of this means you should only study toward occupations on a list. It means that if
            you are still deciding on a field of study, or weighing up two options you're equally
            interested in, this kind of information can be a useful tie-breaker.
          </p>

          <div className={styles.checkList}>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Cross-reference with bursaries</strong>
                <p>Many bursary providers fund study specifically in scarce-skill fields like engineering, ICT and the trades.</p>
              </div>
            </div>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Check professional registration requirements</strong>
                <p>Fields like engineering, health and accounting require registration with bodies such as ECSA, HPCSA or SAICA.</p>
              </div>
            </div>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Look at TVET and artisan pathways, not only universities</strong>
                <p>Several of the most in-demand roles, like electricians and millwrights, are trained through TVET colleges and apprenticeships rather than university degrees.</p>
              </div>
            </div>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Re-check the list periodically</strong>
                <p>Skills shortages and recovery-plan priorities are reviewed and updated over time, so revisit official sources during your studies, not just before choosing a course.</p>
              </div>
            </div>
          </div>

          <h2>Final Thoughts</h2>
          <p>
            Skills shortages and national recovery priorities point to where structural demand is
            likely to remain strong, but they are only one part of a good career decision. Combine
            this information with your own interests and strengths, speak to your university or
            college's career office, and revisit official government and industry sources
            periodically as both the Critical Skills List and the recovery plan continue to evolve.
          </p>

          <div className={styles.ctaBox}>
            <h3>Ready to plan your next step?</h3>
            <p>Browse bursaries aligned to scarce-skill fields, or build a CV that highlights the skills employers are short of.</p>
            <div className={styles.ctaBtns}>
              <Link to="/opportunities" className={styles.ctaBtn}>
                <GraduationCap size={15} /> Browse bursaries
              </Link>
              <Link to="/tools/builder" className={styles.ctaBtnSecondary}>
                Build my CV <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <p className={styles.disclaimer}>
            This article is for general informational and educational purposes only and does not
            constitute career, immigration or financial advice. Critical skills lists, visa
            requirements and government policy are updated periodically - always confirm current
            details with the Department of Higher Education and Training, the Department of Home
            Affairs, or a qualified professional before making decisions based on this information.
          </p>
        </article>

        <div className={styles.relatedArticles}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            {relatedArticles.map((a) => (
              <Link key={a.to} to={a.to} className={styles.relatedCard}>
                <span className={styles.relatedTitle}>{a.title}</span>
                <span className={styles.relatedMeta}>{a.meta}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}