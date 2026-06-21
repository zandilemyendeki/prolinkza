import { Link } from "react-router-dom";
import {
  ArrowLeft, Clock, Calendar, AlertCircle, ShieldAlert,
  CheckCircle2, ArrowRight, HandCoins,
} from "lucide-react";
import AdSlot from '../../../components/AdSlot';
import styles from './ArticleIndex.module.css';

const relatedArticles = [
  { title: "NSFAS 2027 Application Guide", meta: "NSFAS · 8 min read", to: "/nsfas/articles/guide" },
  { title: "NSFAS Allowances Explained - What You Get and How It Is Paid", meta: "Allowances · 6 min read", to: "/nsfas/articles/allowances" },
  { title: "NSFAS vs Bursaries vs Student Loans", meta: "Funding · 7 min read", to: "/nsfas/articles/comparison" },
];

export default function NsfasAppeals() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link to="/nsfas/articles" className={styles.back}>
          <ArrowLeft size={14} /> Back to Articles
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>Appeals</span>
            <span className={styles.metaDot}>·</span>
            <Clock size={12} />
            <span>5 min read</span>
            <span className={styles.metaDot}>·</span>
            <Calendar size={12} />
            <span>Updated June 2026</span>
          </div>
          <h1 className={styles.title}>
            NSFAS Appeal Guide 2027: What To Do If Your Application Is Rejected
          </h1>
          <p className={styles.lead}>
            A complete guide explaining why NSFAS applications are rejected, how the
            appeal process works, required documents, deadlines, and tips to improve
            your chances of approval.
          </p>
        </header>

        <article className={styles.article}>
          <div className={styles.warnBox}>
            <AlertCircle size={16} />
            <span>
              Students generally have 30 days after receiving an outcome to submit an
              appeal through the MyNSFAS portal. Missing this window can mean waiting
              until the next funding cycle to be reconsidered.
            </span>
          </div>

          <h2>What Is an NSFAS Appeal?</h2>
          <p>
            An NSFAS appeal is a formal request asking the National Student Financial
            Aid Scheme to review a funding decision. If your application was
            unsuccessful, you may still qualify for funding if there was an error in
            your assessment or if your circumstances have changed since you originally
            applied.
          </p>
          <p>
            Many students assume that a rejection means they will never receive
            funding. This is not always true. Every year thousands of students
            successfully appeal NSFAS decisions after providing additional
            information or correcting issues that affected their original
            application.
          </p>

          <h2>Common Reasons NSFAS Applications Are Rejected</h2>
          <p>
            Understanding why your application was declined is the first step toward
            submitting a strong appeal.
          </p>
          <ul>
            <li>Household income exceeded the NSFAS threshold.</li>
            <li>Missing or incorrect supporting documents.</li>
            <li>Identity verification problems.</li>
            <li>Academic eligibility requirements were not met.</li>
            <li>Duplicate applications were submitted.</li>
            <li>Incorrect personal information.</li>
            <li>Institution registration issues.</li>
          </ul>
          <p>
            Before appealing, carefully review the rejection reason shown on your
            MyNSFAS account. Your appeal should directly address that reason with
            supporting evidence.
          </p>

          <h2>Who Can Submit an Appeal?</h2>
          <p>
            Students who receive a funding rejection may submit an appeal if they
            believe the decision was incorrect or if their circumstances have changed
            significantly. Examples include:
          </p>
          <ul>
            <li>Loss of household income after applying.</li>
            <li>Death of a parent or guardian.</li>
            <li>Incorrect financial information used in assessment.</li>
            <li>Administrative errors.</li>
            <li>Updated academic information.</li>
          </ul>

          <h2>How To Submit an NSFAS Appeal</h2>
          <div className={styles.checkList}>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Step 1: Log in to your MyNSFAS account</strong>
                <p>Use the same credentials from your original application.</p>
              </div>
            </div>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Step 2: Navigate to the appeal section</strong>
                <p>This is usually listed alongside your application status.</p>
              </div>
            </div>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Step 3: Select the reason for your appeal</strong>
                <p>Choose the option that matches your specific circumstances.</p>
              </div>
            </div>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Step 4: Upload supporting documents</strong>
                <p>Make sure files are clear, certified where required, and complete.</p>
              </div>
            </div>
            <div className={styles.checkItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <div>
                <strong>Step 5: Submit and keep proof of submission</strong>
                <p>Save a confirmation screenshot or reference number for your records.</p>
              </div>
            </div>
          </div>

          <AdSlot size="leaderboard" />

          <h2>Documents You May Need</h2>
          <p>The required documents depend on your circumstances. Examples may include:</p>
          <ul>
            <li>Certified ID copies.</li>
            <li>Death certificates.</li>
            <li>Retrenchment letters.</li>
            <li>Affidavits.</li>
            <li>Updated proof of income.</li>
            <li>Medical documentation.</li>
            <li>Academic records.</li>
          </ul>

          <h2>Tips For a Successful Appeal</h2>
          <p>
            Appeals supported by clear evidence generally have a stronger chance of
            success. Avoid submitting incomplete information or repeating information
            that was already assessed without providing new supporting documentation.
          </p>
          <ul>
            <li>Upload clear and readable documents.</li>
            <li>Explain your circumstances honestly.</li>
            <li>Submit before the deadline.</li>
            <li>Ensure all documents are certified where required.</li>
            <li>Check your email and MyNSFAS regularly.</li>
          </ul>

          <h2>How Long Does an Appeal Take?</h2>
          <p>
            Processing times vary depending on application volumes and the complexity
            of individual cases. Some appeals may be finalized within a few weeks
            while others can take longer. Students should regularly monitor their
            MyNSFAS accounts for updates.
          </p>

          <h2>What Happens If Your Appeal Is Approved?</h2>
          <p>
            If your appeal is successful, your funding status will be updated and you
            may become eligible for tuition coverage and allowances according to
            NSFAS funding rules. Always confirm details directly through official
            NSFAS communication channels.
          </p>

          <div className={styles.scamBox}>
            <ShieldAlert size={16} />
            <span>
              NSFAS will never ask you to pay a fee to submit or process an appeal.
              If anyone asks for payment to "speed up" or "guarantee" your appeal, it
              is a scam - report it and do not pay.
            </span>
          </div>

          <h2>Final Thoughts</h2>
          <p>
            Receiving a rejection can be frustrating, but it does not always mean the
            end of your funding journey. Understanding the appeal process, providing
            strong supporting evidence, and meeting deadlines can significantly
            improve your chances of receiving financial assistance.
          </p>

          <div className={styles.ctaBox}>
            <h3>Ready to submit your appeal?</h3>
            <p>
              Log in to MyNSFAS to check your rejection reason, or review the full
              application guide before you start.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/nsfas" className={styles.ctaBtn}>
                <HandCoins size={15} /> NSFAS main guide
              </Link>
              <Link to="/nsfas/articles/guide" className={styles.ctaBtnSecondary}>
                Application guide <ArrowRight size={14} />
              </Link>
            </div>
          </div>
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