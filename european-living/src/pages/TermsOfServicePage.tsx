// src/pages/TermsOfServicePage.tsx

import SEO from '../components/SEO';

export default function TermsOfServicePage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for European Living — the independent resource for US military families and American expats in Europe."
        noIndex={false}
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">
        <div className="max-w-2xl mx-auto px-4 py-12">

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--brand-secondary)] mb-3">
              Legal
            </span>
            <h1 className="text-3xl font-bold text-[var(--brand-primary-dark)] mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-[var(--brand-text-muted)]">
              Effective date: June 2026 · Last updated: June 2026
            </p>
          </div>

          <div className="space-y-8 text-sm text-[var(--brand-text)] leading-relaxed">

            {/* Intro */}
            <section>
              <p>
                Welcome to European Living (<strong>european-living.live</strong>).
                By accessing or using this website, you agree to be bound by
                these Terms of Service. If you do not agree, please do not use
                the site.
              </p>
              <p className="mt-3 text-[var(--brand-text-muted)]">
                European Living is operated by Terrell C Lombardi, Sindelfingen,
                Germany ("we", "us", "our"). The site is an independent
                information resource for US military families and American expats
                living in or moving to Europe.
              </p>
              <p className="mt-3 text-[var(--brand-text-muted)]">
                This site is intended for use by individuals who are at least
                18 years of age, or the age of legal majority in their
                jurisdiction. By using the site or submitting content, you
                represent that you meet this requirement.
              </p>
            </section>

            {/* 1 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                1. Use of the Site
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                You may use European Living for personal, non-commercial purposes.
                You agree not to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <li>Reproduce, copy, or redistribute site content without written permission</li>
                <li>Use the site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the site or its infrastructure</li>
                <li>Submit false, misleading, or fraudulent business listings or reviews</li>
                <li>Impersonate any person, business, or military organization</li>
              </ul>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                2. Information Accuracy
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                European Living provides general guidance for informational
                purposes only. We make reasonable efforts to keep content
                accurate and current, but we make no warranties — express or
                implied — regarding the completeness, accuracy, or fitness for
                a particular purpose of any information on this site.
              </p>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                Military regulations, SOFA provisions, German laws, housing
                allowances, and official procedures change regularly. Always
                verify critical information with your unit, installation legal
                office, or the relevant official authority before making
                decisions.
              </p>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                European Living is not affiliated with the U.S. Department of
                Defense, the U.S. Army, USAREUR-AF, or any U.S. government
                agency. Nothing on this site constitutes legal, financial,
                medical, or official military advice.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                3. Business Listings
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                Businesses listed in the European Living Services Directory are
                included for informational purposes. Inclusion does not
                constitute an endorsement, recommendation, or guarantee of
                quality. We reserve the right to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <li>Accept or decline any business submission at our sole discretion</li>
                <li>Remove any listing at any time without notice or explanation</li>
                <li>Edit submitted listing information for accuracy, clarity, or appropriateness</li>
                <li>Mark listings as unverified, verified, or sponsored as appropriate</li>
              </ul>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                Businesses submitting listings represent that all information
                provided is accurate and that they have the legal right to offer
                the services described. Fraudulent submissions may be reported
                to relevant authorities.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                4. User-Submitted Content
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                By submitting any content to European Living — including business
                listings, reviews, or contact form messages — you grant us a
                non-exclusive, royalty-free, worldwide license to use, display,
                and distribute that content in connection with the operation of
                the site.
              </p>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                You are solely responsible for content you submit. You agree not
                to submit content that is defamatory, fraudulent, harassing,
                unlawful, or that infringes on the rights of any third party.
              </p>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                We reserve the right, but are not obligated, to review, edit,
                refuse, or remove any submitted content at our sole discretion,
                and to suspend or restrict access to the site for users who
                violate these Terms.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                5. Third-Party Links
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                European Living contains links to external websites including
                official U.S. government sites, German government sites,
                and third-party businesses. These links are provided for
                convenience only. We have no control over and assume no
                responsibility for the content, privacy policies, or practices
                of any third-party sites.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                6. Intellectual Property
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                All original content on European Living — including articles,
                guides, graphics, and the site's design — is the property of
                Terrell C Lombardi and is protected by applicable copyright law.
                Unauthorized reproduction, distribution, or commercial use of
                any content is prohibited without prior written permission.
              </p>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                The European Living name, logo, and brand identity may not be
                used without express written permission.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                7. Limitation of Liability
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                To the fullest extent permitted by applicable law, European
                Living and its operator shall not be liable for any direct,
                indirect, incidental, consequential, or punitive damages arising
                from your use of — or inability to use — this site or any
                content, service, or information obtained through it.
              </p>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                This includes but is not limited to damages arising from reliance
                on business listings, article content, PCS guidance, or any
                external links provided on the site.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                8. Privacy
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                Your use of European Living is also governed by our{' '}
                <a
                  href="/privacy-policy"
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  Privacy Policy
                </a>
                , which is incorporated into these Terms by reference. By using
                the site you consent to the data practices described in the
                Privacy Policy.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                9. Governing Law
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                These Terms are governed by the laws of the Federal Republic of
                Germany. Any disputes arising under these Terms shall be subject
                to the exclusive jurisdiction of the courts of Baden-Württemberg,
                Germany, unless mandatory consumer protection laws in your
                jurisdiction provide otherwise.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                10. Changes to These Terms
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                We reserve the right to update these Terms at any time. Changes
                will be posted on this page with an updated effective date.
                Continued use of the site after changes are posted constitutes
                acceptance of the revised Terms.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                11. Contact
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                Questions about these Terms can be directed to:
              </p>
              <div className="mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <p>Terrell C Lombardi</p>
                <p>Untere Burggasse 4, 71063 Sindelfingen, Deutschland</p>
                <p>
                  <a
                    href="mailto:info@european-living.live"
                    className="text-[var(--brand-primary)] hover:underline"
                  >
                    info@european-living.live
                  </a>
                </p>
              </div>
            </section>

          </div>

          {/* Footer note */}
          <div className="mt-10 pt-6 border-t border-[var(--brand-border)]">
            <p className="text-xs text-[var(--brand-text-muted)]">
              Effective date: June 2026 · Last updated: June 2026
            </p>
            <div className="flex gap-4 mt-3 text-xs">
              <a href="/privacy-policy" className="text-[var(--brand-primary)] hover:underline">
                Privacy Policy
              </a>
              <a href="/impressum" className="text-[var(--brand-primary)] hover:underline">
                Impressum
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}