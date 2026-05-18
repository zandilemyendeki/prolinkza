import { ExternalLink, AlertCircle, CheckCircle, Calendar, FileText, Users, BookOpen, Banknote, Info, ChevronRight } from 'lucide-react';
// import AdSlot from '../../components/AdSlot';
import styles from './NsfasPage.module.css';

const eligibility = [
  'South African citizen with a valid ID document',
  'Enrolled at a public university or TVET college',
  'Combined household income does not exceed R350,000 per year',
  'Not currently funded by another government bursary scheme',
  'Registered for an approved NSFAS-funded qualification',
  'First-time entering students and continuing students may apply',
];

const documents = [
  'Certified copy of your South African ID document',
  'Certified copies of parent/guardian ID documents',
  'Proof of income (payslip, pension letter, or affidavit if unemployed)',
  'SASSA grant letter (if applicable)',
  'Proof of registration or admission letter from your institution',
  'Latest academic results or matric certificate',
  'Proof of banking details (for returning students)',
  'A signed and completed Consent Form is required to authorize verification of your information.',
];

const allowances2026 = [
  { label: 'Tuition fee', amount: 'Actual cost', note: 'Paid directly to institution' },
  { label: 'Accommodation (on-campus)', amount: 'Up to R57,300', note: 'Per academic year' },
  { label: 'Accommodation (private)', amount: 'Up to R57,300', note: 'Means tested, per year' },
  { label: 'Living allowance', amount: 'R15,750', note: 'Per academic year' },
  { label: 'Transport allowance', amount: 'R7,000', note: 'For commuting students' },
  { label: 'Books & learning material', amount: 'R5,460', note: 'Per academic year' },
  { label: 'Personal care allowance', amount: 'R3,296', note: 'Per academic year' },
];

const keyDates = [
  { date: 'Sep 2026', event: 'Applications opened', status: 'done' },
  { date: 'Nov 2026', event: 'Application deadline - universities', status: 'urgent' },
  { date: '28 Feb 2026', event: 'Application deadline - TVET colleges', status: 'upcoming' },
  { date: 'Jan 2027', event: 'Outcome notifications begin', status: 'upcoming' },
  { date: 'Mar - Apr 2027', event: 'First disbursements processed', status: 'upcoming' },
  { date: '30 days after outcome', event: 'Appeal window opens', status: 'upcoming' },
];

const steps = [
  { num: '01', title: 'Register on MyNSFAS', body: 'Go to my.nsfas.org.za and create a student account using your SA ID number and a valid email address.' },
  { num: '02', title: 'Complete the application', body: 'Fill in all personal, household and academic details. Ensure all information matches your official documents exactly.' },
  { num: '03', title: 'Upload required documents', body: 'Attach certified copies of all required documents. Files must be clear PDF or JPG format, under 2MB each.' },
  { num: '04', title: 'Submit before the deadline', body: 'Submit before 31 January 2027 for universities, or 28 February 2027 for TVET colleges. No late submissions are accepted.' },
  { num: '05', title: 'Track your application', body: 'Log in to MyNSFAS regularly to check your status. You will be notified by SMS and email when an outcome is available.' },
  { num: '06', title: 'Appeal if rejected', body: 'If rejected, you have 30 days to submit an appeal through the MyNSFAS portal with supporting documents explaining your case.' },
];

const reminders = [
  'Apply early - the portal becomes very slow near the deadline',
  'Ensure your contact details and banking details are up to date on MyNSFAS',
  'NSFAS will never ask you for payment to process your application',
  'Beware of scams - only use the official my.nsfas.org.za portal',
  'If your household circumstances change, update your income details immediately',
  'Students who received funding before must re-apply each year - funding is not automatic',
  'Keep copies of all documents you upload in case of queries',
];

const faqs = [
  { q: 'Can I apply if I am already registered at a university?', a: 'Yes. Both first-time entering students and continuing students who have never received NSFAS funding can apply for the first time.' },
  { q: 'What happens if my application is rejected?', a: 'You can submit an appeal through MyNSFAS within 30 days of receiving your rejection. Include supporting documents that explain your circumstances.' },
  { q: 'How long does it take to get a response?', a: 'NSFAS typically processes applications within 4–6 weeks after the deadline. You will be notified via SMS and email once a decision is made.' },
  { q: 'Can I use NSFAS at a private institution?', a: 'No. NSFAS currently only funds students at registered public universities and TVET colleges in South Africa.' },
  { q: 'How will my allowances be paid?', a: 'Allowances are disbursed via the NSFAS wallet linked to your student card, or paid directly to your institution depending on your setup.' },
  { q: 'What if my parents are unemployed with no income?', a: 'Submit a sworn affidavit confirming zero household income. Households earning R0 qualify automatically under the means test.' },
  { q: 'Does NSFAS cover postgraduate studies?', a: 'NSFAS primarily covers undergraduate qualifications. Postgraduate students should explore the NSFAS Postgraduate Bursary or other DHET-funded bursaries.' },
];

export default function NsfasPage() {
  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              Official guidance 2027
            </div>
            <h1 className={styles.heroTitle}>NSFAS - Everything you need to know</h1>
            <p className={styles.heroSub}>
              The National Student Financial Aid Scheme (NSFAS) provides financial assistance to eligible South African students at public universities and TVET colleges. Complete guide for the 2027 academic year.
            </p>
            <div className={styles.heroCtas}>
              <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                Apply on MyNSFAS <ExternalLink size={14} />
              </a>
              <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.ctaOutline}>
                Check my status <ChevronRight size={14} />
              </a>
            </div>
          </div>
          <div className={styles.heroStats}>
            {[
              { num: 'R350k', label: 'Max household income' },
              { num: '2027', label: 'Application year' },
              { num: 'Free', label: 'To apply' },
              { num: '100%', label: 'Tuition covered' },
            ].map((s) => (
              <div key={s.label} className={styles.statBox}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        <main className={styles.main}>

          {/* <AdSlot size="leaderboard" /> */}

          {/* Urgent alert */}
          <div className={styles.urgentAlert}>
            <AlertCircle size={16} className={styles.alertIcon} />
            {/* <p><strong>Deadline: 31 Jan 2027 (universities) · 28 Feb 2027 (TVET).</strong> Applications are open now - don't wait until the last minute as the portal gets congested.</p> */}
            <p><strong>Deadline: ≈ 31 Jan 2027 (universities) · ≈ 28 Feb 2027 (TVET).</strong> Applications will be opened in September - don't wait until the last minute as the portal gets congested.</p>
            <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.alertCta}>
              Apply now <ExternalLink size={11} />
            </a>
          </div>

          {/* Application Process */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.teal}`}><BookOpen size={17} /></div>
              <div>
                <h2 className={styles.cardTitle}>Application process</h2>
                <p className={styles.cardSub}>Step-by-step guide to applying for NSFAS funding</p>
              </div>
            </div>
            <div className={styles.steps}>
              {steps.map((s) => (
                <div key={s.num} className={styles.step}>
                  <div className={styles.stepNum}>{s.num}</div>
                  <div>
                    <div className={styles.stepTitle}>{s.title}</div>
                    <p className={styles.stepText}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.applyBtn}>
              Start your application on MyNSFAS <ExternalLink size={13} />
            </a>
          </section>

          {/* Eligibility */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.purple}`}><Users size={17} /></div>
              <div>
                <h2 className={styles.cardTitle}>Eligibility criteria</h2>
                <p className={styles.cardSub}>You must meet all of these requirements to qualify</p>
              </div>
            </div>
            <div className={styles.checkList}>
              {eligibility.map((item, i) => (
                <div key={i} className={styles.checkItem}>
                  <CheckCircle size={15} className={styles.checkIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <Info size={13} />
              <span>Households earning <strong>R0 - R122,000</strong> qualify automatically. Those earning <strong>R122,001 - R350,000</strong> are subject to the means test.</span>
            </div>
          </section>

          {/* <AdSlot size="leaderboard" /> */}

          {/* Allowances */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.amber}`}><Banknote size={17} /></div>
              <div>
                <h2 className={styles.cardTitle}>2026/2027 allowances</h2>
                <p className={styles.cardSub}>What NSFAS covers for the 2026/2027 academic year</p>
              </div>
            </div>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>Allowance type</span>
                <span>Amount</span>
                <span>Notes</span>
              </div>
              {allowances2026.map((a, i) => (
                <div key={i} className={styles.tableRow}>
                  <span className={styles.rowLabel}>{a.label}</span>
                  <span className={styles.rowAmount}>{a.amount}</span>
                  <span className={styles.rowNote}>{a.note}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <Info size={13} />
              <span>Amounts are reviewed annually by DHET. These figures reflect published 2026 rates - always verify on the official NSFAS website.</span>
            </div>
          </section>

          {/* Key Dates */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.blue}`}><Calendar size={17} /></div>
              <div>
                <h2 className={styles.cardTitle}>Key 2027 dates</h2>
                <p className={styles.cardSub}>Important deadlines and milestones</p>
              </div>
            </div>
            <div className={styles.timeline}>
              {keyDates.map((d, i) => (
                <div key={i} className={`${styles.tlItem} ${d.status === 'done' ? styles.tlDone : d.status === 'urgent' ? styles.tlUrgent : ''}`}>
                  <div className={styles.tlLeft}>
                    <div className={styles.tlDot} />
                    {i < keyDates.length - 1 && <div className={styles.tlLine} />}
                  </div>
                  <div className={styles.tlBody}>
                    <span className={styles.tlDate}>{d.date}</span>
                    <span className={styles.tlEvent}>{d.event}</span>
                    {d.status === 'urgent' && <span className={styles.pillUrgent}>Act now</span>}
                    {d.status === 'done' && <span className={styles.pillDone}>Passed</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.coral}`}><FileText size={17} /></div>
              <div>
                <h2 className={styles.cardTitle}>Required documents</h2>
                <p className={styles.cardSub}>Have these ready before you start your application</p>
              </div>
            </div>
            <div className={styles.docGrid}>
              {documents.map((doc, i) => (
                <div key={i} className={styles.docItem}>
                  <span className={styles.docNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.docText}>{doc}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <Info size={13} />
              <span>All documents must be <strong>certified within the last 3 months</strong>. Certification is available at any police station, post office or commissioner of oaths - free of charge.</span>
            </div>
          </section>

          {/* Reminders */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.amber}`}><AlertCircle size={17} /></div>
              <div>
                <h2 className={styles.cardTitle}>Important reminders</h2>
                <p className={styles.cardSub}>Common pitfalls to avoid during your application</p>
              </div>
            </div>
            <div className={styles.reminders}>
              {reminders.map((r, i) => (
                <div key={i} className={styles.reminderItem}>
                  <span className={styles.reminderBullet}>!</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </section>

          {/* <AdSlot size="leaderboard" /> */}

          {/* FAQs */}
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <div className={`${styles.cardIcon} ${styles.purple}`}><Info size={17} /></div>
              <div>
                <h2 className={styles.cardTitle}>Frequently asked questions</h2>
                <p className={styles.cardSub}>Answers to the most common NSFAS queries</p>
              </div>
            </div>
            <div className={styles.faqs}>
              {faqs.map((f, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{f.q}</summary>
                  <p className={styles.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className={styles.ctaBanner}>
            <div>
              <h3 className={styles.ctaTitle}>Ready to apply for NSFAS?</h3>
              <p className={styles.ctaSub}>Apply directly on the official portal - it is free and takes about 20 minutes to complete.</p>
            </div>
            <div className={styles.ctaBtns}>
              <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                Apply on MyNSFAS <ExternalLink size={14} />
              </a>
              <a href="https://www.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.ctaOutline} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                Official NSFAS website <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </main>

        <aside className={styles.sidebar}>
          <div className={styles.quickCard}>
            <p className={styles.quickLabel}>Official portal</p>
            <div className={styles.quickTitle}>Apply for NSFAS 2026</div>
            {/* <p className={styles.quickSub}>Applications are currently open. Apply free on MyNSFAS.</p> */}
            <p className={styles.quickSub}>Applications will be open in September. Apply free on MyNSFAS.</p>
            <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.quickBtn}>
              Open MyNSFAS <ExternalLink size={13} />
            </a>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official links</div>
            {[
              { label: 'Apply for NSFAS', url: 'https://my.nsfas.org.za' },
              { label: 'Check application status', url: 'https://my.nsfas.org.za' },
              { label: 'Submit an appeal', url: 'https://my.nsfas.org.za' },
              { label: 'Update banking details', url: 'https://my.nsfas.org.za' },
              { label: 'NSFAS official website', url: 'https://www.nsfas.org.za' },
              { label: 'DHET student funding', url: 'https://www.dhet.gov.za' },
            ].map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className={styles.sideLink}>
                {l.label} <ExternalLink size={10} />
              </a>
            ))}
          </div>

          {/* <AdSlot size="rectangle" /> */}

          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>2027 deadlines</div>
            {[
              { label: 'Universities', date: '31 Jan 2027', hot: true },
              { label: 'TVET colleges', date: '28 Feb 2027', hot: false },
              { label: 'Appeal window', date: '30 days after outcome', hot: false },
            ].map((d) => (
              <div key={d.label} className={styles.dlRow}>
                <span className={styles.dlLabel}>{d.label}</span>
                <span className={`${styles.dlDate} ${d.hot ? styles.dlHot : ''}`}>{d.date}</span>
              </div>
            ))}
          </div>

          {/* <AdSlot size="square" /> */}
        </aside>
      </div>
    </div>
  );
}