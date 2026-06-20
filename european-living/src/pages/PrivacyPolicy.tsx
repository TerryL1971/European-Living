// src/pages/PrivacyPolicy.tsx
// GDPR-compliant privacy policy. Styled to match ImpressumPage.tsx and
// TermsOfServicePage.tsx for visual consistency across legal pages.

import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for European Living — how we collect, use, and protect your data, including GDPR rights for EU users."
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
              Privacy Policy
            </h1>
            <p className="text-sm text-[var(--brand-text-muted)]">
              Effective date: June 2026 · Last updated: June 2026
            </p>
          </div>

          <div className="space-y-8 text-sm text-[var(--brand-text)] leading-relaxed">

            {/* Intro */}
            <section>
              <p className="text-[var(--brand-text-muted)]">
                European Living (<strong>european-living.live</strong>) is
                operated by Terrell C Lombardi, Untere Burggasse 4, 71063
                Sindelfingen, Germany ("we", "us", "our"). This Privacy Policy
                explains what personal data we collect, why we collect it, who
                we share it with, and the rights you have over it — including
                rights under the EU General Data Protection Regulation (GDPR).
              </p>
            </section>

            {/* 1. Data we collect */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                1. Information We Collect
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                We collect information you provide directly to us, including
                when you:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <li>Select your military base or location preference</li>
                <li>Submit a business listing through the Submit Your Business form</li>
                <li>Contact us through the contact form, email, or WhatsApp</li>
                <li>Sign up for travel tips or email updates</li>
              </ul>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                We also automatically collect limited technical information
                when you visit the site, such as your IP address (anonymized),
                browser type, device type, and pages visited, via Google
                Analytics (see Section 3).
              </p>
            </section>

            {/* 2. Who we share data with */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                2. Service Providers Who Process Your Data
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                We use the following third-party service providers to operate
                the site. Each processes data on our behalf under their own
                privacy and security terms:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-[var(--brand-text-muted)]">
                <li>
                  <strong>Supabase</strong> — database and image storage for
                  site content and business listings.
                </li>
                <li>
                  <strong>Vercel</strong> — website hosting and content delivery.
                </li>
                <li>
                  <strong>Formspree</strong> — processes contact form
                  submissions and forwards them to our email.
                </li>
                <li>
                  <strong>Google Analytics (GA4)</strong> — anonymized website
                  usage analytics. See Section 3 for details.
                </li>
                <li>
                  <strong>Sentry</strong> — error monitoring to help us identify
                  and fix technical issues. Sentry may incidentally log
                  technical data (browser, URL) at the time of an error.
                </li>
                <li>
                  <strong>ImprovMX</strong> — forwards email sent to our
                  info@european-living.live address to our personal inbox.
                </li>
              </ul>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                We do not sell your personal data to any third party. Some of
                these providers may process data on servers located outside
                the European Economic Area (EEA), including in the United
                States. Where this occurs, the provider relies on an approved
                data transfer mechanism, such as the EU Standard Contractual
                Clauses, to ensure your data remains protected.
              </p>
            </section>

            {/* 3. Cookies */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                3. Cookies and Tracking
              </h2>

              <h3 className="font-semibold text-[var(--brand-text)] mt-3 mb-1">
                Necessary Cookies
              </h3>
              <p className="text-[var(--brand-text-muted)]">
                Required for the website to function properly. These do not
                require consent under GDPR and include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <li>Your selected military base or location preference</li>
                <li>Your cookie consent choice itself, so we don't ask again</li>
              </ul>

              <h3 className="font-semibold text-[var(--brand-text)] mt-3 mb-1">
                Analytics Cookies
              </h3>
              <p className="text-[var(--brand-text-muted)]">
                With your consent, we use Google Analytics (GA4) to understand
                how visitors use the site — which pages are popular, how people
                navigate, and general traffic patterns. We have enabled IP
                anonymization. This data is used in aggregate and is not used
                to personally identify you.
              </p>

              <h3 className="font-semibold text-[var(--brand-text)] mt-3 mb-1">
                Marketing Cookies
              </h3>
              <p className="text-[var(--brand-text-muted)]">
                We do not currently use any marketing, advertising, or
                retargeting cookies. If this changes in the future, this
                Privacy Policy will be updated and you will be asked for
                renewed consent through our cookie banner before any such
                cookies are set.
              </p>

              <p className="mt-3 text-[var(--brand-text-muted)]">
                You can change your cookie preferences at any time using the
                "Cookie Settings" link in the site footer, which reopens the
                consent banner and lets you update your choices.
              </p>
            </section>

            {/* 4. Retention */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                4. Data Retention
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                We retain personal data only as long as necessary for the
                purposes described in this policy:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <li>Contact form messages: retained for up to 24 months, then deleted</li>
                <li>Business listing submissions: retained for as long as the listing remains active, plus 12 months</li>
                <li>Analytics data: retained according to Google Analytics' default retention settings (currently 14 months)</li>
              </ul>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                You may request earlier deletion of your data at any time — see
                Section 5.
              </p>
            </section>

            {/* 5. GDPR rights */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                5. Your Rights (GDPR)
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                If you are located in the European Economic Area, you have the
                following rights under the GDPR:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data ("right to be forgotten")</li>
                <li>Object to or restrict certain processing of your data</li>
                <li>Receive your data in a portable format</li>
                <li>Withdraw consent at any time, without affecting prior lawful processing</li>
                <li>Lodge a complaint with your local data protection authority</li>
              </ul>
              <p className="mt-2 text-[var(--brand-text-muted)]">
                To exercise any of these rights, contact us using the details
                in Section 7. We will respond within one month as required by
                the GDPR.
              </p>
            </section>

            {/* 6. Children's privacy */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                6. Children's Privacy
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                European Living is not directed at children, and we do not
                knowingly collect personal data from anyone under 16. If you
                believe a child has provided us with personal data, please
                contact us so we can delete it.
              </p>
            </section>

            {/* 7. Contact */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                7. Contact Us
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                For privacy-related questions or to exercise your GDPR rights,
                contact:
              </p>
              <div className="mt-2 space-y-1 text-[var(--brand-text-muted)]">
                <p>Terrell C Lombardi</p>
                <p>Untere Burggasse 4, 71063 Sindelfingen, Deutschland</p>
                <p>
                  <a
                    href="mailto:privacy@european-living.live"
                    className="text-[var(--brand-primary)] hover:underline"
                  >
                    privacy@european-living.live
                  </a>
                </p>
              </div>
            </section>

            {/* 8. Changes */}
            <section>
              <h2 className="text-base font-semibold text-[var(--brand-primary-dark)] mb-2 pb-1 border-b border-[var(--brand-border)]">
                8. Changes to This Policy
              </h2>
              <p className="text-[var(--brand-text-muted)]">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated effective date.
                Material changes affecting how we use your data will be
                accompanied by a renewed cookie consent prompt where required.
              </p>
            </section>

          </div>

          {/* Footer note */}
          <div className="mt-10 pt-6 border-t border-[var(--brand-border)]">
            <p className="text-xs text-[var(--brand-text-muted)]">
              Effective date: June 2026 · Last updated: June 2026
            </p>
            <div className="flex gap-4 mt-3 text-xs">
              <a href="/terms-of-service" className="text-[var(--brand-primary)] hover:underline">
                Terms of Service
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