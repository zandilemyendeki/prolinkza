import { Shield, Mail, ExternalLink } from 'lucide-react';
import styles from './PrivacyPage.module.css';

const lastUpdated = '29 April 2026';
const siteName = 'ProLink ZA';
const siteUrl = 'https://www.prolinkza.co.za';
const contactEmail = 'info@prolinkza.co.za';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `Welcome to ${siteName} ("we", "our", or "us"). We operate the website ${siteUrl} (the "Site"), a free student career resource hub for South African students.

We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. Please read this document carefully. If you do not agree with the terms of this policy, please discontinue use of our Site.`,
  },
  {
    id: 'information-we-collect',
    title: '2. Information we collect',
    content: `We collect information that you voluntarily provide to us and information that is automatically collected when you use our Site.

**Information you provide:**
- Contact information such as your name and email address, if you contact us directly via email or a contact form.
- Feedback or correspondence you send us.

**Information collected automatically:**
- Log data such as your IP address, browser type, pages visited, time spent on pages, and referring URLs.
- Device information including your operating system and screen resolution.
- Cookie data and similar tracking technologies (see Section 5 for more detail).

**Information we do NOT collect:**
- We do not collect your South African ID number, banking details, passwords, or any sensitive financial information.
- We do not require account registration to use the Site.
- We do not collect information from children under 13 years of age knowingly.`,
  },
  {
    id: 'how-we-use',
    title: '3. How we use your information',
    content: `We use the information we collect for the following purposes:

- **To operate and improve the Site** - understanding how users navigate the Site helps us improve content and user experience.
- **To respond to your enquiries** - if you contact us, we use your contact details to respond.
- **To serve advertisements** - we use Google AdSense to display advertisements. Google may use cookies and data to personalise ads shown to you (see Section 5).
- **To comply with legal obligations** - we may process your information where required by South African law, including the Protection of Personal Information Act (POPIA).
- **Analytics** - we use anonymised analytics to understand traffic patterns and improve our content.

We do not sell, rent, or trade your personal information to third parties for their marketing purposes.`,
  },
  {
    id: 'third-party-links',
    title: '4. Third-party websites and links',
    content: `Our Site contains links to external websites, including:
- Official university and college application portals
- Job boards such as Indeed SA, CareerJunction, PNet, and others
- Government platforms such as DPSA, NSFAS, and SAYouth.mobi
- Bursary databases and graduate portals

When you click on an external link, you leave our Site and are subject to the privacy policy and terms of that external website. We are not responsible for the privacy practices or content of any third-party sites. We encourage you to review the privacy policies of every website you visit.

${siteName} does not post, verify, or endorse specific job listings. All opportunities displayed on our Opportunities page redirect to external platforms.`,
  },
  {
    id: 'cookies',
    title: '5. Cookies and advertising',
    content: `We use cookies and similar technologies to operate and improve the Site, and to serve relevant advertisements.

**What are cookies?**
Cookies are small text files placed on your device by a website. They are widely used to make websites work, or to work more efficiently, and to provide information to website owners.

**Cookies we use:**
- **Essential cookies** - required for the Site to function correctly.
- **Analytics cookies** - used to collect anonymised data about how visitors use the Site (e.g. Google Analytics).
- **Advertising cookies** - used by Google AdSense to serve personalised or contextual advertisements.

**Google AdSense:**
We use Google AdSense to display ads on our Site. Google and its partners may use cookies to serve ads based on your prior visits to our Site or other websites. You can opt out of personalised advertising by visiting Google's Ads Settings at https://adssettings.google.com or by visiting aboutads.info.

**Managing cookies:**
You can control and delete cookies through your browser settings. Please note that disabling cookies may affect the functionality of this Site and others you visit.`,
  },
  {
    id: 'popia',
    title: '6. Your rights under POPIA',
    content: `South Africa's Protection of Personal Information Act (POPIA) grants you the following rights regarding your personal information:

- **Right to access** - you may request a copy of the personal information we hold about you.
- **Right to correction** - you may request that we correct inaccurate or incomplete information.
- **Right to deletion** - you may request that we delete your personal information, subject to legal obligations.
- **Right to object** - you may object to the processing of your personal information in certain circumstances.
- **Right to complain** - you have the right to lodge a complaint with the Information Regulator of South Africa if you believe your rights have been violated.

**Information Regulator contact details:**
JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001
Email: inforeg@justice.gov.za
Website: www.inforegulator.org.za

To exercise any of your rights, please contact us at ${contactEmail}.`,
  },
  {
    id: 'data-security',
    title: '7. Data security',
    content: `We implement reasonable technical and organisational measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction.

However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.

We recommend that you:
- Never share sensitive personal information (such as ID numbers or banking details) through our Site or any site you are not certain is legitimate.
- Report any suspected security vulnerabilities to us at ${contactEmail}.`,
  },
  {
    id: 'children',
    title: '8. Children\'s privacy',
    content: `Our Site is intended for students and young adults, including those who may be under 18. However, we do not knowingly collect personal information from children under 13 years of age without parental consent.

If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us at ${contactEmail} and we will take steps to delete that information.

Parents are encouraged to monitor their children's internet usage and to help enforce this Privacy Policy by instructing their children not to provide personal information on our Site without parental permission.`,
  },
  {
    id: 'changes',
    title: '9. Changes to this policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last updated" date at the top of this page.

We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of the Site after any changes to this Privacy Policy constitutes your acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: '10. Contact us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or the personal information we hold about you, please contact us:

Email: ${contactEmail}
Website: ${siteUrl}

We will respond to all legitimate requests within a reasonable timeframe, and in any event within 30 days as required by POPIA.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroIcon}><Shield size={24} /></div>
          <div>
            <h1 className={styles.heroTitle}>Privacy Policy</h1>
            <p className={styles.heroMeta}>Last updated: {lastUpdated} · Applies to {siteUrl}</p>
          </div>
        </div>
      </div>

      <div className={styles.layout}>

        {/* Table of contents */}
        <aside className={styles.toc}>
          <div className={styles.tocTitle}>Contents</div>
          <nav className={styles.tocNav}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={styles.tocLink}>
                {s.title}
              </a>
            ))}
          </nav>

          <div className={styles.tocContact}>
            <div className={styles.tocContactTitle}>Questions?</div>
            <a href={`mailto:${contactEmail}`} className={styles.tocContactLink}>
              <Mail size={13} /> {contactEmail}
            </a>
            <a href="https://www.inforegulator.org.za" target="_blank" rel="noopener noreferrer" className={styles.tocContactLink}>
              <ExternalLink size={13} /> Information Regulator SA
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.content}>
          <div className={styles.intro}>
            <p>
              This Privacy Policy describes how <strong>{siteName}</strong> collects, uses, and protects information about users of our website. We are committed to complying with the <strong>Protection of Personal Information Act (POPIA)</strong> of South Africa.
            </p>
          </div>

          {sections.map((s) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.title}</h2>
              <div className={styles.sectionBody}>
                {s.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.includes(':**')) {
                    // It's a sub-heading paragraph
                    const parts = para.split('\n').map((line, j) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={j} className={styles.subHeading}>{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('- **')) {
                        const match = line.match(/^- \*\*(.+?)\*\* - (.+)$/);
                        if (match) {
                          return (
                            <div key={j} className={styles.bulletBold}>
                              <span className={styles.bulletLabel}>{match[1]}</span>
                              <span> - {match[2]}</span>
                            </div>
                          );
                        }
                      }
                      if (line.startsWith('- ')) {
                        return <div key={j} className={styles.bullet}>• {line.slice(2)}</div>;
                      }
                      if (line.trim() === '') return null;
                      return <p key={j} className={styles.para}>{line}</p>;
                    });
                    return <div key={i}>{parts}</div>;
                  }
                  // Check for bullet list
                  if (para.includes('\n- ') || para.startsWith('- ')) {
                    const lines = para.split('\n');
                    return (
                      <div key={i}>
                        {lines.map((line, j) => {
                          if (line.startsWith('- **')) {
                            const match = line.match(/^- \*\*(.+?)\*\* - (.+)$/);
                            if (match) {
                              return (
                                <div key={j} className={styles.bulletBold}>
                                  <strong>{match[1]}</strong> - {match[2]}
                                </div>
                              );
                            }
                          }
                          if (line.startsWith('- ')) return <div key={j} className={styles.bullet}>• {line.slice(2)}</div>;
                          if (line.startsWith('**') && line.endsWith('**')) return <p key={j} className={styles.subHeading}>{line.replace(/\*\*/g, '')}</p>;
                          if (line.trim() === '') return null;
                          return <p key={j} className={styles.para}>{line}</p>;
                        })}
                      </div>
                    );
                  }
                  return <p key={i} className={styles.para}>{para}</p>;
                })}
              </div>
            </section>
          ))}

          <div className={styles.footer}>
            <Shield size={14} />
            <p>
              This policy is governed by the laws of the Republic of South Africa. For any privacy-related enquiries, contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
        </main>

      </div>
    </div>
  );
}