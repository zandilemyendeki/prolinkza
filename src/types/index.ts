export type OpportunityType = 'internship' | 'bursary' | 'graduate';

export interface Opportunity {
  id: string;
  company: string;
  companyAbbr: string;
  title: string;
  location: string;
  type: OpportunityType;
  field: string;
  deadline: string;
  isNew?: boolean;
}

export interface NsfasUpdate {
  id: string;
  title: string;
  body: string;
  date: string;
  isUrgent?: boolean;
  badge?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  style: 'nala' | 'master' | 'modern' | 'professional' | 'two-column' | 'minimal' | 'creative' | 'classic' | 'wozber' | 'sofaa';
  accentColor: string;
}

export interface CvTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
  route: string;
  featured?: boolean;
}

export interface Deadline {
  id: string;
  name: string;
  date: string;
  daysLeft: number;
}