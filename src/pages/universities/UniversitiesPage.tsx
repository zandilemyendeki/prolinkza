import { useState, useMemo } from 'react';
import { ExternalLink, Search, MapPin, Calendar, CalendarClock, Banknote, ChevronDown, ChevronUp, Calculator, GraduationCap, Building2, Timer } from 'lucide-react';
import AdSlot from '../../components/AdSlot';
import { universities, colleges, provinces } from '../../data/universities';
import { useCountdown } from '../../hooks/useCountdown';
import styles from './UniversitiesPage.module.css';

const privateInstitutions = [
    { name: 'Eduvos', url: 'https://www.eduvos.com', faculties: 'IT, Science, Law, Commerce' },
    { name: 'Varsity College (IIE)', url: 'https://www.varsitycollege.co.za', faculties: 'Law, Business, Psychology' },
    { name: 'Rosebank College (IIE)', url: 'https://www.rosebankcollege.co.za', faculties: 'Business, IT, Education' },
    { name: 'STADIO Higher Education', url: 'https://stadio.ac.za', faculties: 'Teaching, Policing, Fashion' },
    { name: 'MANCOSA', url: 'https://www.mancosa.co.za', faculties: 'Management, Business Studies' },
    { name: 'Regenesys Business School', url: 'https://www.regenesys.net', faculties: 'Business, Public Management' },
    { name: 'AFDA', url: 'https://afda.co.za', faculties: 'Film, Acting, Live Performance' },
    { name: 'Vega School', url: 'https://www.vegaschool.com', faculties: 'Brand, Design, Business' },
    { name: 'SACAP', url: 'https://www.sacap.edu.za', faculties: 'Psychology, Counseling' },
    { name: 'Milpark Education', url: 'https://www.milpark.ac.za', faculties: 'Commerce, Management' },
    { name: 'Cornerstone Institute', url: 'https://cornerstone.ac.za', faculties: 'Humanities, Education' },
    { name: 'Inscape Education Group', url: 'https://www.inscape.ac', faculties: 'Design, Creative Arts' },
    { name: 'IMM Graduate School', url: 'https://imm.ac.za', faculties: 'Marketing, Supply Chain' },
    { name: 'Red & Yellow Creative School of Business', url: 'https://www.redandyellow.co.za', faculties: 'Marketing, Creative Business' },
    { name: 'Belgium Campus iTversity', url: 'https://www.belgiumcampus.ac.za', faculties: 'IT, Software Development' },
    { name: 'The Animation School', url: 'https://theanimationschool.co.za', faculties: 'Animation, Visual Effects' },
    { name: 'Boston City Campus', url: 'https://www.boston.ac.za', faculties: 'Certificates, Diplomas' },
    { name: 'CTU Training Solutions', url: 'https://ctutraining.ac.za', faculties: 'IT, Technical Training' },
    { name: 'Oxbridge Academy', url: 'https://fundiconnect.co.za/institutions/oxbridge-academy', faculties: 'Vocational Training' },
    { name: 'Lyceum College', url: 'https://lyceum.edu.za', faculties: 'Distance Learning' },
    { name: 'Damelin', url: 'https://www.damelin.co.za', faculties: 'Business, IT, Engineering' },
    { name: 'Richfield Graduate Institute', url: 'https://www.richfield.ac.za', faculties: 'IT, Management, Commerce' },
    { name: 'HTA School of Culinary Art', url: 'https://www.htachefschool.co.za', faculties: 'Culinary Arts, Hospitality' },
    { name: 'Capsicum Culinary Studio', url: 'https://www.capsicumcooking.com', faculties: 'Culinary Arts, Patisserie' },
];

const subjects = [
    'Home Language', 'First Additional Language', 'Mathematics',
    'Mathematical Literacy', 'Physical Sciences', 'Life Sciences',
    'Accounting', 'Business Studies', 'Economics', 'Geography',
    'History', 'Life Orientation', 'Other Subject 1', 'Other Subject 2',
];

const gradeToPoints: Record<number, number> = {
    90: 8, 80: 7, 70: 6, 60: 5, 50: 4, 40: 3, 30: 2, 0: 1,
};

function markToPoints(mark: number): number {
    for (const [threshold, pts] of Object.entries(gradeToPoints).map(([k, v]) => [Number(k), v]).sort((a, b) => b[0] - a[0])) {
        if (mark >= threshold) return pts;
    }
    return 1;
}

function PrivateInstitutions() {
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.privateCard}>
            <button className={styles.privateToggle} onClick={() => setOpen(!open)}>
                <div className={styles.apsToggleLeft}>
                    <div className={styles.privateIcon}><Building2 size={18} /></div>
                    <div>
                        <div className={styles.apsToggleTitle}>Private Institutions</div>
                        <div className={styles.apsToggleSub}>{privateInstitutions.length} private higher education institutions in South Africa</div>
                    </div>
                </div>
                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {open && (
                <>
                    <div className={styles.privateList}>
                        {privateInstitutions.map((inst) => (
                            <a key={inst.name} href={inst.url} target="_blank" rel="noopener noreferrer" className={styles.privateItem}>
                                <div className={styles.privateItemInner}>
                                    <span className={styles.privateItemName}>{inst.name}</span>
                                    <span className={styles.privateItemFaculty}>{inst.faculties}</span>
                                </div>
                                <ExternalLink size={12} className={styles.privateArrow} />
                            </a>
                        ))}
                    </div>

                    <div className={styles.privateFooter}>
                        <p className={styles.privateFooterText}>
                            To verify whether a private FET college is registered and accredited, consult the{' '}
                            <a href="http://www.dhet.gov.za" target="_blank" rel="noopener noreferrer" className={styles.privateFooterLink}>
                                List of Registered Private FET Colleges at dhet.gov.za <ExternalLink size={11} />
                            </a>.
                        </p>
                        <div className={styles.privateFooterSteps}>
                            <span className={styles.privateFooterLabel}>Verification steps</span>
                            <p className={styles.privateFooterText}>
                                To confirm a private institution's accreditation, always verify its status with Umalusi (for schools/colleges) or the{' '}
                                <a href="https://www.che.ac.za/faqs/post-school-education/where-do-i-find-list-accredited-private-fet-colleges" target="_blank" rel="noopener noreferrer" className={styles.privateFooterLink}>
                                    CHE <ExternalLink size={11} />
                                </a>{' '}
                                (for higher education) and check the{' '}
                                <a href="https://www.dhet.gov.za/Registers_DocLib/Register%20of%20Private%20Colleges%20%2023%20January%202026.pdf" target="_blank" rel="noopener noreferrer" className={styles.privateFooterLink}>
                                    latest DHET Register of Private Colleges <ExternalLink size={11} />
                                </a>.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function ApsCalculator() {
    const [marks, setMarks] = useState<Record<string, string>>({});
    const [showCalc, setShowCalc] = useState(false);

    const aps = useMemo(() => {
        const points = Object.entries(marks)
            .filter(([subj]) => subj !== 'Life Orientation')
            .map(([, val]) => { const n = parseInt(val); return isNaN(n) ? 0 : markToPoints(n); })
            .sort((a, b) => b - a).slice(0, 6);
        return points.reduce((sum, p) => sum + p, 0);
    }, [marks]);

    const qualifying = universities.filter(u => u.minAps > 0 && aps >= u.minAps).length;

    return (
        <div className={styles.apsCard}>
            <button className={styles.apsToggle} onClick={() => setShowCalc(!showCalc)}>
                <div className={styles.apsToggleLeft}>
                    <div className={styles.apsIcon}><Calculator size={18} /></div>
                    <div>
                        <div className={styles.apsToggleTitle}>APS Score Calculator</div>
                        <div className={styles.apsToggleSub}>Calculate your Admission Point Score to see which universities you qualify for.</div>
                    </div>
                </div>
                {showCalc ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showCalc && (
                <div className={styles.apsBody}>
                    <p className={styles.apsNote}>
                        Enter your final percentage for each subject. Life Orientation is excluded from APS at most universities.
                    </p>
                    <div className={styles.apsGrid}>
                        {subjects.map((subj) => (
                            <label key={subj} className={styles.apsField}>
                                <span className={styles.apsLabel}>{subj}</span>
                                <div className={styles.apsInputWrap}>
                                    <input className={styles.apsInput} type="number" min={0} max={100} placeholder="%" value={marks[subj] ?? ''} onChange={(e) => setMarks(p => ({ ...p, [subj]: e.target.value }))} />
                                    {marks[subj] && <span className={styles.apsPoints}>{markToPoints(parseInt(marks[subj] || '0'))} pts</span>}
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className={styles.apsResult}>
                        <div className={styles.apsScore}>
                            <span className={styles.apsScoreNum}>{aps}</span>
                            <span className={styles.apsScoreLabel}>Your APS</span>
                        </div>
                        <div className={styles.apsBreakdown}>
                            <div className={styles.apsBreakdownTitle}>What you qualify for</div>
                            {aps === 0 ? (
                                <p className={styles.apsEmpty}>Enter your marks above to see which universities you qualify for.</p>
                            ) : (
                                <>
                                    <p className={styles.apsQualify}>You meet the minimum APS for <strong>{qualifying}</strong> out of {universities.filter(u => u.minAps > 0).length} universities listed.</p>
                                    <div className={styles.apsUniList}>
                                        {universities.filter(u => u.minAps > 0).sort((a, b) => b.minAps - a.minAps).map(u => {
                                            const qualifies = aps >= u.minAps;
                                            return (
                                                <div key={u.id} className={`${styles.apsUniRow} ${qualifies ? styles.apsQualified : styles.apsNotQualified}`}>
                                                    <span className={styles.apsUniName}>{u.shortName} — {u.name}</span>
                                                    <span className={styles.apsUniMin}>Min APS: {u.minAps}</span>
                                                    <span className={styles.apsStatus}>{qualifies ? '✓' : '✗'}</span>
                                                </div>
                                            );
                                        })}
                                        <div className={`${styles.apsUniRow} ${styles.apsNote2}`}>
                                            <span className={styles.apsUniName}>UNISA — University of South Africa</span>
                                            <span className={styles.apsUniMin}>Open entry (no min APS)</span>
                                            <span className={styles.apsStatus} style={{ color: 'var(--color-brand)' }}>✓</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Countdown display component ──────────────────────────────────────────────
function CountdownTimer({ isoDate }: { isoDate: string }) {
    const { days, hours, minutes, seconds, expired, urgent } = useCountdown(isoDate);

    if (expired) {
        return (
            <div className={styles.countdownExpired}>
                <Timer size={12} /> Applications closed
            </div>
        );
    }

    return (
        <div className={`${styles.countdown} ${urgent ? styles.countdownUrgent : ''}`}>
            <Timer size={12} className={styles.countdownIcon} />
            <span className={styles.countdownLabel}>Closes in</span>
            <div className={styles.countdownBlocks}>
                <div className={styles.countdownBlock}>
                    <span className={styles.countdownNum}>{String(days).padStart(2, '0')}</span>
                    <span className={styles.countdownUnit}>d</span>
                </div>
                <span className={styles.countdownSep}>:</span>
                <div className={styles.countdownBlock}>
                    <span className={styles.countdownNum}>{String(hours).padStart(2, '0')}</span>
                    <span className={styles.countdownUnit}>h</span>
                </div>
                <span className={styles.countdownSep}>:</span>
                <div className={styles.countdownBlock}>
                    <span className={styles.countdownNum}>{String(minutes).padStart(2, '0')}</span>
                    <span className={styles.countdownUnit}>m</span>
                </div>
                <span className={styles.countdownSep}>:</span>
                <div className={styles.countdownBlock}>
                    <span className={styles.countdownNum}>{String(seconds).padStart(2, '0')}</span>
                    <span className={styles.countdownUnit}>s</span>
                </div>
            </div>
        </div>
    );
}

// ─── University Card ──────────────────────────────────────────────────────────
function UniversityCard({ uni }: { uni: typeof universities[0] }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={styles.uniCard}>
            <div className={styles.uniCardTop}>
                <div
                    className={styles.uniAbbr}
                    style={{ fontSize: uni.shortName.length > 5 ? '7px' : uni.shortName.length > 4 ? '8px' : '10px' }}
                >
                    {uni.shortName}
                </div>
                <div className={styles.uniMeta}>
                    <h3 className={styles.uniName}>{uni.name}</h3>
                    <div className={styles.uniTags}>
                        <span className={styles.uniLocation}><MapPin size={11} /> {uni.location}</span>
                        <span className={styles.uniProvince}>{uni.province}</span>
                    </div>
                    <p className={styles.uniDesc}>{uni.description}</p>
                </div>
                <div className={styles.uniRight}>
                    <a href={uni.applyUrl} target="_blank" rel="noopener noreferrer" className={styles.applyBtn}>
                        Apply now <ExternalLink size={12} />
                    </a>
                    <a href={uni.website} target="_blank" rel="noopener noreferrer" className={styles.websiteBtn}>
                        Website <ExternalLink size={11} />
                    </a>
                </div>
            </div>

            {/* Countdown */}
            <CountdownTimer isoDate={uni.applicationCloseISO} />

            <div className={styles.uniInfo}>
                <div className={styles.infoItem}>
                    <Calendar size={13} className={styles.infoIcon} />
                    <div>
                        <div className={styles.infoLabel}>Applications open</div>
                        <div className={styles.infoValue}>{uni.applicationOpen}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <CalendarClock size={13} className={styles.infoIcon} style={{ color: '#993C1D' }} />
                    <div>
                        <div className={styles.infoLabel}>Closing date</div>
                        <div className={`${styles.infoValue} ${styles.infoDeadline}`}>{uni.applicationClose}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <Banknote size={13} className={styles.infoIcon} />
                    <div>
                        <div className={styles.infoLabel}>Application fee</div>
                        <div className={styles.infoValue}>{uni.applicationFee}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <GraduationCap size={13} className={styles.infoIcon} />
                    <div>
                        <div className={styles.infoLabel}>Min APS</div>
                        <div className={styles.infoValue}>{uni.minAps === 0 ? 'Open entry' : uni.minAps}</div>
                    </div>
                </div>
            </div>

            <button className={styles.expandBtn} onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Hide faculties' : `Show ${uni.faculties.length} faculties`}
                {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {expanded && (
                <div className={styles.faculties}>
                    {uni.faculties.map((f) => (
                        <span key={f} className={styles.facultyPill}>{f}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── College Card ─────────────────────────────────────────────────────────────
function CollegeCard({ college }: { college: typeof colleges[0] }) {
    return (
        <div className={styles.collegeCard}>
            <div className={styles.collegeTop}>
                <div className={styles.collegeIcon}><Building2 size={16} /></div>
                <div className={styles.collegeMeta}>
                    <h4 className={styles.collegeName}>{college.name}</h4>
                    <span className={styles.collegeLocation}>
                        <MapPin size={10} /> {college.location}
                    </span>
                </div>
                <a href={college.website} target="_blank" rel="noopener noreferrer" className={styles.collegeApplyBtn}>
                    Website <ExternalLink size={11} />
                </a>
            </div>
            
            <p className={styles.collegeDesc}>{college.description}</p>
           
            <div className={styles.collegeHighlights}>
                {college.highlights.map((highlight, idx) => (
                    <div key={idx} className={styles.highlightItem}>
                        <span className={styles.highlightBullet}>✓</span>
                        <span className={styles.highlightText}>{highlight}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type TabType = 'universities' | 'colleges';

export default function UniversitiesPage() {
    const [tab, setTab] = useState<TabType>('universities');
    const [search, setSearch] = useState('');
    const [province, setProvince] = useState('All');
    const [selectedProvince, setSelectedProvince] = useState('All');

    const filteredUnis = useMemo(() => {
        const q = search.toLowerCase();
        return universities.filter(u => {
            const matchSearch = !q || u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q) || u.location.toLowerCase().includes(q);
            const matchProvince = province === 'All' || u.province === province;
            return matchSearch && matchProvince;
        });
    }, [search, province]);

    const collegesByProvince = useMemo(() => {
        const q = search.toLowerCase();
        const filtered = colleges.filter(c => {
            const matchSearch = !q || c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
            const matchProvince = selectedProvince === 'All' || c.province === selectedProvince;
            return matchSearch && matchProvince;
        });
        const grouped: Record<string, typeof colleges> = {};
        filtered.forEach(c => {
            if (!grouped[c.province]) grouped[c.province] = [];
            grouped[c.province].push(c);
        });
        return grouped;
    }, [search, selectedProvince]);

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroTag}>
                        <span className={styles.heroTagDot} />
                        2027 applications
                    </div>
                    <h1 className={styles.heroTitle}>SA Universities & Colleges</h1>
                    <p className={styles.heroSub}>
                        Browse all {universities.length} public universities and {colleges.length}+ TVET colleges in South Africa. Find application dates, fees, faculties and apply directly.
                    </p>
                </div>
            </div>

            <div className={styles.inner}>
                <AdSlot size="leaderboard" />
                <ApsCalculator />

                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${tab === 'universities' ? styles.tabActive : ''}`} onClick={() => setTab('universities')}>
                        <GraduationCap size={15} /> Universities <span className={styles.tabCount}>{universities.length}</span>
                    </button>
                    <button className={`${styles.tab} ${tab === 'colleges' ? styles.tabActive : ''}`} onClick={() => setTab('colleges')}>
                        <Building2 size={15} /> TVET Colleges <span className={styles.tabCount}>{colleges.length}</span>
                    </button>
                </div>

                <div className={styles.filterBar}>
                    <div className={styles.searchWrap}>
                        <Search size={14} className={styles.searchIcon} />
                        <input className={styles.searchInput} placeholder={tab === 'universities' ? 'Search by name, abbreviation or city...' : 'Search colleges...'} value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className={styles.selectWrap}>
                        <MapPin size={13} className={styles.selectIcon} />
                        <select className={styles.select} value={tab === 'universities' ? province : selectedProvince} onChange={(e) => tab === 'universities' ? setProvince(e.target.value) : setSelectedProvince(e.target.value)}>
                            <option value="All">All provinces</option>
                            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                {tab === 'universities' && (
                    <div className={styles.uniList}>
                        {filteredUnis.length === 0 ? (
                            <div className={styles.empty}>No universities match your search.</div>
                        ) : (
                            filteredUnis.map((uni, i) => (
                                <div key={uni.id} style={{ animationDelay: `${i * 0.03}s` }} className="fade-up">
                                    <UniversityCard uni={uni} />
                                </div>
                            ))
                        )}
                    </div>
                )}

                {tab === 'colleges' && (
                    <div className={styles.collegeSection}>
                        {Object.keys(collegesByProvince).length === 0 ? (
                            <div className={styles.empty}>No colleges match your search.</div>
                        ) : (
                            Object.entries(collegesByProvince).sort(([a], [b]) => a.localeCompare(b)).map(([prov, provColleges]) => (
                                <div key={prov} className={styles.provinceGroup}>
                                    <div className={styles.provinceHeader}>
                                        <MapPin size={14} />
                                        <h2 className={styles.provinceTitle}>{prov}</h2>
                                        <span className={styles.provinceCount}>{provColleges.length} college{provColleges.length !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div className={styles.collegeGrid}>
                                        {provColleges.map(college => <CollegeCard key={college.id} college={college} />)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                <PrivateInstitutions />

                <div className={styles.scamWarning}>
                    <div className={styles.scamInner}>
                        <span className={styles.scamIcon}>⚠️</span>
                        <div>
                            <strong>Beware of Application & Registration Scams</strong>
                            <p>Only apply through official university or college websites. Never pay application or registration fees to individuals or via unofficial channels.</p>
                        </div>
                    </div>
                </div>

                <AdSlot size="leaderboard" />
            </div>
        </div>
    );
}