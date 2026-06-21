import { Link } from 'react-router-dom';
import { ExternalLink, CheckCircle, AlertCircle, ArrowLeft, Clock, Calendar } from 'lucide-react';
import AdSlot from '../../../components/AdSlot';
import styles from './ArticleIndex.module.css';

export default function NsfasGuide() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Back */}
        <Link to="/nsfas/articles" className={styles.back}>
          <ArrowLeft size={14} /> Back to Articles
        </Link>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>NSFAS Guide</span>
            <span className={styles.metaDot}>·</span>
            <Clock size={12} /> <span>8 min read</span>
            <span className={styles.metaDot}>·</span>
            <Calendar size={12} /> <span>Updated June 2026</span>
          </div>
          <h1 className={styles.title}>
            How to Apply for NSFAS in 2027 - Complete Step-by-Step Guide for South African Students
          </h1>
          <p className={styles.lead}>
            NSFAS (National Student Financial Aid Scheme) is the South African government's primary
            funding scheme for students at public universities and TVET colleges. If your household
            earns less than R350,000 per year, you may qualify for funding that covers tuition,
            accommodation, meals, transport and a personal care allowance. This guide walks you
            through every step of the 2027 application process.
          </p>
        </header>

        <article className={styles.article}>

          {/* What is NSFAS */}
          <h2>What is NSFAS and who funds it?</h2>
          <p>
            NSFAS is a statutory body established under the National Student Financial Aid Scheme
            Act of 1999. It is funded by the South African government through the Department of
            Higher Education and Training (DHET). Unlike a bank loan, NSFAS funding does not need
            to be repaid in full - qualifying students receive a bursary that covers the cost of
            their studies as long as they meet the academic progress requirements.
          </p>
          <p>
            In the 2024 academic year, NSFAS funded over 1.1 million students across South Africa.
            The scheme covers students at all 26 public universities and all 50 public TVET colleges,
            making it the largest student financial aid programme on the African continent.
          </p>

          {/* Who qualifies */}
          <h2>Who qualifies for NSFAS funding?</h2>
          <p>
            To qualify for NSFAS, you must meet all of the following requirements:
          </p>
          <ul>
            <li>You must be a South African citizen with a valid ID document</li>
            <li>You must be enrolled at - or applying to - a registered public university or TVET college</li>
            <li>Your combined household income must not exceed R350,000 per year</li>
            <li>You must not be receiving funding from another government bursary scheme</li>
            <li>You must be registered for a qualification that is approved for NSFAS funding</li>
          </ul>
          <p>
            There are two income tiers. Households earning between R0 and R122,000 per year qualify
            automatically - no means test is required. Households earning between R122,001 and
            R350,000 are subject to a means test, which considers the number of dependants, other
            expenses and the type of accommodation.
          </p>

          <div className={styles.infoBox}>
            <AlertCircle size={16} />
            <div>
              <strong>First-generation university students:</strong> If neither of your parents
              attended university, make sure you mention this in your application. NSFAS gives
              additional consideration to first-generation students from low-income households.
            </div>
          </div>

          <AdSlot size="leaderboard" />

          {/* When to apply */}
          <h2>When do NSFAS applications open for 2027?</h2>
          <p>
            NSFAS applications for the 2027 academic year are expected to open in September 2026.
            This is consistent with previous years - the scheme typically opens applications in
            September and closes them in November for universities, and in February of the academic
            year for TVET colleges.
          </p>
          <p>
            It is important to apply as soon as the portal opens. The MyNSFAS online portal handles
            millions of applications and becomes extremely slow - and sometimes crashes - in the
            weeks before the deadline. Students who apply early avoid this frustration and also
            have more time to correct any errors in their applications.
          </p>

          <div className={styles.dateTable}>
            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>Applications open</span>
              <span className={styles.dateValue}>September 2026</span>
            </div>
            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>University deadline</span>
              <span className={`${styles.dateValue} ${styles.dateUrgent}`}>≈ 31 January 2027</span>
            </div>
            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>TVET college deadline</span>
              <span className={styles.dateValue}>≈ 28 February 2027</span>
            </div>
            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>Outcome notifications</span>
              <span className={styles.dateValue}>From January 2027</span>
            </div>
            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>First disbursements</span>
              <span className={styles.dateValue}>March – April 2027</span>
            </div>
          </div>

          {/* Step by step */}
          <h2>Step-by-step: How to apply for NSFAS</h2>

          <h3>Step 1: Register on MyNSFAS</h3>
          <p>
            Go to <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer">my.nsfas.org.za</a> and
            click "Sign Up" to create a new student account. You will need your South African ID
            number, a valid email address and a cell phone number. Make sure you use an email
            address you check regularly - all communications from NSFAS will be sent there.
          </p>
          <p>
            If you already have a MyNSFAS account from a previous application, do not create a
            new one. Log in with your existing credentials and update your information if anything
            has changed, such as your contact details or banking information.
          </p>

          <h3>Step 2: Complete the online application form</h3>
          <p>
            Once logged in, navigate to the application section and fill in all required fields.
            This includes your personal details, your institution and qualification, and your
            household income information. You will also be asked to provide details about your
            parents or guardians, including their ID numbers and income.
          </p>
          <p>
            Be extremely careful that all information matches your official documents exactly.
            Discrepancies between your application and your ID or income documents are one of the
            most common reasons for NSFAS rejections. Even a minor error in an ID number or
            spelling of a name can cause delays.
          </p>

          <h3>Step 3: Upload your documents</h3>
          <p>
            You will need to upload the following certified documents:
          </p>
          <ul>
            <li>Certified copy of your South African ID document</li>
            <li>Certified copies of your parents' or guardians' ID documents</li>
            <li>Proof of household income (payslips, pension letters or a sworn affidavit if unemployed)</li>
            <li>SASSA grant letter, if your household receives a government grant</li>
            <li>Proof of registration or an admission letter from your institution</li>
            <li>Your latest matric certificate or academic results</li>
            <li>Proof of banking details (for returning students)</li>
            <li>A signed Consent Form authorising NSFAS to verify your information</li>
          </ul>
          <p>
            Documents must be certified within the last three months. Certification is free and
            available at any police station, post office or commissioner of oaths. Upload files
            as clear PDF or JPG images under 2MB each. Blurry or illegible scans are a common
            reason for document rejection.
          </p>

          <h3>Step 4: Submit your application</h3>
          <p>
            Review all your information carefully before submitting. Once submitted, you will
            receive a confirmation email with a reference number. Save this reference number -
            you will need it to track your application and for any future communications with NSFAS.
          </p>

          <h3>Step 5: Track your application status</h3>
          <p>
            Log in to MyNSFAS regularly to check your application status. NSFAS will also send
            updates via SMS and email. The possible statuses are: Received, Under Assessment,
            Approved, Rejected or Appealing. If your status changes to Approved, you will receive
            a funding letter that you should submit to your institution's financial aid office.
          </p>

          <h3>Step 6: What to do if your application is rejected</h3>
          <p>
            If your application is rejected, do not give up. You have 30 days from the date of
            the rejection notification to submit an appeal through the MyNSFAS portal. Appeals
            must include supporting documents that address the reason for the rejection - for
            example, if you were rejected due to incorrect income information, submit updated
            and certified proof of income.
          </p>
          <p>
            Read our dedicated <Link to="/nsfas/articles/appeals">NSFAS appeals guide</Link> for
            a full walkthrough of the appeal process.
          </p>

          {/* Common mistakes */}
          <h2>Common mistakes that get NSFAS applications rejected</h2>
          <p>
            Based on feedback from students who have gone through the NSFAS process, here are
            the most common reasons for rejection and how to avoid them:
          </p>

          <div className={styles.checkList}>
            {[
              { title: 'Incorrect ID numbers', body: 'Double-check every ID number on the application against the physical document. One wrong digit will cause a mismatch.' },
              { title: 'Outdated or uncertified documents', body: 'Documents certified more than 3 months ago are not accepted. Certify everything fresh before submitting.' },
              { title: 'Blurry document scans', body: 'Use a scanner or a document scanning app on your phone. Photograph documents in good light with no shadows across the text.' },
              { title: 'Missing the consent form', body: 'The signed Consent Form is required and is frequently overlooked. Download it from the NSFAS website, sign it, and upload it.' },
              { title: 'Applying too late', body: 'The portal gets extremely congested near the deadline. Technical issues during last-minute submissions are not accepted as grounds for an extension.' },
              { title: 'Household income miscalculation', body: 'Include all sources of household income, including SASSA grants, rental income and freelance work. Underreporting income can lead to rejection or funding cancellation later.' },
            ].map((item, i) => (
              <div key={i} className={styles.checkItem}>
                <CheckCircle size={15} className={styles.checkIcon} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What NSFAS covers */}
          <h2>What does NSFAS cover?</h2>
          <p>
            Approved NSFAS students receive a comprehensive bursary package. The exact amounts
            vary depending on whether you live on campus, in private accommodation or at home,
            and whether you commute to your institution. For the 2026/2027 academic year, the
            published allowances are:
          </p>
          <ul>
            <li><strong>Tuition:</strong> Covered in full, paid directly to your institution</li>
            <li><strong>Accommodation:</strong> Up to R57,300 per year (on-campus or private)</li>
            <li><strong>Living allowance:</strong> R15,750 per year</li>
            <li><strong>Transport allowance:</strong> R7,000 per year (for commuting students)</li>
            <li><strong>Books and learning materials:</strong> R5,460 per year</li>
            <li><strong>Personal care allowance:</strong> R3,296 per year</li>
          </ul>
          <p>
            Allowances are disbursed monthly via the NSFAS wallet system, linked to your student
            card. Tuition is paid directly to your institution. Read our full
            <Link to="/nsfas/articles/allowances"> NSFAS allowances guide</Link> for a detailed
            breakdown of all allowances and how they are paid.
          </p>

          {/* Tips */}
          <h2>Tips for a successful NSFAS application</h2>
          <ul>
            <li>Apply on the first day the portal opens - do not wait</li>
            <li>Use a stable internet connection when submitting your application</li>
            <li>Take screenshots of every step of your submission as proof</li>
            <li>Save your reference number immediately after submitting</li>
            <li>Check your email and MyNSFAS dashboard weekly for status updates</li>
            <li>If the portal is slow, try early morning (before 7am) or late evening</li>
            <li>Keep physical copies of all documents you upload</li>
            <li>Notify NSFAS immediately if your contact details or banking details change</li>
          </ul>

          {/* CTA */}
          <div className={styles.ctaBox}>
            <h3>Ready to apply?</h3>
            <p>
              Applications for the 2027 academic year open in September 2026. Prepare your
              documents now so you can apply the moment the portal opens.
            </p>
            <div className={styles.ctaBtns}>
              <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                Apply on MyNSFAS <ExternalLink size={13} />
              </a>
              <Link to="/nsfas" className={styles.ctaBtnSecondary}>
                Back to NSFAS overview
              </Link>
            </div>
          </div>

          {/* Related articles */}
          <div className={styles.relatedArticles}>
            <h3>Related guides</h3>
            <div className={styles.relatedGrid}>
              <Link to="/nsfas/articles/appeals" className={styles.relatedCard}>
                <div className={styles.relatedTitle}>How to Appeal a Rejected NSFAS Application</div>
                <div className={styles.relatedMeta}>5 min read</div>
              </Link>
              <Link to="/nsfas/articles/allowances" className={styles.relatedCard}>
                <div className={styles.relatedTitle}>NSFAS Allowances Explained - What You Get and How</div>
                <div className={styles.relatedMeta}>6 min read</div>
              </Link>
              <Link to="/nsfas/articles/funding-comparison" className={styles.relatedCard}>
                <div className={styles.relatedTitle}>NSFAS vs Bursaries vs Student Loans - What is the Difference?</div>
                <div className={styles.relatedMeta}>7 min read</div>
              </Link>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}