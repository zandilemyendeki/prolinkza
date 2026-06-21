import { Link } from 'react-router-dom';
import {
  ChevronLeft, Clock, Info, AlertTriangle, ShieldAlert,
  CheckCircle2, XCircle, MinusCircle, ArrowRight, HandCoins,
} from 'lucide-react';
import AdSlot from '../../../components/AdSlot';
import styles from './ArticleIndex.module.css';


function CompCell({ value }: { value: string }) {
  if (value.startsWith('✓')) {
    const text = value.slice(1).trim();
    return (
      <span className={styles.compGood}>
        <CheckCircle2 size={14} style={{ marginRight: 5, verticalAlign: '-2px' }} />
        {text}
      </span>
    );
  }
  if (value.startsWith('✗')) {
    const text = value.slice(1).trim();
    return (
      <span className={styles.compBad}>
        <XCircle size={14} style={{ marginRight: 5, verticalAlign: '-2px' }} />
        {text}
      </span>
    );
  }
  return (
    <span className={styles.compCell}>
      <MinusCircle size={13} style={{ marginRight: 5, verticalAlign: '-2px', opacity: 0.45 }} />
      {value}
    </span>
  );
}

const relatedArticles = [
  { title: 'How to Appeal a Rejected NSFAS Application', meta: 'Appeals · 5 min read', to: '/nsfas/articles/appeals' },
  { title: 'NSFAS Allowances Explained - What You Get and How It Is Paid', meta: 'Allowances · 6 min read', to: '/nsfas/articles/allowances' },
  { title: 'NSFAS 2027 Application Guide', meta: 'NSFAS · 8 min read', to: '/nsfas' },
];

export default function FundingComparison() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link to="/nsfas/articles" className={styles.back}>
          <ChevronLeft size={14} /> Back to NSFAS guides
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>Funding</span>
            <span className={styles.metaDot}>·</span>
            <Clock size={12} />
            <span>7 min read</span>
            <span className={styles.metaDot}>·</span>
            <span>Updated June 2026</span>
          </div>
          <h1 className={styles.title}>
            NSFAS vs Bursaries vs Student Loans - What Is the Difference?
          </h1>
          <p className={styles.lead}>
            Many South African students use "NSFAS," "bursary" and "student loan" interchangeably,
            but they work very differently - and choosing the wrong one, or assuming you cannot
            combine them, can cost you funding you were entitled to. Here is exactly how each one
            works, who qualifies, and which combinations are actually allowed.
          </p>
        </header>

        <article className={styles.article}>
          <h2>The short answer</h2>
          <p>
            NSFAS is a government-funded scheme for students from households earning below a set
            income threshold, and most of it does not need to be paid back. A bursary is private or
            sector-specific funding, usually tied to a company, foundation or industry body, and
            often comes with a work-back obligation after graduation. A student loan is borrowed
            money from a bank or other lender that must be repaid with interest, regardless of
            whether you graduate or find a job. Each one suits a different financial situation, and
            in some cases you are allowed to combine them - just not always with NSFAS.
          </p>

          <h2>How each one actually works</h2>
          <h3>NSFAS (National Student Financial Aid Scheme)</h3>
          <p>
            NSFAS is funded by the South African government and is means-tested, which means your
            household income has to fall below a published threshold to qualify. It covers tuition,
            a accommodation allowance, a transport allowance, a meals allowance, a book allowance and
            a small personal care allowance. NSFAS funding is not a loan in the traditional sense -
            for qualifying students it does not need to be repaid, although a portion historically
            allocated to university-level study before policy changes was structured as a
            loan-conversion model. Always check the latest terms on your funding agreement, since
            NSFAS policy is updated from year to year.
          </p>

          <h3>Bursaries</h3>
          <p>
            A bursary is usually offered by a company, government department, SETA, professional
            body or private foundation, often targeted at a specific field of study such as
            engineering, accounting, teaching or health sciences. Bursaries are not always
            means-tested, some are based purely on academic merit, while others prioritise students
            from disadvantaged backgrounds. The trade-off with many corporate bursaries is a
            work-back clause: you commit to working for the sponsoring company for a set number of
            years after graduating, which can be a great way into employment but is a binding
            obligation worth reading carefully before signing.
          </p>

          <h3>Student loans</h3>
          <p>
            A student loan, whether from a bank or a dedicated student lending provider, is money
            you borrow and must repay with interest, usually starting shortly after you graduate or
            leave your studies. Loans are not based on financial need or academic merit in the same
            way NSFAS and bursaries are - approval is based on affordability and, in many cases, a
            parent or guardian acting as surety. Because interest accrues over the loan term, a
            student loan should generally be treated as a funding option of last resort, used only
            once NSFAS and bursary options have been ruled out.
          </p>

          <div className={styles.infoBox}>
            <Info size={16} />
            <span>
              You can apply for NSFAS and a bursary at the same time. Many universities and bursary
              providers require you to declare any other funding you receive, and some bursaries
              will adjust their offer (known as "top-up" funding) if you already qualify for NSFAS,
              rather than disqualifying you outright.
            </span>
          </div>

          <h2>Side-by-side comparison</h2>
          <p>
            The table below summarises how the three funding types compare across the factors that
            matter most when you are deciding what to apply for.
          </p>

          <div className={styles.compTable}>
            <div className={styles.compHeader}>
              <span>Feature</span>
              <span>NSFAS</span>
              <span>Bursary</span>
              <span>Student loan</span>
            </div>

            <div className={styles.compRow}>
              <span className={styles.compFeature}>Funded by</span>
              <CompCell value="Government" />
              <CompCell value="Company / private donor" />
              <CompCell value="Bank or lender" />
            </div>

            <div className={styles.compRow}>
              <span className={styles.compFeature}>Means-tested</span>
              <CompCell value="✓ Required" />
              <CompCell value="Sometimes" />
              <CompCell value="✗ Not need-based" />
            </div>

            <div className={styles.compRow}>
              <span className={styles.compFeature}>Must be repaid</span>
              <CompCell value="✓ No, for qualifying students" />
              <CompCell value="✓ Usually no" />
              <CompCell value="✗ Yes, with interest" />
            </div>

            <div className={styles.compRow}>
              <span className={styles.compFeature}>Work-back obligation</span>
              <CompCell value="✓ None" />
              <CompCell value="Often required" />
              <CompCell value="✓ None" />
            </div>

            <div className={styles.compRow}>
              <span className={styles.compFeature}>Covers living allowance</span>
              <CompCell value="✓ Yes" />
              <CompCell value="Varies by provider" />
              <CompCell value="Varies by lender" />
            </div>

            <div className={styles.compRow}>
              <span className={styles.compFeature}>Can combine with NSFAS</span>
              <CompCell value="-" />
              <CompCell value="✓ Often, as a top-up" />
              <CompCell value="✗ Rarely recommended" />
            </div>

            <div className={styles.compRow}>
              <span className={styles.compFeature}>Best suited for</span>
              <CompCell value="Households under the income threshold" />
              <CompCell value="Strong academics or a target career field" />
              <CompCell value="Gap funding after other options" />
            </div>
          </div>

          <AdSlot size="leaderboard" />

          <h2>Which one should you apply for?</h2>
          <p>
            If your household income falls below the published NSFAS threshold, apply for NSFAS
            first, it covers the widest range of costs and does not need to be repaid. Apply for
            relevant bursaries in parallel rather than waiting to hear back from NSFAS, since
            bursary deadlines often fall earlier in the year and applying for multiple sources of
            funding at once is allowed and encouraged. A student loan is worth considering only once
            you have confirmed you do not qualify for NSFAS and have applied to bursaries relevant
            to your field of study, since it is the only option of the three that leaves you with
            debt after graduating.
          </p>

          <div className={styles.warnBox}>
            <AlertTriangle size={16} />
            <span>
              Read any bursary's work-back clause carefully before accepting. Some require you to
              work for the sponsoring employer for one year for every year of funding received, and
              breaking the agreement can require repaying the full bursary amount.
            </span>
          </div>

          <div className={styles.scamBox}>
            <ShieldAlert size={16} />
            <span>
              NSFAS, legitimate bursaries and registered lenders never ask you to pay an upfront
              "processing fee" to release your funding. If anyone asks you to pay to receive money
              you have already been awarded, it is a scam - report it and do not make the payment.
            </span>
          </div>

          <h2>Key takeaways</h2>
          <ul>
            <li>NSFAS is means-tested government funding that generally does not need to be repaid.</li>
            <li>Bursaries are often tied to a specific field of study and may include a work-back commitment.</li>
            <li>Student loans must be repaid with interest and are not based on financial need.</li>
            <li>You can usually apply for NSFAS and a bursary at the same time - check both sets of terms.</li>
            <li>Treat a student loan as a last resort, after NSFAS and bursary options have been exhausted.</li>
          </ul>

          <div className={styles.ctaBox}>
            <h3>Not sure where to start?</h3>
            <p>
              Check your NSFAS eligibility and browse open bursaries for your field of study - both
              are free to apply for.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/nsfas" className={styles.ctaBtn}>
                <HandCoins size={15} /> NSFAS eligibility guide
              </Link>
              <Link to="/opportunities" className={styles.ctaBtnSecondary}>
                Browse bursaries <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>

        <div className={styles.relatedArticles}>
          <h3>Related guides</h3>
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