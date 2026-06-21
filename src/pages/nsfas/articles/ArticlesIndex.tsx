import { Link } from 'react-router-dom';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';
import AdSlot from '../../../components/AdSlot';
import styles from './ArticleIndex.module.css';

const articles = [
  {
    to: '/nsfas/articles/guide',
    title: 'How to Apply for NSFAS in 2027 - Complete Step-by-Step Guide',
    desc: 'Everything you need to know about the NSFAS application process, from registering on MyNSFAS to tracking your outcome and appealing a rejection.',
    readTime: '8 min read',
    category: 'Application Guide',
  },
  {
    to: '/nsfas/articles/appeals',
    title: 'How to Appeal a Rejected NSFAS Application',
    desc: 'If your NSFAS application was rejected, you have 30 days to appeal. This guide explains why applications get rejected and exactly how to submit a successful appeal.',
    readTime: '5 min read',
    category: 'Appeals',
  },
  {
    to: '/nsfas/articles/allowances',
    title: 'NSFAS Allowances Explained - What You Get and How It Is Paid',
    desc: 'A full breakdown of all NSFAS allowances for 2026/2027, including accommodation, transport, food, books and personal care - and how and when each allowance is disbursed.',
    readTime: '6 min read',
    category: 'Allowances',
  },
  {
    to: '/nsfas/articles/funding-comparison',
    title: 'NSFAS vs Bursaries vs Student Loans - What Is the Difference?',
    desc: 'Many students confuse NSFAS with bursaries and student loans. This guide explains the key differences, which one you should apply for, and whether you can get both.',
    readTime: '7 min read',
    category: 'Funding',
  },
];

export default function ArticlesIndex() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <Link to="/nsfas/" className={styles.back}>
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to NSFAS
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <BookOpen size={14} />
            <span>NSFAS Resource Centre</span>
          </div>
          <h1 className={styles.title}>NSFAS Guides & Articles</h1>
          <p className={styles.lead}>
            In-depth guides written for South African students navigating the NSFAS application
            process. From first-time applicants to students appealing a rejection - find the
            information you need here.
          </p>
        </header>

        <AdSlot size="leaderboard" />

        <div className={styles.articlesList}>
          {articles.map((a) => (
            <Link key={a.to} to={a.to} className={styles.articleCard}>
              <div className={styles.articleCardMeta}>
                <span className={styles.category}>{a.category}</span>
                <span className={styles.metaDot}>·</span>
                <Clock size={11} /> <span>{a.readTime}</span>
              </div>
              <h2 className={styles.articleCardTitle}>{a.title}</h2>
              <p className={styles.articleCardDesc}>{a.desc}</p>
              <span className={styles.articleCardLink}>Read guide <ChevronRight size={13} /></span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}