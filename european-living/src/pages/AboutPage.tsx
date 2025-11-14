// src/pages/AboutPage.tsx
import SEO from '../components/SEO';
import { Users, Target, MapPin, Award, Shield, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about European Living - your trusted guide for Americans exploring Europe from US military bases in Germany."
        keywords="about European Living, military community Germany, American expats Europe"
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] text-[var(--brand-light)] py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">
              About European Living
            </h1>
            <p className="text-xl text-[var(--brand-bg-alt)]">
              Bridging the gap between American military communities and the incredible experiences waiting just outside the gate.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6">
              Our Story
            </h2>
            <div className="prose max-w-none text-[var(--muted-foreground)]">
              <p className="text-lg leading-relaxed mb-4">
                European Living was founded to help Americans in Germany confidently explore everything Europe has to offer. With over three decades of experience working alongside the US military community, we've heard thousands of conversations about the same concerns: language barriers, uncertainty about where to go, and the fear of making mistakes off-base.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                We built European Living to address these exact concerns. This isn't just a travel website — it's a comprehensive resource specifically designed for Americans stationed at or living near US military installations in Germany.
              </p>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="w-12 h-12 bg-[var(--brand-primary)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[var(--brand-primary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--brand-dark)] mb-2">150+</div>
                <div className="text-[var(--muted-foreground)]">Verified Businesses</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="w-12 h-12 bg-[var(--brand-button)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[var(--brand-button)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--brand-dark)] mb-2">6</div>
                <div className="text-[var(--muted-foreground)]">Major US Installations</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="w-12 h-12 bg-[var(--brand-gold)] bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-[var(--brand-dark)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--brand-dark)] mb-2">10+</div>
                <div className="text-[var(--muted-foreground)]">Years of Experience</div>
              </div>
            </div>
          </section>

          {/* Our Background */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6">
              Our Background
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--brand-primary)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--brand-dark)] mb-2">
                      Deep Community Connections
                    </h3>
                    <p className="text-[var(--muted-foreground)]">
                      We've worked closely with military community organizations, including partnerships with spouse clubs, Stars and Stripes magazine, and on-base financial institutions across multiple installations in Germany.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--brand-button)] bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[var(--brand-button)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--brand-dark)] mb-2">
                      Understanding Your Concerns
                    </h3>
                    <p className="text-[var(--muted-foreground)]">
                      Through thousands of conversations with service members, families, and civilian employees, we've identified the most common barriers to exploring off-base: language anxiety, navigation concerns, and uncertainty about cultural norms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--brand-gold)] bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[var(--brand-dark)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--brand-dark)] mb-2">
                      Veteran Perspective
                    </h3>
                    <p className="text-[var(--muted-foreground)]">
                      Founded by a former USAF service member (1989-1992) who understands military life and has spent over 30 years living in Germany, bridging American and German cultures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6">
              Our Mission
            </h2>
            <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] rounded-lg p-8 text-[var(--brand-light)]">
              <p className="text-xl leading-relaxed mb-6">
                We provide verified, practical information to help Americans in Germany confidently explore Europe. Every business listed is confirmed English-friendly. Every destination includes real-world details: where to park, what it costs, what to expect.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl">✓</div>
                  <div>
                    <div className="font-semibold mb-1">Verified Information</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">All businesses confirmed English-friendly</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl">✓</div>
                  <div>
                    <div className="font-semibold mb-1">Practical Guidance</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">GPS coordinates, costs, step-by-step directions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl">✓</div>
                  <div>
                    <div className="font-semibold mb-1">Military-Focused</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">Built specifically for the American military community</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl">✓</div>
                  <div>
                    <div className="font-semibold mb-1">Continuously Updated</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">New destinations and businesses added regularly</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)]">
                <h3 className="font-bold text-[var(--brand-dark)] mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[var(--brand-primary)]" />
                  Local Expertise
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Over three decades of on-the-ground experience in Germany means we know the insider tips that make a difference.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)]">
                <h3 className="font-bold text-[var(--brand-dark)] mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[var(--brand-button)]" />
                  Community Trusted
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Built with input from thousands of military families who've shared their concerns and experiences.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)]">
                <h3 className="font-bold text-[var(--brand-dark)] mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--brand-gold)]" />
                  Comprehensive Coverage
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  From day trips to German phrases to verified English-friendly services — everything you need in one place.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)]">
                <h3 className="font-bold text-[var(--brand-dark)] mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--brand-primary)]" />
                  Military-Specific Focus
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  We understand PCS schedules, deployment concerns, and the unique needs of military families.
                </p>
              </div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6">
              Our Commitment
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                European Living exists to help you make the most of your time in Europe. Whether you're here for three years or thirty, we want you to experience the culture, history, and adventure that Germany and the surrounding countries have to offer.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                We're constantly adding new destinations, updating business information, and incorporating feedback from the community. If you have suggestions or would like to see something added, please reach out — this site is built for you.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-[var(--brand-button)] to-[var(--brand-gold)] rounded-lg p-12">
              <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-4">
                Ready to Start Exploring?
              </h2>
              <p className="text-lg text-[var(--brand-dark)] mb-6 opacity-90">
                Discover amazing destinations, find English-friendly services, and experience Europe with confidence.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/day-trips"
                  className="bg-[var(--brand-dark)] text-[var(--brand-light)] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Explore Day Trips
                </a>
                <a
                  href="/#destinations"
                  className="bg-white text-[var(--brand-dark)] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  View Destinations
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}