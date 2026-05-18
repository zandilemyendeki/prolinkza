import { Check, TrendingUp, Target, Users, Zap, Mail } from 'lucide-react';
import styles from './AdvertisePage.module.css';

const packages = [
  {
    name: 'Display Advertising',
    price: 'From R3,500/month',
    desc: 'Get your brand in front of thousands of SA students actively looking for opportunities',
    features: [
      'Banner placements across the platform',
      'Targeted by province, field of study, or year level',
      'Monthly performance reports',
      'Minimum 50,000 impressions/month',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Featured Listings',
    price: 'From R1,200/listing',
    desc: 'Promote your bursaries, internships, or graduate programs at the top of search results',
    features: [
      'Appear above organic listings',
      'Highlighted with "Featured" badge',
      '30-day featured period',
      'Priority in email newsletters',
      'Dedicated listing page with your branding',
    ],
    cta: 'Feature a Listing',
    highlight: true,
  },
  {
    name: 'University Partnerships',
    price: 'Custom',
    desc: 'Dedicated pages, integration with your systems, and co-branded content',
    features: [
      'Custom university landing page',
      'API integration for applications',
      'Co-branded NSFAS guides and resources',
      'Exclusive webinars and events',
    ],
    cta: 'Partner With Us',
    highlight: false,
  },
];

const stats = [
  { number: '200k+', label: 'New Students Annually' },
  { number: '85%', label: 'University/College Students' },
  { number: '65%', label: 'Looking for Bursaries' },
  { number: '45%', label: 'Seeking Internships' },
];

const reasons = [
  {
    icon: Target,
    title: 'Reach the Right Audience',
    desc: 'Our users are actively searching for opportunities - no passive browsing.',
  },
  {
    icon: TrendingUp,
    title: 'Cost-Effective',
    desc: 'Get in front of thousands of qualified students at a fraction of the cost of traditional job boards.',
  },
  {
    icon: Users,
    title: 'High-Quality Candidates',
    desc: 'Students who use ProLink ZA are motivated, prepared, and ready to work. Our CV tools ensure they apply professionally.',
  },
  {
    icon: Zap,
    title: 'Fast Setup',
    desc: 'Post a listing or launch a campaign in under 24 hours. No lengthy contracts or complicated approval processes.',
  },
];

export default function AdvertisePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Reach 120,000+ SA students actively looking for opportunities
          </h1>
          <p className={styles.heroSub}>
            Connect with motivated students across South Africa who are searching for bursaries, internships, 
            and graduate programs. ProLink ZA is where talent meets opportunity.
          </p>
          <a href="#packages" className={styles.heroCta}>
            View Packages
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        {/* Why Advertise */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Why Advertise on ProLink ZA?</h2>
              <p className={styles.sectionSub}>
                We're not just another job board - we're a career hub built specifically for SA students
              </p>
            </div>

            <div className={styles.reasonsGrid}>
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className={styles.reasonCard}>
                    <div className={styles.reasonIcon}>
                      <Icon size={24} />
                    </div>
                    <h3 className={styles.reasonTitle}>{reason.title}</h3>
                    <p className={styles.reasonDesc}>{reason.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className={styles.section} id="packages">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Advertising Packages</h2>
              <p className={styles.sectionSub}>
                Flexible options to fit your budget and goals
              </p>
            </div>

            <div className={styles.packagesGrid}>
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`${styles.packageCard} ${pkg.highlight ? styles.packageHighlight : ''}`}
                >
                  {pkg.highlight && <div className={styles.packageBadge}>Most Popular</div>}
                  <div className={styles.packageHeader}>
                    <h3 className={styles.packageName}>{pkg.name}</h3>
                    <div className={styles.packagePrice}>{pkg.price}</div>
                    <p className={styles.packageDesc}>{pkg.desc}</p>
                  </div>
                  <div className={styles.packageFeatures}>
                    {pkg.features.map((feature) => (
                      <div key={feature} className={styles.packageFeature}>
                        <Check size={16} className={styles.featureCheck} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`mailto:info@prolinkza.co.za?subject=${encodeURIComponent(pkg.name + ' Inquiry')}`}
                    className={pkg.highlight ? styles.packageCtaPrimary : styles.packageCta}
                  >
                    {pkg.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className={styles.sectionAlt}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Who We Work With</h2>
            </div>

            <div className={styles.clientsGrid}>
              <div className={styles.clientCard}>
                <h3 className={styles.clientTitle}>🏢 Companies</h3>
                <p className={styles.clientDesc}>
                  Recruit top talent for internships, graduate programs, and entry-level roles. 
                  Reach students from all universities across South Africa.
                </p>
              </div>

              <div className={styles.clientCard}>
                <h3 className={styles.clientTitle}>🎓 Universities</h3>
                <p className={styles.clientDesc}>
                  Promote your programs, bursaries, and student support services to prospective 
                  and current students nationwide.
                </p>
              </div>

              <div className={styles.clientCard}>
                <h3 className={styles.clientTitle}>🏛️ Government & NGOs</h3>
                <p className={styles.clientDesc}>
                  Share public sector opportunities, skills development programs, and youth 
                  employment initiatives with engaged students.
                </p>
              </div>

              <div className={styles.clientCard}>
                <h3 className={styles.clientTitle}>💼 Recruitment Agencies</h3>
                <p className={styles.clientDesc}>
                  Fill graduate and entry-level positions faster by accessing a pool of 
                  motivated, application-ready students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaIcon}>
              <Mail size={32} />
            </div>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaSub}>
              Let's discuss how ProLink ZA can help you reach your recruitment goals. 
              We'll respond within 24 hours.
            </p>
            <div className={styles.ctaButtons}>
              <a href="mailto:info@prolinkza.co.za" className={styles.ctaBtn}>
                Email Us: info@prolinkza.co.za
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}