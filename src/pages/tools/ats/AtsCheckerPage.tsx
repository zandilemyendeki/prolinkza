import { useState } from 'react';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle, Upload, RotateCcw, Info } from 'lucide-react';
import AdSlot from '../../../components/AdSlot';
import styles from './AtsCheckerPage.module.css';

interface CheckResult {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  passed: CheckItem[];
  warnings: CheckItem[];
  failed: CheckItem[];
  sectionScores: SectionScore[];
}

interface CheckItem {
  message: string;
  tip?: string;
}

interface SectionScore {
  label: string;
  score: number;
  max: number;
}

const stopWords = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with',
  'by','from','as','is','are','was','were','be','been','have','has','had',
  'do','does','did','will','would','could','should','may','might','this',
  'that','these','those','we','you','your','our','their','its','it','i',
  'my','they','he','she','all','any','each','both','few','more','most',
  'other','some','such','no','nor','not','only','own','same','so','than',
  'too','very',
]);

const actionVerbs = [
  'developed','managed','led','achieved','implemented','improved','designed',
  'created','analysed','coordinated','delivered','built','launched','increased',
  'reduced','spearheaded','oversaw','collaborated','negotiated','trained',
  'mentored','streamlined','established','executed','maintained','resolved',
];

const sectionKeywords = {
  contact:      ['email','phone','linkedin','address','contact','@'],
  summary:      ['summary','profile','objective','about','overview'],
  experience:   ['experience','employment','work history','career','position','role','job'],
  education:    ['education','qualification','degree','diploma','certificate','university','college','matric'],
  skills:       ['skills','competencies','expertise','proficiencies','technologies','tools'],
};

function getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}

function analyzeCV(text: string): CheckResult {
  const t = text.toLowerCase();
  const passed: CheckItem[] = [];
  const warnings: CheckItem[] = [];
  const failed: CheckItem[] = [];
  const sectionScores: SectionScore[] = [];

    const words = t.split(/\s+/).filter(Boolean);
    const stopWordCount = words.filter(w => stopWords.has(w)).length;
    const stopWordRatio = words.length ? stopWordCount / words.length : 0;

    if (stopWordRatio > 0.45) {
        warnings.push({
            message: 'High use of filler words detected',
            tip: 'Reduce unnecessary words like "the", "and", "of" to improve ATS clarity.',
        });
    } else if (stopWordRatio > 0.25) {
        passed.push({ message: 'Good keyword-to-filler word balance' });
    } else {
        passed.push({ message: 'Very clean and concise wording' });
    }

  let contactScore = 0;
  if (/@[\w.-]+\.\w+/.test(text)) { passed.push({ message: 'Email address detected' }); contactScore += 5; }
  else failed.push({ message: 'No email address found', tip: 'Add a professional email address - it is required for ATS parsing.' });
  if (/\+?\d[\d\s\-()\+]{7,}/.test(text)) { passed.push({ message: 'Phone number detected' }); contactScore += 5; }
  else warnings.push({ message: 'Phone number not clearly formatted', tip: 'Use a standard format like +27 71 234 5678.' });
  if (/linkedin\.com\//i.test(text)) { passed.push({ message: 'LinkedIn URL detected' }); contactScore += 5; }
  else warnings.push({ message: 'No LinkedIn profile URL found', tip: 'Adding your LinkedIn URL improves credibility.' });
  sectionScores.push({ label: 'Contact info', score: contactScore, max: 15 });

  let sectionScore = 0;
  const foundSections = Object.entries(sectionKeywords).map(([key, kws]) => {
    const found = kws.some(k => t.includes(k));
    return { key, found };
  });
  const foundCount = foundSections.filter(s => s.found).length;
  const missingKeys = foundSections.filter(s => !s.found).map(s => s.key);
  sectionScore = Math.min(25, foundCount * 5);
  if (foundCount >= 4) passed.push({ message: `All key sections detected: ${foundSections.filter(s=>s.found).map(s=>s.key).join(', ')}` });
  else if (foundCount >= 2) warnings.push({ message: `Only ${foundCount}/5 sections clearly labelled`, tip: `Add clear headings for: ${missingKeys.join(', ')}.` });
  else failed.push({ message: 'Missing standard CV section headings', tip: 'Add headings like "Work Experience", "Education", "Skills" and "Profile" so ATS can parse your CV correctly.' });
  sectionScores.push({ label: 'Section structure', score: sectionScore, max: 25 });

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  let lengthScore = 0;
  if (wordCount >= 400) { passed.push({ message: `Strong content length (${wordCount} words)` }); lengthScore = 15; }
  else if (wordCount >= 200) { warnings.push({ message: `CV may be too short (${wordCount} words)`, tip: 'Aim for at least 400 words to provide sufficient content for ATS scanning.' }); lengthScore = 8; }
  else { failed.push({ message: `CV is very short (${wordCount} words)`, tip: 'A very short CV will score poorly. Expand your experience, skills and education sections.' }); lengthScore = 2; }
  sectionScores.push({ label: 'Content length', score: lengthScore, max: 15 });

  let dateScore = 0;
  if (/\b(20\d{2}|19\d{2})\b/.test(text)) { passed.push({ message: 'Year dates detected in experience or education' }); dateScore = 10; }
  else warnings.push({ message: 'No clear year dates found', tip: 'Include start and end years for every role and qualification.' });
  sectionScores.push({ label: 'Dates', score: dateScore, max: 10 });

  const foundVerbs = actionVerbs.filter(v => t.includes(v));
  let verbScore = 0;
  if (foundVerbs.length >= 5) { passed.push({ message: `Strong action verbs found: ${foundVerbs.slice(0,5).join(', ')}...` }); verbScore = 15; }
  else if (foundVerbs.length >= 2) { warnings.push({ message: `Limited action verbs (${foundVerbs.length} found)`, tip: `Use verbs like: ${actionVerbs.slice(0,6).join(', ')}.` }); verbScore = 7; }
  else { failed.push({ message: 'No strong action verbs detected', tip: 'Start bullet points with verbs like "Developed", "Managed", "Implemented", "Achieved".' }); verbScore = 0; }
  sectionScores.push({ label: 'Action verbs', score: verbScore, max: 15 });

  let formatScore = 10;
  const hasSpecialChars = /[│┌┐└┘■►▪◆★☆→←↑↓]/.test(text);
  if (hasSpecialChars) { warnings.push({ message: 'Special characters detected', tip: 'Many ATS systems cannot read special symbols. Use plain bullet points (•) instead.' }); formatScore -= 5; }
  else passed.push({ message: 'No problematic special characters found' });
  const hasTable = (text.match(/\t/g) || []).length > 5;
  if (hasTable) { warnings.push({ message: 'Possible table formatting detected', tip: 'Tables can confuse ATS parsers. Use plain text formatting instead.' }); formatScore -= 3; }
  else passed.push({ message: 'No table formatting detected' });
  sectionScores.push({ label: 'Formatting', score: Math.max(0, formatScore), max: 10 });

  passed.push({ message: 'Text content extracted successfully - CV is machine-readable' });
  sectionScores.push({ label: 'Readability', score: 10, max: 10 });

  const totalMax = sectionScores.reduce((s, i) => s + i.max, 0);
  const totalScore = sectionScores.reduce((s, i) => s + i.score, 0);
  const score = Math.round((totalScore / totalMax) * 100);

  return { score, grade: getGrade(score), passed, warnings, failed, sectionScores };
}

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const color = score >= 80 ? '#1D9E75' : score >= 65 ? '#BA7517' : score >= 50 ? '#185FA5' : '#993C1D';
  const circumference = 2 * Math.PI * 44;
  const dash = (score / 100) * circumference;

  return (
    <div className={styles.scoreRingWrap}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="44" fill="none" stroke="var(--color-surface-2)" strokeWidth="10" />
        <circle
          cx="55" cy="55" r="44"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
        <text x="55" y="50" textAnchor="middle" fontSize="26" fontWeight="800" fill={color} fontFamily="inherit">{score}</text>
        <text x="55" y="66" textAnchor="middle" fontSize="11" fill="var(--color-text-3)" fontFamily="inherit">/ 100</text>
      </svg>
      <div className={styles.scoreGrade} style={{ color }}>Grade: {grade}</div>
    </div>
  );
}

export default function AtsCheckerPage() {
  const [cvText, setCvText] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (cvText.trim().length < 30) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeCV(cvText));
      setLoading(false);
    }, 600);
  };

  const handleReset = () => { setCvText(''); setResult(null); };

  const scoreColor = result
    ? result.score >= 80 ? '#1D9E75' : result.score >= 65 ? '#BA7517' : result.score >= 50 ? '#185FA5' : '#993C1D'
    : 'var(--color-brand)';

  const scoreLabel = result
    ? result.score >= 80 ? 'Excellent - strong ATS score'
    : result.score >= 65 ? 'Good - a few improvements needed'
    : result.score >= 50 ? 'Fair - several issues to fix'
    : result.score >= 35 ? 'Poor - significant issues found'
    : 'Very poor - major rework needed'
    : '';

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
                  Free tool
            </div>
            <h1 className={styles.heroTitle}>ATS-friendly CV checker</h1>
            <p className={styles.heroSub}>
              Most SA employers use Applicant Tracking Systems (ATS) to filter CVs before a human ever reads them. Paste your CV below and get an instant score with actionable feedback.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <AdSlot size="leaderboard" />

        <div className={styles.howItWorks}>
          {[
            { num: '1', label: 'Paste your CV text' },
            { num: '2', label: 'Click "Check my CV"' },
            { num: '3', label: 'Get your ATS score' },
            { num: '4', label: 'Fix the issues' },
          ].map((s) => (
            <div key={s.num} className={styles.howStep}>
              <span className={styles.howNum}>{s.num}</span>
              <span className={styles.howLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.layout}>
          <div className={styles.inputPanel}>
            <div className={styles.inputHeader}>
              <div className={styles.inputTitle}>
                <Upload size={15} /> Paste your CV text
              </div>
              <span className={styles.charCount}>{cvText.length} characters</span>
            </div>
            <textarea
              className={styles.textarea}
              rows={20}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder={`Paste your full CV text here...\n\nInclude all sections:\n• Contact details\n• Profile / Summary\n• Work Experience\n• Education\n• Skills\n\nTip: Copy from your Word or PDF document and paste here.`}
            />
            <div className={styles.inputActions}>
              <button className={styles.resetBtn} onClick={handleReset} disabled={!cvText}>
                <RotateCcw size={14} /> Clear
              </button>
              <button
                className={styles.checkBtn}
                onClick={handleCheck}
                disabled={cvText.trim().length < 30 || loading}
              >
                {loading ? 'Analysing...' : <><ShieldCheck size={15} /> Check my CV</>}
              </button>
            </div>
          </div>

          <div className={styles.resultsPanel}>
            {!result ? (
              <div className={styles.placeholder}>
                <ShieldCheck size={40} className={styles.placeholderIcon} />
                <p className={styles.placeholderTitle}>Ready to check your CV</p>
                <p className={styles.placeholderSub}>Paste your CV text on the left and click "Check my CV" to receive your ATS score and personalised feedback.</p>
              </div>
            ) : (
              <>
                <div className={styles.scoreHeader}>
                  <ScoreRing score={result.score} grade={result.grade} />
                  <div className={styles.scoreInfo}>
                    <div className={styles.scoreLabel} style={{ color: scoreColor }}>{scoreLabel}</div>
                    <p className={styles.scoreSub}>
                      {result.passed.length} checks passed · {result.warnings.length} warnings · {result.failed.length} failed
                    </p>
                    <div className={styles.scoreBars}>
                      {result.sectionScores.map((s) => (
                        <div key={s.label} className={styles.scoreBar}>
                          <div className={styles.scoreBarLabel}>
                            <span>{s.label}</span>
                            <span>{s.score}/{s.max}</span>
                          </div>
                          <div className={styles.scoreBarTrack}>
                            <div
                              className={styles.scoreBarFill}
                              style={{
                                width: `${(s.score / s.max) * 100}%`,
                                background: s.score === s.max ? '#1D9E75' : s.score >= s.max * 0.6 ? '#BA7517' : '#993C1D',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {result.passed.length > 0 && (
                  <div className={styles.resultGroup}>
                    <div className={`${styles.groupTitle} ${styles.titlePass}`}>
                      <CheckCircle size={15} /> Passed ({result.passed.length})
                    </div>
                    {result.passed.map((item, i) => (
                      <div key={i} className={`${styles.resultItem} ${styles.itemPass}`}>
                        <CheckCircle size={13} className={styles.itemIcon} />
                        <span>{item.message}</span>
                      </div>
                    ))}
                  </div>
                )}

                {result.warnings.length > 0 && (
                  <div className={styles.resultGroup}>
                    <div className={`${styles.groupTitle} ${styles.titleWarn}`}>
                      <AlertTriangle size={15} /> Warnings ({result.warnings.length})
                    </div>
                    {result.warnings.map((item, i) => (
                      <div key={i} className={`${styles.resultItem} ${styles.itemWarn}`}>
                        <AlertTriangle size={13} className={styles.itemIcon} />
                        <div>
                          <div>{item.message}</div>
                          {item.tip && (
                            <div className={styles.itemTip}><Info size={11} /> {item.tip}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {result.failed.length > 0 && (
                  <div className={styles.resultGroup}>
                    <div className={`${styles.groupTitle} ${styles.titleFail}`}>
                      <XCircle size={15} /> Failed ({result.failed.length})
                    </div>
                    {result.failed.map((item, i) => (
                      <div key={i} className={`${styles.resultItem} ${styles.itemFail}`}>
                        <XCircle size={13} className={styles.itemIcon} />
                        <div>
                          <div>{item.message}</div>
                          {item.tip && (
                            <div className={styles.itemTip}><Info size={11} /> {item.tip}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <section className={styles.tipsSection}>
          <h2 className={styles.tipsTitle}>What ATS systems look for</h2>
          <div className={styles.tipsGrid}>
            {[
              { icon: CheckCircle, color: styles.tipTeal, title: 'Clean formatting', body: 'Use simple fonts, standard headings and no tables or text boxes. Complex formatting confuses ATS parsers.' },
              { icon: CheckCircle, color: styles.tipBlue, title: 'Relevant keywords', body: 'Mirror the exact language from the job description. If they say "financial analysis", use those exact words.' },
              { icon: CheckCircle, color: styles.tipPurple, title: 'Standard section headings', body: 'Use clear headings: "Work Experience", "Education", "Skills". Avoid creative alternatives like "My Journey".' },
              { icon: CheckCircle, color: styles.tipAmber, title: 'Quantified achievements', body: 'Include numbers where possible. "Increased sales by 20%" performs far better than "improved sales".' },
              { icon: CheckCircle, color: styles.tipTeal, title: 'Correct file format', body: 'Always submit as a .docx or plain PDF. Avoid image-based PDFs - ATS cannot read them at all.' },
              { icon: CheckCircle, color: styles.tipBlue, title: 'Contact information', body: 'Include your email, phone number and LinkedIn profile at the top of your CV in plain text.' },
            ].map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className={`${styles.tipCard} ${tip.color}`}>
                  <Icon size={15} className={styles.tipIcon} />
                  <div>
                    <div className={styles.tipCardTitle}>{tip.title}</div>
                    <p className={styles.tipCardBody}>{tip.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AdSlot size="leaderboard" />
      </div>
    </div>
  );
}