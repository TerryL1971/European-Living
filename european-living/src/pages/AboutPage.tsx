// src/pages/AboutPage.tsx - REWRITTEN VERSION
import SEO from '../components/SEO';
import { Heart, MapPin, Users, Plane, Coffee, Camera } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Terry & European Living"
        description="The story behind European Living - helping military families explore Europe with confidence since day one in Germany."
        keywords="about European Living, military family Europe, Terry Lombardi, American expat Germany"
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">
        {/* Hero Section - Personal & Warm */}
        <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] text-[var(--brand-light)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Photo Placeholder */}
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white/20">
                <Camera className="w-20 h-20 text-white/40" />
                <img src="https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/My-Photo.png" 
                alt="Terry Lombardi" 
                className="w-full h-full rounded-full object-cover" />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4">
                  Hi, I'm Terry 👋
                </h1>
                <p className="text-2xl text-[var(--brand-bg-alt)] mb-4">
                  I've spent 30+ years helping military families fall in love with Europe.
                </p>
                <p className="text-lg text-[var(--brand-bg-alt)]">
                  European Living is my mission to help YOU make the most of your time here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          
          {/* The Real Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-[var(--brand-primary)]" />
              Why I Built This
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <div className="prose max-w-none text-[var(--muted-foreground)]">
                <p className="text-lg leading-relaxed mb-4">
                  <strong className="text-[var(--brand-dark)]">I'll never forget my first weekend in Germany.</strong> 
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  I was a young airman at Ramstein (1989-1992), and I wanted to explore. But I was terrified. I didn't speak German. I didn't know where to go. I was afraid of making a fool of myself off-base.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  So I stayed on base. Weekend after weekend. Until finally, a fellow airman grabbed me and said: <em>"Dude, you're wasting your time here. Let's go."</em>
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  That weekend changed everything. We went to Heidelberg. Got lost. Ordered the wrong food. Laughed at our terrible German. And fell absolutely in love with this incredible continent.
                </p>
                <p className="text-lg leading-relaxed mb-4 text-[var(--brand-primary)] font-semibold">
                  I never wanted another military family to waste their weekends stuck on base out of fear.
                </p>
                <p className="text-lg leading-relaxed">
                  Over the next 30+ years, I worked alongside the military community in Germany — at spouse clubs, with Stars and Stripes, at on-base financial institutions. And I heard the same concerns over and over:
                </p>
                <ul className="text-lg space-y-2 my-6 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span>"I don't speak German..."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span>"What if I get lost?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span>"Where do we even go?"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span>"Is it safe for my family?"</span>
                  </li>
                </ul>
                <p className="text-lg leading-relaxed mb-4">
                  <strong className="text-[var(--brand-dark)]">European Living is my answer to those questions.</strong>
                </p>
                <p className="text-lg leading-relaxed">
                  Every destination guide. Every phrase. Every business listing. It's all designed to remove your fear and give you confidence to explore this amazing continent.
                </p>
              </div>
            </div>
          </section>

          {/* What You'll Find Here */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[var(--brand-button)]" />
              What You'll Find Here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 shadow-md border border-blue-100">
                <div className="text-4xl mb-3">🗺️</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  33 Day Trip Guides
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  From your base to amazing destinations. With drive times, costs, parking info, and what to actually see when you get there.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 shadow-md border border-purple-100">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  1,200+ Travel Phrases
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Essential phrases in 10+ languages. With pronunciation help. Because "Where's the bathroom?" shouldn't be stressful.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 shadow-md border border-green-100">
                <div className="text-4xl mb-3">🏪</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  200+ Verified Businesses
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  English-friendly restaurants, doctors, services. All confirmed. All trusted by other military families.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 shadow-md border border-orange-100">
                <div className="text-4xl mb-3">✍️</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  30+ Travel Articles
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Real advice from someone who's been there. Not generic travel blog stuff — actual military family perspective.
                </p>
              </div>
            </div>
          </section>

          {/* My Promise */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[var(--brand-gold)]" />
              My Promise to You
            </h2>
            <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] rounded-lg p-8 text-[var(--brand-light)]">
              <p className="text-xl leading-relaxed mb-6">
                <strong>I'm not here to make you an expert on European culture.</strong> I'm here to help you have amazing weekends with your family.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold mb-1">No Fluff</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">Just practical info: where to park, what it costs, where to eat</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold mb-1">English-Friendly Everything</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">Every business listed speaks English or is used to working with Americans</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold mb-1">Military Family Perspective</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">I understand PCS schedules, deployment stress, and tight budgets</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-gold)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold mb-1">Always Improving</div>
                    <div className="text-sm text-[var(--brand-bg-alt)]">New destinations, updated info, and your feedback incorporated regularly</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats - Social Proof */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-primary)] mb-1">30+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Years in Germany</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-button)] mb-1">6</div>
                <div className="text-sm text-[var(--muted-foreground)]">Military Bases</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-gold)] mb-1">35</div>
                <div className="text-sm text-[var(--muted-foreground)]">Countries Visited</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-primary)] mb-1">1000s</div>
                <div className="text-sm text-[var(--muted-foreground)]">Families Helped</div>
              </div>
            </div>
          </section>

          {/* Personal Note */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="text-5xl flex-shrink-0">💙</div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
                    Here's the Truth
                  </h3>
                  <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                    You're only here for a few years. Maybe less. And Europe is RIGHT THERE, waiting for you.
                  </p>
                  <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                    I've met too many families who left Germany having never seen Prague. Never visited the Christmas markets. Never tasted authentic Italian pasta in Rome. Never explored the Swiss Alps.
                  </p>
                  <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                    They were too scared. Too unsure. Too stuck in the "maybe next weekend" trap.
                  </p>
                  <p className="text-lg font-semibold text-[var(--brand-dark)] leading-relaxed">
                    Don't be that family. Let me help you make the most of this incredible opportunity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Get in Touch */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[var(--brand-primary)]" />
              Let's Stay Connected
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
                Have questions? Want to suggest a destination? Found an amazing restaurant I should add?
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
                I read every message. This site exists to help YOU, so your feedback makes it better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:terry@european-living.live"
                  className="bg-[var(--brand-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition text-center"
                >
                  📧 Email Me
                </a>
                {/* Add your actual social media links */}
                {/* <a
                  href="https://facebook.com/your-page"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition text-center"
                >
                  Follow on Facebook
                </a> */}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-[var(--brand-button)] to-[var(--brand-gold)] rounded-lg p-12">
              <Plane className="w-16 h-16 mx-auto mb-6 text-[var(--brand-dark)]" />
              <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-4">
                Your European Adventure Starts This Weekend
              </h2>
              <p className="text-lg text-[var(--brand-dark)] mb-8 opacity-90 max-w-2xl mx-auto">
                Stop waiting. Stop worrying. Pick a destination and go. I promise it'll be easier than you think.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/day-trips"
                  className="bg-[var(--brand-dark)] text-[var(--brand-light)] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
                >
                  Explore 33 Day Trips →
                </a>
                <a
                  href="/#phrases"
                  className="bg-white text-[var(--brand-dark)] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
                >
                  Learn Essential Phrases
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}