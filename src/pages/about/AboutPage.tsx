import { Link } from 'react-router-dom';
import { Target, Heart, Zap, TrendingUp, Mail } from 'lucide-react';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroTag}>Our Story</span>
          <h1 className={styles.heroTitle}>
            Built by a South African student, for South African students
          </h1>
          <p className={styles.heroSub}>
            My name is Zandile. I grew up in the Eastern Cape, studied BSc Computer Science, then Honour's degree
            and went on to complete my Master's degree in Computer Science. But before any of that, I was a matric
            student with no idea how to find bursaries, no career guidance at school, and no one
            in my family who had navigated university before me. ProLink ZA exists because of that
            experience and because I know millions of South African students are still living it.
          </p>
        </div>
      </div>

      <div className={styles.content}>

        {/* My Story */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.storyGrid}>
              <div className={styles.storyText}>
                <h2 className={styles.sectionTitle}>My Story</h2>
                <p className={styles.sectionDesc}>
                  Growing up in the Eastern Cape, I was the first in my family to go to university.
                  There was no roadmap. No one to tell me about bursaries, or how NSFAS worked, or
                  what an APS score meant. I spent countless late nights Googling, clicking through
                  outdated websites and dead links, trying to piece together information that should
                  have been easy to find.
                </p>
                <p className={styles.sectionDesc}>
                  I missed bursary deadlines I did not know existed. I applied for programmes without
                  fully understanding what they were looking for. I built my first CV by guessing,
                  no template, no guidance, no understanding of what an ATS system was. I got it
                  wrong more than once.
                </p>
                <p className={styles.sectionDesc}>
                  I was fortunate enough to push through. I completed my BSc in Computer Science and
                  went on to finish my Master's degree. But as I progressed, I kept meeting students
                  who were just as capable as me, smarter in many ways - who were falling through
                  the cracks simply because they did not have access to the right information at the
                  right time.
                </p>
                <p className={styles.sectionDesc}>
                  That stayed with me. When I had the skills to build something about it, I did.
                  ProLink ZA started as a personal project, a simple collection of links and notes
                  I kept for students I was helping informally. Over time it grew into the platform
                  you see today, built properly, with every feature coming from a real student need.
                </p>
                <p className={styles.sectionDesc}>
                  The APS calculator exists because students were calculating it wrong. The NSFAS
                  guides exist because the official information is scattered and confusing. The CV
                  tools exist because professional CV services cost money most students do not have.
                  This site will always be free. That is non-negotiable.
                </p>
              </div>

              <div className={styles.storyAside}>
                <div className={styles.founderCard}>
                  <div className={styles.founderAvatar}>Z</div>
                  <div className={styles.founderName}>Zandile Myendeki</div>
                  <div className={styles.founderRole}>Founder, ProLink ZA</div>
                  <div className={styles.founderDetails}>
                    <div className={styles.founderDetail}>
                      <span className={styles.founderLabel}>From</span>
                      <span>Eastern Cape, South Africa</span>
                    </div>
                    <div className={styles.founderDetail}>
                      <span className={styles.founderLabel}>Education</span>
                      <span>BSc Computer Science · Honour's degree · Master's degree</span>
                    </div>
                    <div className={styles.founderDetail}>
                      <span className={styles.founderLabel}>Built</span>
                      <span>ProLink ZA - 2026</span>
                    </div>
                  </div>
                  <a href="mailto:zandile.myendeki@prolinkza.co.za" className={styles.founderEmail}>
                    <Mail size={13} /> zandile.myendeki@prolinkza.co.za
                  </a>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.stat}>
                    <div className={styles.statNumber}>100%</div>
                    <div className={styles.statLabel}>Free forever</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statNumber}>26</div>
                    <div className={styles.statLabel}>Universities listed</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statNumber}>50+</div>
                    <div className={styles.statLabel}>TVET colleges</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statNumber}>9</div>
                    <div className={styles.statLabel}>Provinces covered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className={styles.sectionAlt}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.sectionSub}>
                To make career information and tools equally accessible to every South African student,
                regardless of which province they are from, which school they attended, or what their
                family background is.
              </p>
            </div>
            <div className={styles.missionPoints}>
              <div className={styles.missionPoint}>
                <div className={styles.missionDot} />
                <p>Every student deserves to know about NSFAS, bursaries and university application, not just those with access to good schools and reliable internet.</p>
              </div>
              <div className={styles.missionPoint}>
                <div className={styles.missionDot} />
                <p>A professional CV should not cost money. Students who cannot afford CV services should not be disadvantaged when applying for jobs and opportunities.</p>
              </div>
              <div className={styles.missionPoint}>
                <div className={styles.missionDot} />
                <p>Career guidance should be available in one place, in plain language, updated regularly, and completely free, without requiring a login or a credit card.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>What We Stand For</h2>
              <p className={styles.sectionSub}>The principles that guide every decision we make</p>
            </div>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><Heart size={22} /></div>
                <h3 className={styles.valueTitle}>Students First</h3>
                <p className={styles.valueDesc}>
                  Every feature, every page and every update starts with one question: does this
                  genuinely help a student? We are advocates, not gatekeepers.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><Zap size={22} /></div>
                <h3 className={styles.valueTitle}>Radically Free</h3>
                <p className={styles.valueDesc}>
                  No premium tiers, no freemium tricks, no paywalls. Every tool, every listing
                  and every resource on this site is completely free for students - always.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><Target size={22} /></div>
                <h3 className={styles.valueTitle}>Built for SA</h3>
                <p className={styles.valueDesc}>
                  From NSFAS updates to SA-specific CV formats and APS calculators, we understand
                  the unique challenges South African students face because we lived them.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}><TrendingUp size={22} /></div>
                <h3 className={styles.valueTitle}>Always Improving</h3>
                <p className={styles.valueDesc}>
                  We update the site regularly based on student feedback. If something is broken,
                  missing or confusing, we want to hear about it and we will fix it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className={styles.sectionAlt}>
          <div className={styles.sectionInner}>
            <div className={styles.whyGrid}>
              <div>
                <h2 className={styles.sectionTitle}>Why This Matters</h2>
                <p className={styles.whyText}>
                  South Africa has one of the highest youth unemployment rates in the world, 
                  sitting at <strong>60.9% in the first quarter of 2026</strong>. Behind that
                  number are real people: graduates who could not find work, students who missed
                  bursary deadlines, young people who gave up because no one showed them where
                  to start.
                </p>
                <p className={styles.whyText}>
                  The information gap is real. Opportunities exist - bursaries, internships,
                  graduate programmes, but they are scattered across hundreds of corporate
                  websites, government portals and social media pages. Students from
                  under-resourced backgrounds, who often need these opportunities the most,
                  are the least likely to find them.
                </p>
                <p className={styles.whyText}>
                  ProLink ZA will not solve youth unemployment on its own. But if this platform
                  helps one student find a bursary they would have missed, or build a CV that
                  gets them an interview, or understand their NSFAS application in time -
                  that is worth it.
                </p>
              </div>
              <div className={styles.whyStats}>
                <div className={styles.whyStatCard}>
                  <p className={styles.whyStatBig}>60.9%</p>
                  <p className={styles.whyStatLabel}>Youth unemployment in SA (Q1 2026)</p>
                </div>
                <div className={styles.whyStatCard}>
                  <p className={styles.whyStatBig}>1 in 3</p>
                  <p className={styles.whyStatLabel}>Graduates unemployed 1 year after finishing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How we keep it free */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>How We Keep It Free</h2>
              <p className={styles.sectionSub}>We believe in being transparent about how the site is funded</p>
            </div>
            <div className={styles.howGrid}>
              <div className={styles.howCard}>
                <div className={styles.howNumber}>1</div>
                <h3 className={styles.howTitle}>Display Advertising</h3>
                <p className={styles.howDesc}>
                  We display non-intrusive advertisements through Google AdSense. These ads are
                  relevant, clearly labelled, and allow us to keep all student-facing tools and
                  content completely free.
                </p>
              </div>
              <div className={styles.howCard}>
                <div className={styles.howNumber}>2</div>
                <h3 className={styles.howTitle}>Featured Listings</h3>
                <p className={styles.howDesc}>
                  Companies and institutions can pay to feature their opportunities prominently
                  on the platform. All paid placements are clearly marked as "Featured" so
                  students always know what they are looking at.
                </p>
              </div>
              <div className={styles.howCard}>
                <div className={styles.howNumber}>3</div>
                <h3 className={styles.howTitle}>What We Will Never Do</h3>
                <p className={styles.howDesc}>
                  We will never sell student data. We will never charge students to apply for
                  opportunities. We will never hide CV downloads behind a paywall. Those things
                  are off the table - permanently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaIcon}><Mail size={28} /></div>
            <h2 className={styles.ctaTitle}>Get in Touch</h2>
            <p className={styles.ctaSub}>
              Have feedback? Found outdated information? Want to partner with us or feature an
              opportunity on ProLink ZA? We read every message.
            </p>
            <div className={styles.ctaButtons}>
              <a href="mailto:zandile.myendeki@prolinkza.co.za" className={styles.ctaBtn}>
                Email Us
              </a>
              <Link to="/advertise" className={styles.ctaBtnSecondary}>
                Partner With Us
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}