import { Link } from 'react-router-dom';
import styles from './SectionHeader.module.css';

interface Props {
  title: string;
  viewAllTo?: string;
  viewAllLabel?: string;
}

export default function SectionHeader({ title, viewAllTo, viewAllLabel = 'View all →' }: Props) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {viewAllTo && (
        <Link to={viewAllTo} className={styles.link}>{viewAllLabel}</Link>
      )}
    </div>
  );
}