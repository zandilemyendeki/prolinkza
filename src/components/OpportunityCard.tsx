import type { Opportunity } from '../types';
import styles from './OpportunityCard.module.css';

interface Props {
  opportunity: Opportunity;
}

const typeConfig = {
  internship: { label: 'Internship', className: 'tagIntern' },
  bursary: { label: 'Bursary', className: 'tagBursary' },
  graduate: { label: 'Graduate', className: 'tagGrad' },
};

export default function OpportunityCard({ opportunity }: Props) {
  const { label, className } = typeConfig[opportunity.type];

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.logo}>{opportunity.companyAbbr}</div>
        <div>
          <div className={styles.title}>
            {opportunity.title}
            {opportunity.isNew && <span className={styles.newBadge}>New</span>}
          </div>
          <div className={styles.meta}>
            {opportunity.company} · {opportunity.location}
          </div>
          <div className={styles.field}>{opportunity.field}</div>
        </div>
      </div>
      <div className={styles.right}>
        <span className={`${styles.tag} ${styles[className]}`}>{label}</span>
        <div className={styles.deadline}>Closes {opportunity.deadline}</div>
      </div>
    </div>
  );
}