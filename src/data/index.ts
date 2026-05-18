import type { NsfasUpdate, ResumeTemplate, CvTool } from '../types';

export const nsfasUpdates: NsfasUpdate[] = [
  {
    id: '1',
    // title: '2026 applications are open',
    title: '2027 applications will be opened in September',
    // body: 'NSFAS is accepting applications for the 2025 academic year. Ensure your MyNSFAS account is verified before applying.',
    body: 'NSFAS will be accepting applications for the 2027 academic year. Ensure your MyNSFAS account is verified before applying.',
    date: '2026-04-28',
    isUrgent: true,
    badge: 'Deadline: 31 Feb 2027',
  },
  {
    id: '2',
    title: 'March allowance disbursement schedule released',
    body: 'The disbursement schedule for March 2025 has been published. Check your institution\'s schedule on the NSFAS portal.',
    date: 'Mar - Apr 2027',
  },
  {
    id: '3',
    title: 'Appeals portal reopens for rejected 2026 applicants',
    body: 'Students who were rejected in 2026 can now submit appeals via the MyNSFAS student portal.',
    date: 'Sep 2026',
  },
  {
    id: '4',
    title: 'New accommodation allowance rates for 2027',
    body: 'NSFAS has announced updated accommodation allowance rates for the 2027 academic year. Private accommodation students will see a 5% increase.',
    date: 'Sep 2026',
  },
];

export const resumeTemplates: ResumeTemplate[] = [
  { id: '1', name: 'Nala', style: 'nala', accentColor: '#7a1f2b' },
  { id: '2', name: 'Master', style: 'master', accentColor: '#1a4fbf' },
  { id: '3', name: 'Modern', style: 'modern', accentColor: '#1D9E75' },
  { id: '4', name: 'Professionl', style: 'professional', accentColor: '#34586bff' },
  { id: '5', name: 'Two-column', style: 'two-column', accentColor: '#534AB7' },
  { id: '6', name: 'Minimal', style: 'minimal', accentColor: '#909033ff' },
  { id: '7', name: 'Creative', style: 'creative', accentColor: '#993C1D' },
  { id: '8', name: 'Classic', style: 'classic', accentColor: '#000000' },
  { id: '9', name: 'Wozber', style: 'wozber', accentColor: '#7dd8cfff' },
  { id: '10', name: 'Sofaa', style: 'sofaa', accentColor: '#E6E6E6' },
];

export const cvTools: CvTool[] = [
  {
    id: 'builder',
    name: 'Resume builder',
    description: 'Create a professional CV in minutes with guided templates for SA students',
    icon: 'FileText',
    badge: '100% free',
    badgeColor: 'teal',
    route: '/tools/builder',
    featured: true,
  },
  {
    id: 'ats',
    name: 'ATS checker',
    description: 'See if your CV passes applicant tracking systems used by SA employers',
    icon: 'ShieldCheck',
    badge: 'Instant check',
    badgeColor: 'purple',
    route: '/tools/ats',
  },
  {
    id: 'keywords',
    name: 'Keyword optimizer',
    description: 'Match your CV keywords to the job description you are applying for',
    icon: 'Zap',
    badge: 'Smart scan',
    badgeColor: 'amber',
    route: '/tools/keywords',
  },
  {
    id: 'cover',
    name: 'Cover letter generator',
    description: 'AI-generated cover letters tailored to each job and company',
    icon: 'Mail',
    badge: 'AI-powered',
    badgeColor: 'blue',
    route: '/tools/cover-letter',
  },
];