// src/pages/AboutPage.tsx - YOUR AUTHENTIC STORY
import SEO from '../components/SEO';
import { Heart, MapPin, Users, Plane, Coffee, Home } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Terry & European Living"
        description="From a kid dreaming of Germany to helping thousands of military families explore Europe - this is my story and why I built European Living."
        keywords="about European Living, military family Europe, Terry Lombardi, American expat Germany"
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">
        {/* Hero Section - Personal & Warm */}
        <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] text-[var(--brand-light)] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Photo Placeholder */}
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white/20">
                <Users className="w-20 h-20 text-white/40" />
                <img src="https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/My-Photo.png" alt="Terry Lombardi" className="w-full h-full rounded-full object-cover" />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4">
                  Hi, I'm Terry 👋
                </h1>
                <p className="text-2xl text-[var(--brand-bg-alt)] mb-4">
                  A kid who dreamed of Germany, finally made it here, and now helps military families fall in love with Europe.
                </p>
                <p className="text-lg text-[var(--brand-bg-alt)]">
                  This is my story — and why I built European Living for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          
          {/* The Beginning */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Home className="w-8 h-8 text-[var(--brand-primary)]" />
              Where It All Started
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <div className="prose max-w-none text-[var(--muted-foreground)]">
                <p className="text-lg leading-relaxed mb-4">
                  <strong className="text-[var(--brand-dark)]">I was born in Pensacola, Florida on July 17, 1971.</strong> But Germany was always in my blood.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  My mother's side of the family is German. My father's side is Italian. Growing up, I lived between two rich cultures — speaking both languages, learning both traditions, feeling connected to both worlds.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  When I was 8, my parents divorced. Everything changed. From that day forward, only English was spoken in the house. That part of my identity — the German half, the European half — got locked away.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  But I never forgot.
                </p>
              </div>
            </div>
          </section>

          {/* The Dream */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
                The Dream I Couldn't Shake
              </h3>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                In 10th grade, I took German in high school. In 11th and 12th grade, I took college-level German.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                <strong className="text-[var(--brand-dark)]">I wanted to move to Germany more than anything.</strong>
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                So I joined the US Air Force, thinking it would be my ticket there.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                But life had other plans. My entire service — I stayed in the States. The dream of Germany stayed just that: a dream.
              </p>
            </div>
          </section>

          {/* Papa Joe's - The Turning Point */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[var(--brand-gold)]" />
              The Moment Everything Changed
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <div className="prose max-w-none text-[var(--muted-foreground)]">
                <p className="text-lg leading-relaxed mb-4">
                  Years passed. A couple of marriages came and went. Then in 2011, I married my wife.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  She had a cousin living in Germany, so we planned a 2-week trip. We explored several cities, even flew to London for 3 days and fell in love with the UK — Eastbourne, Brighton, London.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  But it was our last week in Germany that changed everything.
                </p>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-[var(--brand-gold)] p-6 my-6">
                  <p className="text-lg leading-relaxed mb-4 italic">
                    We were in Cologne. We stopped for lunch at a quaint, fascinating pub called <strong>Papa Joe's</strong> near Heumarkt.
                  </p>
                  <p className="text-xl font-semibold text-[var(--brand-dark)] leading-relaxed">
                    My wife and I turned to each other at the exact same moment and said: "We have to move here!"
                  </p>
                </div>
                <p className="text-lg leading-relaxed mb-4">
                  We spent the rest of that trip talking about how we were going to make it happen.
                </p>
                <p className="text-lg leading-relaxed">
                  For the next <strong>four years</strong>, we kept talking about it. Dreaming about it. Planning for it.
                </p>
              </div>
            </div>
          </section>

          {/* The Leap */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Plane className="w-8 h-8 text-[var(--brand-primary)]" />
              We Finally Did It
            </h2>
            <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-dark)] rounded-lg p-8 text-[var(--brand-light)]">
              <p className="text-lg leading-relaxed mb-4">
                By late 2015, we were tired of just talking about it.
              </p>
              <p className="text-xl font-semibold leading-relaxed mb-6">
                We decided: Do it. Or shut up about it.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                In early 2016, we contacted an immigration attorney. Got the green light.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                We put our house up for sale. Sold everything we owned. Packed 3 suitcases of clothes, our medical and tax records, and our 2 dogs.
              </p>
              <p className="text-2xl font-bold leading-relaxed text-[var(--brand-gold)] mb-6">
                And got on a one-way flight to Frankfurt, Germany.
              </p>
              <p className="text-lg leading-relaxed">
                Our apartment in Berlin wouldn't be ready for 18 days, so we made it a little vacation in Frankfurt. Then we traveled by train to Berlin, signed the paperwork for our apartment, went to the grocery store, got in bed, and crashed.
              </p>
            </div>
          </section>

          {/* Living the Dream */}
          <section className="mb-16">
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
                Living the Dream (Finally)
              </h3>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                From that first morning in Berlin, we explored as much of Germany as we could.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                <strong className="text-[var(--brand-dark)]">We still never get tired of it.</strong>
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                In October 2016, I was offered a job in Frankfurt (it didn't work out for many reasons), but we searched for an apartment in the area. We found the perfect place in <strong>Wiesbaden</strong> — right near the US Army base.
              </p>
            </div>
          </section>

          {/* The Problem I Discovered */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              What Broke My Heart
            </h2>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 border border-red-200">
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                Since our German wasn't the best yet, we got close to several Americans there. Active duty soldiers, contractors, military families.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
                And I heard the same stories over and over:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">💔</span>
                  <span className="text-lg">"We never leave the base..."</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">💔</span>
                  <span className="text-lg">"I'm afraid of messing up..."</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">💔</span>
                  <span className="text-lg">"I don't speak the language..."</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">💔</span>
                  <span className="text-lg">"What if I get lost?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">💔</span>
                  <span className="text-lg">"I'm afraid of getting taken advantage of..."</span>
                </li>
              </ul>
              <p className="text-xl font-semibold text-[var(--brand-dark)] leading-relaxed">
                It broke my heart.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mt-4">
                Here they were — living in the middle of this incredible continent — and they were too afraid to explore it.
              </p>
            </div>
          </section>

          {/* Stuttgart & The Mission */}
          <section className="mb-16">
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
                Then We Moved to Stuttgart
              </h3>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                In 2024, we moved to the Stuttgart region — near another Army base.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                <strong className="text-[var(--brand-dark)]">The same problem. Different base.</strong>
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                People stuck on base. Afraid to explore. Missing out on the adventure of a lifetime.
              </p>
              <p className="text-xl font-bold text-[var(--brand-primary)] leading-relaxed">
                That's when I decided to build European Living.
              </p>
            </div>
          </section>

          {/* The Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[var(--brand-button)]" />
              Why European Living Exists
            </h2>
            <div className="bg-gradient-to-r from-[var(--brand-button)] to-[var(--brand-gold)] rounded-lg p-8">
              <p className="text-xl text-[var(--brand-dark)] leading-relaxed mb-6 font-semibold">
                I built this site to be the resource I wish existed when Americans first arrive in Germany.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-dark)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold text-[var(--brand-dark)] mb-1">Remove the Fear</div>
                    <div className="text-[var(--brand-dark)] opacity-90">Everything you need to explore with confidence</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-dark)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold text-[var(--brand-dark)] mb-1">English-Friendly Everything</div>
                    <div className="text-[var(--brand-dark)] opacity-90">Verified businesses that work with Americans</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-dark)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold text-[var(--brand-dark)] mb-1">Real Practical Info</div>
                    <div className="text-[var(--brand-dark)] opacity-90">Where to park, what it costs, how to get there</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--brand-dark)] text-2xl flex-shrink-0">✓</div>
                  <div>
                    <div className="font-semibold text-[var(--brand-dark)] mb-1">Help You Step Outside Your Comfort Zone</div>
                    <div className="text-[var(--brand-dark)] opacity-90">Because Europe is too amazing to miss</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What You'll Find */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6">
              What You'll Find Here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 shadow-md border border-blue-100">
                <div className="text-4xl mb-3">🗺️</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  33 Day Trip Guides
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  From your base to incredible destinations. With drive times, costs, parking, and what to actually see.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 shadow-md border border-purple-100">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  1,200+ Travel Phrases
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Essential phrases in 10+ languages. With pronunciation. Because ordering food shouldn't be scary.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 shadow-md border border-green-100">
                <div className="text-4xl mb-3">🏪</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  200+ Verified Businesses
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  English-friendly restaurants, doctors, services. All confirmed. All trusted by military families.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 shadow-md border border-orange-100">
                <div className="text-4xl mb-3">✍️</div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2 text-lg">
                  30+ Travel Articles
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Real advice from someone who's lived it. Not generic travel blog stuff.
                </p>
              </div>
            </div>
          </section>

          {/* The Truth */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="text-5xl flex-shrink-0">💙</div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
                    Here's What I Want You to Know
                  </h3>
                  <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                    I waited <strong>25 years</strong> to make my dream of living in Germany come true.
                  </p>
                  <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                    You're already here. Right now. Living in the middle of Europe.
                  </p>
                  <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                    But if you're like most Americans I meet — you're only here for 2-3 years. Maybe less.
                  </p>
                  <p className="text-xl font-semibold text-[var(--brand-dark)] leading-relaxed mb-4">
                    Don't waste it being afraid.
                  </p>
                  <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                    Let me help you fall in love with this wonderful, magnificent, exciting continent — the same way I did at that little pub in Cologne.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-primary)] mb-1">9+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Years Living in Germany</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-button)] mb-1">3</div>
                <div className="text-sm text-[var(--muted-foreground)]">Cities Called Home</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-gold)] mb-1">35+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Countries Explored</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-[var(--border)] text-center">
                <div className="text-3xl font-bold text-[var(--brand-primary)] mb-1">100s</div>
                <div className="text-sm text-[var(--muted-foreground)]">Military Families Helped</div>
              </div>
            </div>
          </section>

          {/* Get in Touch */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-6 flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[var(--brand-primary)]" />
              Let's Stay Connected
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md border border-[var(--border)]">
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
                Questions? Want to suggest a destination? Found an amazing restaurant I should add?
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
                I read every message. This site exists for YOU.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:terry@european-living.live"
                  className="bg-[var(--brand-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition text-center"
                >
                  📧 Email Me
                </a>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-[var(--brand-button)] to-[var(--brand-gold)] rounded-lg p-12">
              <Plane className="w-16 h-16 mx-auto mb-6 text-[var(--brand-dark)]" />
              <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-4">
                Your European Adventure Starts This Weekend
              </h2>
              <p className="text-lg text-[var(--brand-dark)] mb-8 opacity-90 max-w-2xl mx-auto">
                I waited 25 years for this. You're already here. Don't waste another weekend on base.
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