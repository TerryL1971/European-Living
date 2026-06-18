// src/pages/ImpressumPage.tsx
// German legal requirement — §5 TMG (Telemediengesetz)
// Required for any website accessible in Germany.

import SEO from '../components/SEO';

export default function ImpressumPage() {
  return (
    <>
      <SEO
        title="Impressum"
        description="Impressum — Angaben gemäß §5 TMG. Betreiber: Terrell C Lombardi, Sindelfingen, Deutschland."
        noIndex={true}
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">
        <div className="max-w-2xl mx-auto px-4 py-12">

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--brand-secondary)] mb-3">
              Legal
            </span>
            <h1 className="text-3xl font-bold text-[var(--brand-primary-dark)] mb-2">
              Impressum
            </h1>
            <p className="text-sm text-[var(--brand-text-muted)]">
              Angaben gemäß §5 TMG (Telemediengesetz)
            </p>
          </div>

          {/* Operator */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--brand-primary-dark)] mb-3 pb-2 border-b border-[var(--brand-border)]">
              Betreiber / Site Operator
            </h2>
            <div className="text-[var(--brand-text)] space-y-1 text-sm leading-relaxed">
              <p className="font-medium">Terrell C Lombardi</p>
              <p>Untere Burggasse 4</p>
              <p>71063 Sindelfingen</p>
              <p>Deutschland</p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--brand-primary-dark)] mb-3 pb-2 border-b border-[var(--brand-border)]">
              Kontakt / Contact
            </h2>
            <div className="text-sm text-[var(--brand-text)] space-y-2">
              <div className="flex gap-3">
                <span className="text-[var(--brand-text-muted)] w-16 flex-shrink-0">Telefon</span>
                <a
                  href="tel:+4915120583765"
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  +49 (0)151 20583765
                </a>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--brand-text-muted)] w-16 flex-shrink-0">E-Mail</span>
                <a
                  href="mailto:info@european-living.live"
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  info@european-living.live
                </a>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--brand-text-muted)] w-16 flex-shrink-0">Web</span>
                <a
                  href="https://www.european-living.live"
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  www.european-living.live
                </a>
              </div>
            </div>
          </section>

          {/* VAT */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--brand-primary-dark)] mb-3 pb-2 border-b border-[var(--brand-border)]">
              Umsatzsteuer / VAT
            </h2>
            <p className="text-sm text-[var(--brand-text)] leading-relaxed">
              Gemäß §19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer
              ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer ist daher
              nicht vorhanden.
            </p>
            <p className="text-sm text-[var(--brand-text-muted)] mt-2 leading-relaxed">
              In accordance with §19 UStG (small business exemption), VAT is not
              charged. No VAT identification number is held.
            </p>
          </section>

          {/* Content responsibility */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--brand-primary-dark)] mb-3 pb-2 border-b border-[var(--brand-border)]">
              Verantwortlich für den Inhalt / Editorial Responsibility
            </h2>
            <div className="text-sm text-[var(--brand-text)] space-y-1 leading-relaxed">
              <p>Gemäß §55 Abs. 2 RStV:</p>
              <p className="font-medium">Terrell C Lombardi</p>
              <p>Untere Burggasse 4</p>
              <p>71063 Sindelfingen</p>
              <p>Deutschland</p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--brand-primary-dark)] mb-3 pb-2 border-b border-[var(--brand-border)]">
              Haftungsausschluss / Disclaimer
            </h2>

            <div className="space-y-4 text-sm text-[var(--brand-text)] leading-relaxed">
              <div>
                <h3 className="font-semibold mb-1">Haftung für Inhalte</h3>
                <p className="text-[var(--brand-text-muted)]">
                  Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
                  erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                  der Inhalte kann jedoch keine Gewähr übernommen werden. Als
                  Diensteanbieter sind wir gemäß §7 Abs.1 TMG für eigene Inhalte
                  auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Haftung für Links</h3>
                <p className="text-[var(--brand-text-muted)]">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                  diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                  Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                  oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Urheberrecht / Copyright</h3>
                <p className="text-[var(--brand-text-muted)]">
                  Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">
                  Non-Affiliation / Keine Verbindung zu Behörden
                </h3>
                <p className="text-[var(--brand-text-muted)]">
                  European Living is an independent information resource and is
                  not affiliated with, endorsed by, or connected to the U.S.
                  Department of Defense, the U.S. Army, USAREUR-AF, any U.S.
                  military branch, or any U.S. government agency. Information
                  provided on this site is for general guidance only.
                </p>
              </div>
            </div>
          </section>

          {/* Dispute resolution */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--brand-primary-dark)] mb-3 pb-2 border-b border-[var(--brand-border)]">
              Streitschlichtung / Dispute Resolution
            </h2>
            <p className="text-sm text-[var(--brand-text-muted)] leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind
              nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
            <p className="text-sm text-[var(--brand-text-muted)] leading-relaxed mt-2">
              The European Commission provides an online dispute resolution
              platform. We are not obligated to participate in dispute resolution
              proceedings before a consumer arbitration board.
            </p>
          </section>

          {/* Last updated */}
          <div className="mt-10 pt-6 border-t border-[var(--brand-border)]">
            <p className="text-xs text-[var(--brand-text-muted)]">
              Stand / Last updated: Juni 2026
            </p>
          </div>

        </div>
      </div>
    </>
  );
}