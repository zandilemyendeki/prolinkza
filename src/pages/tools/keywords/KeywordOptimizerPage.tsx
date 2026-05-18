import { useState, useMemo } from 'react';
import { Zap, Copy, Check, Info, Search, FileText, TrendingUp } from 'lucide-react';
// import AdSlot from '../../../components/AdSlot';
import styles from './KeywordOptimizerPage.module.css';

// ─── Stop words to filter out ─────────────────────────────────────────────────
const stopWords = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
  'from','as','is','are','was','were','be','been','have','has','had','do','does',
  'did','will','would','could','should','may','might','this','that','these','those',
  'we','you','your','our','their','its','it','i','my','they','he','she','all','any',
  'each','both','few','more','most','other','some','such','no','nor','not','only',
  'own','same','so','than','too','very','just','also','about','into','through',
  'during','before','after','above','below','between','out','off','over','under',
  'again','further','then','once','here','there','when','where','why','how','all',
  'both','each','few','more','other','some','than','too','must','now','new','good',
  'work','using','used','use','role','will','within','across','strong','including',
  'experience','candidate','apply','position','team','company','please','ability',
  'ensure','make','take','help','need','provide','required','working','looking',
]);

// ─── Extract keywords from text ───────────────────────────────────────────────
function extractKeywords(text: string): Map<string, number> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-+#]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));

  const freq = new Map<string, number>();
  words.forEach(w => freq.set(w, (freq.get(w) ?? 0) + 1));

  // Also extract 2-word phrases
  const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  for (let i = 0; i < tokens.length - 1; i++) {
    if (!stopWords.has(tokens[i]) && !stopWords.has(tokens[i + 1]) && tokens[i].length > 2 && tokens[i + 1].length > 2) {
      const phrase = `${tokens[i]} ${tokens[i + 1]}`;
      if ((freq.get(tokens[i]) ?? 0) >= 2 || (freq.get(tokens[i + 1]) ?? 0) >= 2) {
        freq.set(phrase, (freq.get(phrase) ?? 0) + 1);
      }
    }
  }

  return freq;
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface KeywordResult {
  word: string;
  jobFreq: number;
  cvFreq: number;
  status: 'found' | 'missing' | 'weak';
  importance: 'high' | 'medium' | 'low';
}

// ─── Main analysis function ───────────────────────────────────────────────────
function analyzeKeywords(jobDesc: string, cvText: string): KeywordResult[] {
  const jobKws = extractKeywords(jobDesc);
  const cvKws = extractKeywords(cvText);

  const results: KeywordResult[] = [];

  jobKws.forEach((jobFreq, word) => {
    if (word.length < 3) return;
    const cvFreq = cvKws.get(word) ?? 0;

    let status: 'found' | 'missing' | 'weak';
    if (cvFreq >= jobFreq) status = 'found';
    else if (cvFreq > 0) status = 'weak';
    else status = 'missing';

    const importance: 'high' | 'medium' | 'low' =
      jobFreq >= 4 ? 'high' : jobFreq >= 2 ? 'medium' : 'low';

    results.push({ word, jobFreq, cvFreq, status, importance });
  });

  return results
    .sort((a, b) => {
      // Sort: missing high → missing medium → weak → found
      const statusOrder = { missing: 0, weak: 1, found: 2 };
      const importanceOrder = { high: 0, medium: 1, low: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) return statusOrder[a.status] - statusOrder[b.status];
      return importanceOrder[a.importance] - importanceOrder[b.importance];
    })
    .slice(0, 40); // top 40
}

// ─── Match score bar ──────────────────────────────────────────────────────────
function MatchBar({ score }: { score: number }) {
  const color = score >= 75 ? '#1D9E75' : score >= 50 ? '#BA7517' : '#993C1D';
  const label = score >= 75 ? 'Strong match' : score >= 50 ? 'Moderate match' : 'Weak match';
  return (
    <div className={styles.matchBarWrap}>
      <div className={styles.matchBarTop}>
        <span className={styles.matchScore} style={{ color }}>{score}%</span>
        <span className={styles.matchLabel} style={{ color }}>{label}</span>
      </div>
      <div className={styles.matchBarTrack}>
        <div
          className={styles.matchBarFill}
          style={{ width: `${score}%`, background: color, transition: 'width 0.8s ease' }}
        />
      </div>
      <p className={styles.matchNote}>
        {score >= 75
          ? 'Great - your CV is well-aligned with this job description.'
          : score >= 50
          ? 'Add the missing keywords naturally to improve your match rate.'
          : 'Your CV needs significant keyword alignment with this job description.'}
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function KeywordOptimizerPage() {
  const [jobDesc, setJobDesc] = useState('');
  const [cvText, setCvText] = useState('');
  const [filter, setFilter] = useState<'all' | 'missing' | 'weak' | 'found'>('all');
  const [copied, setCopied] = useState(false);
  const [hasAnalysed, setHasAnalysed] = useState(false);

  const results = useMemo(() => {
    if (!hasAnalysed || !jobDesc.trim() || !cvText.trim()) return [];
    return analyzeKeywords(jobDesc, cvText);
  }, [hasAnalysed, jobDesc, cvText]);

  const handleAnalyse = () => {
    if (jobDesc.trim().length > 20 && cvText.trim().length > 20) {
      setHasAnalysed(true);
    }
  };

  const handleReset = () => {
    setJobDesc('');
    setCvText('');
    setHasAnalysed(false);
    setFilter('all');
  };

  const missing = results.filter(r => r.status === 'missing');
  const weak = results.filter(r => r.status === 'weak');
  const found = results.filter(r => r.status === 'found');

  const matchScore = results.length > 0
    ? Math.round(((found.length + weak.length * 0.5) / results.length) * 100)
    : 0;

  const filteredResults = filter === 'all' ? results : results.filter(r => r.status === filter);

  const handleCopyMissing = () => {
    const words = missing.map(r => r.word).join(', ');
    navigator.clipboard.writeText(words);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ready = jobDesc.trim().length > 20 && cvText.trim().length > 20;

  return (
    <div className={styles.page}>

      {/* Hero */}
          <div className={styles.hero}>
              <div className={styles.heroInner}>
                  <div>
                      <div className={styles.heroTag}>
                          <span className={styles.heroTagDot} />
                          Free tool
                      </div>
                      <h1 className={styles.heroTitle}>CV keyword optimizer</h1>
                      <p className={styles.heroSub}>
                          Paste a job description and your CV. We identify the keywords employers are looking for and show exactly which ones your CV is missing - so you can tailor your application.
                      </p>
                  </div>
              </div>
          </div>

      <div className={styles.inner}>
        {/* <AdSlot size="leaderboard" /> */}

        {/* How it works */}
        <div className={styles.howItWorks}>
          {[
            { icon: FileText, label: 'Paste job description' },
            { icon: FileText, label: 'Paste your CV text' },
            { icon: Zap,      label: 'Click "Analyse keywords"' },
            { icon: TrendingUp, label: 'Add missing keywords' },
          ].map((s, i) => (
            <div key={i} className={styles.howStep}>
              <div className={styles.howNum}>{i + 1}</div>
              <s.icon size={14} className={styles.howIcon} />
              <span className={styles.howLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Input panels */}
        <div className={styles.inputs}>
          <div className={styles.inputCard}>
            <div className={styles.inputHeader}>
              <Search size={14} className={styles.inputHeaderIcon} />
              <span className={styles.inputTitle}>Job description</span>
              <span className={styles.inputCount}>{jobDesc.length} chars</span>
            </div>
            <textarea
              className={styles.textarea}
              rows={12}
              value={jobDesc}
              onChange={(e) => { setJobDesc(e.target.value); setHasAnalysed(false); }}
              placeholder="Paste the full job advertisement here - include requirements, responsibilities and qualifications..."
            />
          </div>

          <div className={styles.inputCard}>
            <div className={styles.inputHeader}>
              <FileText size={14} className={styles.inputHeaderIcon} />
              <span className={styles.inputTitle}>Your CV</span>
              <span className={styles.inputCount}>{cvText.length} chars</span>
            </div>
            <textarea
              className={styles.textarea}
              rows={12}
              value={cvText}
              onChange={(e) => { setCvText(e.target.value); setHasAnalysed(false); }}
              placeholder="Paste your full CV text here - include all sections: summary, experience, education and skills..."
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button className={styles.resetBtn} onClick={handleReset} disabled={!jobDesc && !cvText}>
            Clear all
          </button>
          <button className={styles.analyseBtn} onClick={handleAnalyse} disabled={!ready}>
            <Zap size={15} /> Analyse keywords
          </button>
        </div>

        {/* Results */}
        {hasAnalysed && results.length > 0 && (
          <>
            {/* Match score */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreCardTitle}>
                <TrendingUp size={16} /> Keyword match score
              </div>
              <MatchBar score={matchScore} />
              <div className={styles.scoreSummary}>
                <div className={`${styles.summaryItem} ${styles.summaryFound}`}>
                  <span className={styles.summaryNum}>{found.length}</span>
                  <span className={styles.summaryLabel}>Found</span>
                </div>
                <div className={`${styles.summaryItem} ${styles.summaryWeak}`}>
                  <span className={styles.summaryNum}>{weak.length}</span>
                  <span className={styles.summaryLabel}>Weak</span>
                </div>
                <div className={`${styles.summaryItem} ${styles.summaryMissing}`}>
                  <span className={styles.summaryNum}>{missing.length}</span>
                  <span className={styles.summaryLabel}>Missing</span>
                </div>
                <div className={`${styles.summaryItem} ${styles.summaryTotal}`}>
                  <span className={styles.summaryNum}>{results.length}</span>
                  <span className={styles.summaryLabel}>Total keywords</span>
                </div>
              </div>
            </div>

            {/* Copy missing */}
            {missing.length > 0 && (
              <div className={styles.copyMissing}>
                <div className={styles.copyMissingLeft}>
                  <Info size={14} />
                  <span><strong>{missing.length} keywords</strong> are missing from your CV. Copy them below and naturally add the relevant ones to your CV.</span>
                </div>
                <button className={styles.copyBtn} onClick={handleCopyMissing}>
                  {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy missing keywords</>}
                </button>
              </div>
            )}

            {/* Filter tabs */}
            <div className={styles.filterTabs}>
              {([
                { key: 'all',     label: `All (${results.length})` },
                { key: 'missing', label: `Missing (${missing.length})` },
                { key: 'weak',    label: `Weak (${weak.length})` },
                { key: 'found',   label: `Found (${found.length})` },
              ] as { key: typeof filter; label: string }[]).map(f => (
                <button
                  key={f.key}
                  className={`${styles.filterTab} ${filter === f.key ? styles.filterTabActive : ''} ${f.key === 'missing' ? styles.filterMissing : f.key === 'weak' ? styles.filterWeak : f.key === 'found' ? styles.filterFound : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Keyword pills */}
            <div className={styles.keywordsPanel}>
              <div className={styles.legendRow}>
                <span className={`${styles.legendItem} ${styles.legendFound}`}>■ Found in CV</span>
                <span className={`${styles.legendItem} ${styles.legendWeak}`}>■ Weak (mentioned but underused)</span>
                <span className={`${styles.legendItem} ${styles.legendMissing}`}>■ Missing from CV</span>
              </div>
              <div className={styles.pillsGrid}>
                {filteredResults.map((r) => (
                  <div
                    key={r.word}
                    className={`${styles.pill}
                      ${r.status === 'found' ? styles.pillFound : r.status === 'weak' ? styles.pillWeak : styles.pillMissing}
                      ${r.importance === 'high' ? styles.pillHigh : ''}`}
                    title={`Job mentions ${r.jobFreq}x · CV mentions ${r.cvFreq}x`}
                  >
                    <span className={styles.pillWord}>{r.word}</span>
                    <div className={styles.pillMeta}>
                      {r.importance === 'high' && <span className={styles.pillImportance}>HIGH</span>}
                      <span className={styles.pillFreq}>×{r.jobFreq}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className={styles.tipsBox}>
              <div className={styles.tipsBoxTitle}><Info size={14} /> How to add keywords effectively</div>
              <div className={styles.tipsList}>
                <p>• <strong>Don't keyword-stuff.</strong> Add missing keywords naturally into your experience bullet points, skills section or summary.</p>
                <p>• <strong>Match the exact phrasing.</strong> If the job says "data analysis" use those exact words - not "analysing data".</p>
                <p>• <strong>Prioritise HIGH importance keywords</strong> - these appear most frequently in the job description and carry the most weight.</p>
                <p>• <strong>Weak keywords</strong> are present in your CV but mentioned less than in the job description. Consider expanding on them.</p>
              </div>
            </div>
          </>
        )}

        {hasAnalysed && results.length === 0 && (
          <div className={styles.empty}>
            Could not extract keywords. Make sure both the job description and CV contain enough text (at least 50 words each).
          </div>
        )}

        {/* <AdSlot size="leaderboard" /> */}
      </div>
    </div>
  );
}