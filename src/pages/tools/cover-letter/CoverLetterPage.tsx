// src/pages/tools/cover-letter/CoverLetterPage.tsx
import { useState } from 'react';
import { Mail, Sparkles, Copy, Download, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
// import AdSlot from '../../../components/AdSlot';
import styles from './CoverLetterPage.module.css';

interface FormData {
  jobTitle: string;
  companyName: string;
  yourName: string;
  yourExperience: string;
  keySkills: string;
  whyInterested: string;
}

export default function CoverLetterPage() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    companyName: '',
    yourName: '',
    yourExperience: '',
    keySkills: '',
    whyInterested: '',
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGenerate = () => {
    if (!formData.jobTitle || !formData.companyName || !formData.yourName) return;

    setLoading(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const letter = generateCoverLetter(formData);
      setGeneratedLetter(letter);
      setLoading(false);
    }, 1200);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover_Letter_${formData.companyName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFormData({
      jobTitle: '',
      companyName: '',
      yourName: '',
      yourExperience: '',
      keySkills: '',
      whyInterested: '',
    });
    setGeneratedLetter('');
  };

  const isFormValid = formData.jobTitle && formData.companyName && formData.yourName;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <div className={styles.heroTag}>
              <Sparkles size={11} />
              <span>AI-powered tool</span>
            </div>
            <h1 className={styles.heroTitle}>Cover letter generator</h1>
            <p className={styles.heroSub}>
              Get a professional, tailored cover letter in seconds. Just fill in the details below, and we'll create a compelling letter you can edit before sending.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        {/* <AdSlot size="leaderboard" /> */}

        {/* Features */}
        <div className={styles.features}>
          {[
            { icon: CheckCircle, label: 'Tailored to job & company', color: styles.featureTeal },
            { icon: CheckCircle, label: 'Editable before sending', color: styles.featureBlue },
            { icon: CheckCircle, label: 'SA-appropriate professional tone', color: styles.featurePurple },
            { icon: AlertCircle, label: 'Review before submitting', color: styles.featureAmber },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className={`${styles.feature} ${f.color}`}>
                <Icon size={14} />
                <span>{f.label}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.layout}>
          {/* Input Form */}
          <div className={styles.formPanel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Your details</h2>
              <p className={styles.panelSub}>Fill in as much detail as possible for a better letter</p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Your full name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Zandile Myendeki"
                value={formData.yourName}
                onChange={(e) => handleChange('yourName', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Job title you're applying for <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Company name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. ABC Research Centre"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Your relevant experience (optional)</label>
              <textarea
                className={styles.textarea}
                rows={3}
                placeholder="e.g. 2 years as a frontend developer intern, built 5 React applications..."
                value={formData.yourExperience}
                onChange={(e) => handleChange('yourExperience', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Key skills (optional)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. React, TypeScript, Problem-solving, Team collaboration"
                value={formData.keySkills}
                onChange={(e) => handleChange('keySkills', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Why are you interested? (optional)</label>
              <textarea
                className={styles.textarea}
                rows={3}
                placeholder="e.g. I'm passionate about fintech and want to help build accessible financial products..."
                value={formData.whyInterested}
                onChange={(e) => handleChange('whyInterested', e.target.value)}
              />
            </div>

            <div className={styles.formActions}>
              <button className={styles.resetBtn} onClick={handleReset} disabled={!isFormValid}>
                <RotateCcw size={14} />
                Clear form
              </button>
              <button
                className={styles.generateBtn}
                onClick={handleGenerate}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <>
                    <Sparkles size={15} className={styles.spinning} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    Generate cover letter
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Letter */}
          <div className={styles.letterPanel}>
            {!generatedLetter ? (
              <div className={styles.placeholder}>
                <Mail size={40} className={styles.placeholderIcon} />
                <p className={styles.placeholderTitle}>Your cover letter will appear here</p>
                <p className={styles.placeholderSub}>
                  Fill in your details on the left and click "Generate cover letter" to create your professional cover letter.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.letterHeader}>
                  <h3 className={styles.letterTitle}>Your cover letter</h3>
                  <div className={styles.letterActions}>
                    <button className={styles.actionBtn} onClick={handleCopy}>
                      {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button className={styles.actionBtn} onClick={handleDownload}>
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>

                <textarea
                  className={styles.letterContent}
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  rows={20}
                />

                <div className={styles.letterTip}>
                  <AlertCircle size={14} />
                  <span>
                    <strong>Tip:</strong> Review and edit this letter before sending. Personalize it further to match your voice and the specific job requirements.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tips section */}
        <section className={styles.tipsSection}>
          <h2 className={styles.tipsTitle}>Cover letter writing tips</h2>
          <div className={styles.tipsGrid}>
            {[
              {
                title: 'Be specific',
                body: 'Reference the exact job title and company name. Show you have researched the company by mentioning recent projects or values.',
              },
              {
                title: 'Show enthusiasm',
                body: 'Express genuine interest in the role and company. Explain why this opportunity excites you and how it aligns with your career goals.',
              },
              {
                title: 'Quantify achievements',
                body: 'Use numbers where possible. "Increased sales by 30%" is stronger than "improved sales performance".',
              },
              {
                title: 'Keep it concise',
                body: 'Aim for 250-400 words. Hiring managers are busy - respect their time by being clear and direct.',
              },
              {
                title: 'Match the tone',
                body: 'Research the company culture. A creative agency might appreciate personality, while a law firm expects formality.',
              },
              {
                title: 'Proofread carefully',
                body: 'Typos and grammar errors are red flags. Read it aloud, use spell check, and get a friend to review it.',
              },
            ].map((tip, i) => (
              <div key={i} className={styles.tipCard}>
                <div className={styles.tipCardTitle}>{tip.title}</div>
                <p className={styles.tipCardBody}>{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* <AdSlot size="leaderboard" /> */}
      </div>
    </div>
  );
}

// ─── Cover Letter Template Generator ─────────────────────────────────────────
function generateCoverLetter(data: FormData): string {
  const today = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const experience = data.yourExperience
    ? `\n\nI bring ${data.yourExperience.toLowerCase()} to this role. ${
        data.keySkills
          ? `My key strengths include ${data.keySkills.toLowerCase()}, which I believe align well with the requirements for this position.`
          : ''
      }`
    : '';

  const interest = data.whyInterested
    ? `\n\n${data.whyInterested.trim().endsWith('.') ? data.whyInterested : data.whyInterested + '.'} I am particularly drawn to ${data.companyName} because of its reputation and commitment to excellence.`
    : `\n\nI am particularly excited about the opportunity to join ${data.companyName} and contribute to your team's success.`;

  return `${data.yourName}
[Your Contact Number]
[Your Email Address]
[Your Location]

${today}

Hiring Manager
${data.companyName}

Dear Hiring Manager,

I am writing to express my strong interest in the ${data.jobTitle} position at ${data.companyName}. As a motivated and skilled professional, I am confident that my background and enthusiasm make me an excellent candidate for this role.${experience}${interest}

I am eager to bring my dedication, skills, and passion to ${data.companyName}. I would welcome the opportunity to discuss how I can contribute to your team. Thank you for considering my application.

I look forward to the possibility of speaking with you about this exciting opportunity.

Yours sincerely,

${data.yourName}`;
}