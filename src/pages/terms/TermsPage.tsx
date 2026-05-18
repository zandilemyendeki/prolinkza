import { FileText, Mail, ExternalLink } from 'lucide-react';
import styles from './TermsPage.module.css';

const lastUpdated = '29 April 2026';
const siteName = 'ProLink ZA';
const siteUrl = 'https://www.prolinkza.co.za';
const contactEmail = 'info@prolinkza.co.za';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of terms',
    content: `By accessing or using the ${siteName} website located at ${siteUrl} (the "Site"), you confirm that you have read, understood, and agree to be bound by these Terms of Use ("Terms") and our Privacy Policy.

If you do not agree to these Terms, you must immediately stop using the Site. These Terms apply to all visitors, users, and others who access or use the Site.

We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.`,
  },
  {
    id: 'description',
    title: '2. Description of service',
    content: `${siteName} is a free online resource hub designed to assist South African students and graduates with:

- Information about NSFAS (National Student Financial Aid Scheme) applications and updates
- Links to university and TVET college application portals
- Redirection to external job boards, bursary databases, and internship platforms
- Free CV and career tools including a resume builder, ATS checker, keyword optimizer, and cover letter generator
- General career guidance and resources for South African students

${siteName} does not post or advertise specific job vacancies directly. All job, bursary, and internship listings redirect users to external third-party platforms. We do not guarantee the accuracy, availability, or legitimacy of any external listing.`,
  },
  {
    id: 'use',
    title: '3. Permitted use',
    content: `You may use this Site for lawful, personal, and non-commercial purposes only. You agree that you will NOT:

- Use the Site in any way that violates applicable South African or international laws or regulations
- Attempt to gain unauthorised access to any part of the Site, its servers, or any connected systems
- Transmit any unsolicited or unauthorised advertising, spam, or promotional material
- Use automated tools, bots, scrapers, or data-mining software to extract content from the Site without our written permission
- Reproduce, duplicate, copy, sell, or exploit any portion of the Site without our express written consent
- Upload or transmit any malicious code, viruses, or harmful content
- Impersonate any person or entity or misrepresent your affiliation with any person or entity
- Collect or harvest personal data from other users of the Site`,
  },
  {
    id: 'external-links',
    title: '4. External links and third-party content',
    content: `The Site contains links to third-party websites, including job portals, university application systems, government platforms, and bursary databases. These links are provided for your convenience and informational purposes only.

${siteName}:
- Does not control, endorse, or take responsibility for the content, privacy practices, or terms of any third-party website
- Does not verify the accuracy or legitimacy of any job listing, bursary opportunity, or university information on external sites
- Is not responsible for any loss or damage arising from your use of or reliance on any external website or its content

We strongly encourage you to review the terms and privacy policies of any third-party website you visit. If you believe an external link on our Site leads to inappropriate or fraudulent content, please report it to us at ${contactEmail}.`,
  },
  {
    id: 'cv-tools',
    title: '5. CV and career tools',
    content: `${siteName} provides free CV and career tools including a resume builder, ATS checker, keyword optimizer, and cover letter generator. By using these tools, you acknowledge and agree that:

- The tools are provided "as is" and for informational and self-help purposes only
- We do not guarantee that use of our tools will result in successful job applications or employment
- Any CV or document you create using our tools is your responsibility, we are not liable for the content you create
- We do not store your CV data beyond your current session unless you explicitly save or export it
- The ATS scoring and keyword analysis features are based on general best practices and do not replicate any specific employer's system
- AI-generated cover letters are suggestions only, you are responsible for reviewing and editing any content before submitting it to employers`,
  },
  {
    id: 'adsense',
    title: '6. Advertising',
    content: `${siteName} displays advertisements through Google AdSense to help fund the free services we provide to students. By using the Site, you acknowledge that:

- Advertisements may appear on various pages of the Site
- We do not endorse the products or services advertised on our Site
- We are not responsible for the content of any advertisement
- Clicking on advertisements may take you to third-party websites subject to their own terms and privacy policies
- You can manage your ad personalisation preferences at https://adssettings.google.com

We do not allow advertisers to influence our editorial content. All information, guidance, and tools on the Site are provided independently of our advertising partners.`,
  },
  {
    id: 'intellectual-property',
    title: '7. Intellectual property',
    content: `All content on this Site including but not limited to text, graphics, logos, icons, images, page layouts, and software, is the property of ${siteName} or its content suppliers and is protected under South African and international copyright laws.

You may:
- View and print pages from the Site for your own personal, non-commercial use
- Share links to pages on the Site

You may NOT:
- Reproduce, republish, distribute, or sell any content from the Site without our prior written permission
- Use our brand name, logo, or visual identity without written consent
- Claim any content from this Site as your own

If you believe your copyright has been infringed upon by content on our Site, please contact us at ${contactEmail}.`,
  },
  {
    id: 'disclaimer',
    title: '8. Disclaimer of warranties',
    content: `The Site and all its content and services are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to:

- Warranties of merchantability or fitness for a particular purpose
- Warranties that the Site will be uninterrupted, error-free, or free of viruses or other harmful components
- Warranties regarding the accuracy, reliability, or completeness of any content on the Site

${siteName} makes no guarantee that:
- NSFAS information is current or complete - always verify with the official NSFAS portal at my.nsfas.org.za
- University application dates and fees are accurate - always verify directly with the institution
- Job, bursary, or internship opportunities listed on external platforms are legitimate, available, or still open`,
  },
  {
    id: 'liability',
    title: '9. Limitation of liability',
    content: `To the fullest extent permitted by South African law, ${siteName}, its owners, directors, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:

- Your use of or inability to use the Site
- Any errors or omissions in any content on the Site
- Unauthorised access to or use of our servers or any personal information stored therein
- Any bugs, viruses, or other harmful elements transmitted through the Site
- Your reliance on any information obtained through the Site
- The conduct or content of any third-party website linked from our Site

This limitation of liability applies regardless of the legal theory on which the claim is based and even if we have been advised of the possibility of such damages.`,
  },
  {
    id: 'scams',
    title: '10. Job scam warning',
    content: `${siteName} takes the safety of our users seriously. We remind all users:

- Never pay any fee to apply for a job, bursary, or internship. Legitimate employers do not charge application fees.
- Be cautious of job offers received via WhatsApp, SMS, or unofficial email addresses.
- Always verify a company's existence through official channels before sharing personal information.
- Government jobs are advertised through official portals such as dpsa.gov.za, be wary of unofficial recruitment agents.
- If you suspect a scam or fraudulent job listing, do not apply and report it to the South African Police Service (SAPS) or the Companies and Intellectual Property Commission (CIPC).

${siteName} is not liable for any financial loss or harm caused by fraudulent third-party listings.`,
  },
  {
    id: 'governing-law',
    title: '11. Governing law',
    content: `These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of South Africa, without regard to its conflict of law provisions.

Any disputes arising from or relating to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of South Africa.

If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining Terms remain in full force and effect.`,
  },
  {
    id: 'contact',
    title: '12. Contact us',
    content: `If you have any questions about these Terms of Use, please contact us:

Email: ${contactEmail}
Website: ${siteUrl}

We aim to respond to all enquiries within 5 business days.`,
  },
];

export default function TermsPage() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroIcon}><FileText size={24} /></div>
          <div>
            <h1 className={styles.heroTitle}>Terms of Use</h1>
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
            <a href="https://www.justice.gov.za" target="_blank" rel="noopener noreferrer" className={styles.tocContactLink}>
              <ExternalLink size={13} /> Dept. of Justice SA
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.content}>
          <div className={styles.intro}>
            <p>
              These Terms of Use govern your access to and use of <strong>{siteName}</strong>. By using this Site, you agree to these terms in full. Please read them carefully before proceeding.
            </p>
          </div>

          {sections.map((s) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.title}</h2>
              <div className={styles.sectionBody}>
                {s.content.split('\n\n').map((para, i) => {
                  const lines = para.split('\n');
                  const hasBullets = lines.some(l => l.startsWith('- '));
                  if (hasBullets) {
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
            <FileText size={14} />
            <p>
              These Terms of Use were last reviewed on {lastUpdated}. For legal enquiries, contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
        </main>

      </div>
    </div>
  );
}