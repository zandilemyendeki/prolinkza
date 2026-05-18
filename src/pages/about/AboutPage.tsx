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
            We're on a mission to help every SA student launch their career
          </h1>
          <p className={styles.heroSub}>
            ProLink ZA was built by students who struggled to find opportunities scattered across hundreds of websites.
            We knew there had to be a better way, one free platform where South African students could find everything they need.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        {/* Mission */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.missionGrid}>
              <div className={styles.missionText}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.sectionDesc}>
                  To democratize access to career opportunities for South African students, regardless of their background,
                  location, or university. Every student deserves a fair shot at building their future.
                </p>
                <p className={styles.sectionDesc}>
                  We aggregate bursaries, internships, and graduate programs from across South Africa and pair them with
                  free tools to help students apply with confidence. No paywalls. No hidden fees. Just opportunities.
                </p>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>100%</div>
                  <div className={styles.statLabel}>Free Forever</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>26</div>
                  <div className={styles.statLabel}>Universities Listed</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>TVET Colleges</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>9</div>
                  <div className={styles.statLabel}>Provinces Covered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>What We Stand For</h2>
              <p className={styles.sectionSub}>The principles that guide everything we do</p>
            </div>

            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Heart size={24} />
                </div>
                <h3 className={styles.valueTitle}>Students First</h3>
                <p className={styles.valueDesc}>
                  Every decision we make starts with asking: "Does this help students?"
                  We're advocates, not gatekeepers.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Zap size={24} />
                </div>
                <h3 className={styles.valueTitle}>Radically Free</h3>
                <p className={styles.valueDesc}>
                  No premium tiers, no freemium tricks. Every tool, every listing, every resource
                  is completely free for students.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Target size={24} />
                </div>
                <h3 className={styles.valueTitle}>Built for SA</h3>
                <p className={styles.valueDesc}>
                  From NSFAS updates to SA-specific CV formats, we understand the unique challenges
                  South African students face.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <TrendingUp size={24} />
                </div>
                <h3 className={styles.valueTitle}>Always Improving</h3>
                <p className={styles.valueDesc}>
                  We ship updates every week based on student feedback. If something's broken or missing,
                  we want to know.
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
                  South Africa has one of the highest youth unemployment rates in the world. Talented students
                  miss out on opportunities simply because they didn't know they existed or couldn't afford
                  professional CV services.
                </p>
                <p className={styles.whyText}>
                  Meanwhile, companies struggle to find qualified candidates because their opportunities are
                  buried on corporate websites or hidden behind expensive job boards.
                </p>
                <p className={styles.whyText}>
                  ProLink ZA bridges that gap. We make it easy for students to discover opportunities and for
                  organizations to reach the right talent - all at zero cost.
                </p>
              </div>
              <div className={styles.whyStats}>
                <div className={styles.whyStatCard}>
                  <p className={styles.whyStatBig}>60.90%</p>
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

        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>How We Keep It Free</h2>
              <p className={styles.sectionSub}>Transparency is important to us</p>
            </div>

            <div className={styles.howGrid}>
              <div className={styles.howCard}>
                <div className={styles.howNumber}>1</div>
                <h3 className={styles.howTitle}>Display Advertising</h3>
                <p className={styles.howDesc}>
                  We show non-intrusive ads from relevant brands. They help keep the lights on while keeping
                  the platform free for students.
                </p>
              </div>

              <div className={styles.howCard}>
                <div className={styles.howNumber}>2</div>
                <h3 className={styles.howTitle}>Featured Listings</h3>
                <p className={styles.howDesc}>
                  Companies can pay to feature their opportunities at the top of search results.
                  All listings are clearly marked as "Featured."
                </p>
              </div>

              <div className={styles.howCard}>
                <div className={styles.howNumber}>3</div>
                <h3 className={styles.howTitle}>What We Don't Do</h3>
                <p className={styles.howDesc}>
                  We don't sell student data. We don't charge students to apply. We don't hide listings behind paywalls.
                  We don't gate CV downloads.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaIcon}>
              <Mail size={32} />
            </div>
            <h2 className={styles.ctaTitle}>Get in Touch</h2>
            <p className={styles.ctaSub}>
              Have feedback? Found a bug? Want to partner with us? We'd love to hear from you.
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