import { Link } from 'react-router-dom';
import { ExternalLink, AlertCircle, CheckCircle, ArrowLeft, Clock, Calendar, Info } from 'lucide-react';
import AdSlot from '../../../components/AdSlot';
import styles from './ArticleIndex.module.css';

const allowances = [
  { label: 'Tuition fee', amount: 'Actual cost', note: 'Paid directly to institution', who: 'All students' },
  { label: 'Accommodation (on-campus)', amount: 'Up to R57,300', note: 'Per academic year', who: 'On-campus residents' },
  { label: 'Accommodation (private)', amount: 'Up to R57,300', note: 'Means tested', who: 'Off-campus students' },
  { label: 'Living allowance', amount: 'R15,750', note: 'Per academic year', who: 'All students' },
  { label: 'Transport allowance', amount: 'R7,000', note: 'Per academic year', who: 'Commuting students' },
  { label: 'Books & learning material', amount: 'R5,460', note: 'Per academic year', who: 'All students' },
  { label: 'Personal care allowance', amount: 'R3,296', note: 'Per academic year', who: 'All students' },
];

export default function NsfasAllowances() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <Link to="/nsfas/articles" className={styles.back}>
          <ArrowLeft size={14} /> Back to NSFAS articles
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>Allowances</span>
            <span className={styles.metaDot}>·</span>
            <Clock size={12} /> <span>6 min read</span>
            <span className={styles.metaDot}>·</span>
            <Calendar size={12} /> <span>Updated June 2026</span>
          </div>
          <h1 className={styles.title}>
            NSFAS Allowances Explained - What You Get and How It Is Paid in 2026/2027
          </h1>
          <p className={styles.lead}>
            NSFAS does not only cover tuition. Approved students receive a full package of allowances
            covering accommodation, food, transport, books and personal care. This guide explains every
            allowance in detail, how much you receive, how it is paid out, and what you can and cannot
            use it for.
          </p>
        </header>

        <AdSlot size="leaderboard" />

        <article className={styles.article}>

          <h2>Overview - what does NSFAS actually pay for?</h2>
          <p>
            Many students assume NSFAS only covers tuition fees. In reality, approved NSFAS students
            receive a comprehensive bursary package that covers most of the day-to-day costs of
            studying. The package is designed so that a student from a low-income household can
            attend a public university or TVET college without needing additional financial support.
          </p>
          <p>
            The exact allowances you receive depend on your living situation - whether you stay in
            university residence (on-campus), rent private accommodation, or live at home and commute.
            Some allowances are paid to your institution directly, while others are disbursed to you
            through the NSFAS wallet system.
          </p>

          <h2>2026/2027 NSFAS allowances - full breakdown</h2>
          <p>
            The following allowances apply to the 2026/2027 academic year. Amounts are set annually
            by the Department of Higher Education and Training (DHET) and are reviewed at the
            beginning of each academic year.
          </p>

          <div className={styles.allowanceTable}>
            <div className={styles.allowanceHeader}>
              <span>Allowance</span>
              <span>Amount</span>
              <span>Who receives it</span>
            </div>
            {allowances.map((a, i) => (
              <div key={i} className={styles.allowanceRow}>
                <span className={styles.rowLabel}>{a.label}</span>
                <span className={styles.rowAmount}>{a.amount}</span>
                <span className={styles.rowNote}>{a.who}</span>
              </div>
            ))}
          </div>

          <div className={styles.infoBox}>
            <Info size={16} />
            <div>
              These figures reflect the published 2026 DHET rates. Always verify the latest amounts
              on the official NSFAS website at <a href="https://www.nsfas.org.za" target="_blank" rel="noopener noreferrer">nsfas.org.za</a> before
              making financial decisions.
            </div>
          </div>

          <AdSlot size="leaderboard" />

          {/* Tuition */}
          <h2>1. Tuition fee allowance</h2>
          <p>
            NSFAS covers your tuition fees in full, regardless of the amount. This is paid directly
            to your institution - you will never receive the tuition money in your account. Your
            university or TVET college will confirm your NSFAS funding status and zero out your
            tuition balance accordingly.
          </p>
          <p>
            It is important to register at your institution and ensure your financial aid office has
            your NSFAS approval letter. If your institution does not receive the funding confirmation
            in time, you may be required to pay a registration deposit while the payment is processed.
            Always keep a copy of your NSFAS approval letter to show to your financial aid office.
          </p>

          {/* Accommodation */}
          <h2>2. Accommodation allowance</h2>
          <p>
            The accommodation allowance covers where you stay during your studies. NSFAS distinguishes
            between three living situations, each handled differently:
          </p>

          <h3>On-campus accommodation (university residence)</h3>
          <p>
            If you stay in a university residence, NSFAS pays your accommodation costs directly to
            the institution, up to a maximum of R57,300 per academic year. If your residence costs
            more than this cap, you will be required to pay the difference yourself.
          </p>

          <h3>Private accommodation (off-campus rental)</h3>
          <p>
            If you live in private accommodation - such as a rented flat, room or student house -
            NSFAS pays a private accommodation allowance of up to R57,300 per year. To receive this
            allowance, your private accommodation must be on the approved list of accredited providers
            at your institution. Your institution's financial aid office or housing office can provide
            the list of approved private accommodation providers.
          </p>
          <p>
            If you arrange your own accommodation that is not on the approved list, you will not
            receive the private accommodation allowance. This is one of the most common reasons
            students lose out on this portion of their funding.
          </p>

          <h3>Living at home (commuting students)</h3>
          <p>
            If you live at home and travel to your institution daily, you do not receive the
            accommodation allowance. Instead, you receive the transport allowance (detailed below)
            to cover your travel costs.
          </p>

          <div className={styles.warnBox}>
            <AlertCircle size={16} />
            <div>
              <strong>Important:</strong> You cannot receive both the accommodation allowance and
              the transport allowance at the same time. NSFAS will allocate one or the other based
              on your living situation as registered with your institution.
            </div>
          </div>

          <h2>3. Living allowance (food allowance)</h2>
          <p>
            The living allowance of R15,750 per academic year is paid to cover food and general
            living expenses. It is disbursed monthly via the NSFAS wallet, which is linked to
            your student card. The monthly amount works out to approximately R1,312 per month
            over a 12-month period, or more per month if distributed only over the academic year.
          </p>
          <p>
            The NSFAS wallet functions like a prepaid card. You can use it to pay at participating
            retailers, including selected supermarkets and campus shops. You cannot use the NSFAS
            wallet to withdraw cash at an ATM - it is designed to ensure the allowance is used
            for food and essential purchases.
          </p>

          <h2>4. Transport allowance</h2>
          <p>
            The transport allowance of R7,000 per academic year is paid to students who commute
            from home to their institution. It is intended to cover the cost of public transport
            such as taxis, buses or trains.
          </p>
          <p>
            This allowance is only available to students who do not receive the accommodation
            allowance. If you move into residence or private accommodation during the year, you
            must notify your institution and NSFAS, as your allowances will need to be updated.
          </p>

          {/* Books */}
          <h2>5. Books and learning materials allowance</h2>
          <p>
            NSFAS provides R5,460 per academic year for books and learning materials. This
            allowance is disbursed at the beginning of each academic year, usually in January
            or February, via the NSFAS wallet. It is intended to cover prescribed textbooks,
            stationery, printing and other study materials.
          </p>
          <p>
            Given the high cost of university textbooks - some prescribed books cost R500 to
            R1,500 each - it is important to budget this allowance carefully. Consider buying
            second-hand textbooks from senior students or using your institution's library to
            stretch this allowance as far as possible.
          </p>

          {/* Personal care */}
          <h2>6. Personal care allowance</h2>
          <p>
            The personal care allowance of R3,296 per academic year covers toiletries and
            personal hygiene products. Like the books allowance, it is disbursed via the NSFAS
            wallet and can be used at participating retailers.
          </p>

          <AdSlot size="leaderboard" />

          {/* How it's paid */}
          <h2>How are NSFAS allowances paid out?</h2>
          <p>
            NSFAS uses two main payment methods depending on the type of allowance:
          </p>

          <h3>Direct payment to institution</h3>
          <p>
            Tuition fees and on-campus accommodation costs are paid directly by NSFAS to your
            university or TVET college. You do not handle these payments yourself. Your institution
            will confirm receipt and update your student account accordingly.
          </p>

          <h3>NSFAS wallet (student card)</h3>
          <p>
            The living allowance, books allowance, personal care allowance and private accommodation
            allowance are loaded onto your NSFAS wallet. The wallet is linked to a student card
            issued by your institution. You use this card to make purchases at approved retailers.
          </p>
          <p>
            Allowances are typically disbursed at the beginning of each month during the academic
            year. The exact disbursement schedule varies by institution - check with your financial
            aid office for the specific dates at your university or TVET college.
          </p>

          <div className={styles.checkList}>
            {[
              { title: 'Check your NSFAS wallet balance regularly', body: 'Log in to MyNSFAS or use the NSFAS app to check your wallet balance and track disbursements.' },
              { title: 'Report problems immediately', body: 'If an allowance is not disbursed on the expected date, contact your institution\'s financial aid office and then NSFAS directly.' },
              { title: 'Keep your contact details updated', body: 'NSFAS sends SMS notifications when allowances are disbursed. Make sure your cell number on MyNSFAS is correct.' },
              { title: 'Do not share your student card PIN', body: 'Your NSFAS wallet card works like a bank card. Never share your PIN or card details with anyone.' },
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

          {/* Common issues */}
          <h2>Common allowance problems and how to resolve them</h2>

          <h3>My allowance was not paid this month</h3>
          <p>
            The most common causes of missed allowance payments are: your institution has not yet
            confirmed your registration with NSFAS, your banking or wallet details are incorrect
            on MyNSFAS, or there is a processing delay at the start of a new academic term. Contact
            your institution's financial aid office first - they have direct communication channels
            with NSFAS and can resolve most issues faster than contacting NSFAS directly.
          </p>

          <h3>I received less than the full allowance amount</h3>
          <p>
            NSFAS may pay a partial allowance if you registered late, if your course load is less
            than a full academic year, or if the disbursement was split between two periods. Check
            your MyNSFAS dashboard for a detailed breakdown of what was paid and why.
          </p>

          <h3>My private accommodation is not on the approved list</h3>
          <p>
            Not all rental accommodation qualifies for the NSFAS private accommodation allowance.
            Your landlord or rental agency must be registered with your institution as an approved
            accommodation provider. Before signing any lease, confirm with your institution's
            housing office that the property is on the approved list.
          </p>

          <div className={styles.scamBox}>
            <AlertCircle size={16} />
            <div>
              <strong>Scam warning:</strong> NSFAS will never ask you to pay a fee to receive your
              allowances or to activate your wallet. If someone contacts you claiming to be from
              NSFAS and asks for payment, it is a scam. Report it to the SAPS and to NSFAS at
              their official contact channels on nsfas.org.za.
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaBox}>
            <h3>Need to apply for NSFAS?</h3>
            <p>
              Applications for the 2027 academic year open in September 2026. Apply early to
              ensure your funding is in place before the academic year begins.
            </p>
            <div className={styles.ctaBtns}>
              <a href="https://my.nsfas.org.za" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                Apply on MyNSFAS <ExternalLink size={13} />
              </a>
              <Link to="/nsfas/articles/guide" className={styles.ctaBtnSecondary}>
                Read the full application guide
              </Link>
            </div>
          </div>

          {/* Related */}
          <div className={styles.relatedArticles}>
            <h3>Related guides</h3>
            <div className={styles.relatedGrid}>
              <Link to="/nsfas/articles/guide" className={styles.relatedCard}>
                <div className={styles.relatedTitle}>How to Apply for NSFAS 2027 - Complete Guide</div>
                <div className={styles.relatedMeta}>8 min read</div>
              </Link>
              <Link to="/nsfas/articles/appeals" className={styles.relatedCard}>
                <div className={styles.relatedTitle}>How to Appeal a Rejected NSFAS Application</div>
                <div className={styles.relatedMeta}>5 min read</div>
              </Link>
              <Link to="/nsfas/articles/funding-comparison" className={styles.relatedCard}>
                <div className={styles.relatedTitle}>NSFAS vs Bursaries vs Student Loans</div>
                <div className={styles.relatedMeta}>7 min read</div>
              </Link>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}