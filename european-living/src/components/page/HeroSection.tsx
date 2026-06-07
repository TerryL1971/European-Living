// src/components/page/HeroSection.tsx - UPDATED with Facebook CTA

import React, { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Plane, Users } from "lucide-react";

export default function HeroSection(): JSX.Element {
  const navigate = useNavigate();

  const bgUrl =
    "https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/hero-bg.jpg";

  const scrollToDestinations = () => {
    document
      .getElementById("destinations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEmailSignup = () => {
    document
      .getElementById("email-signup")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        backgroundImage: `url("${bgUrl}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 55%",
      }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[var(--brand-bg, #000)]"
    >
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 text-center text-white max-w-5xl">

        {/* Main Headline */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          style={{
            textShadow:
              "0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          Discover Europe{" "}
          <span className="text-[var(--brand-gold,#F5C04A)]">Beyond</span> the
          Base
        </h1>

        {/* Subheadline */}
        <p
          className="max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-8"
          style={{
            textShadow:
              "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)",
          }}
        >
          Your complete guide to exploring Europe with confidence. From weekend
          trips to English-friendly services — all in one place.
        </p>

        {/* Social Proof */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm md:text-base"
          style={{
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--brand-gold)]" />
            <span className="font-semibold">33 Day Trips</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--brand-gold)]" />
            <span className="font-semibold">200+ Businesses</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-[var(--brand-gold)]" />
            <span className="font-semibold">1,200+ Phrases</span>
          </div>
        </div>

        {/* Trust Statement */}
        <p
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 opacity-90"
          style={{
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          Built by Americans who've lived in Germany for 9+ years and helped
          hundreds of military families. We understand the fear of leaving
          base — and we're here to help you explore with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToDestinations}
            className="w-full sm:w-auto bg-[var(--brand-primary,#1E40AF)] hover:bg-[var(--brand-dark,#153A84)] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            🗺️ Explore Destinations
          </button>

          <button
            onClick={scrollToEmailSignup}
            className="w-full sm:w-auto bg-[var(--brand-gold,#F5C04A)] hover:bg-[var(--brand-button)] text-[#131312] font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            ✉️ Get Free Travel Tips
          </button>

          {/* Facebook Community Button */}
          <a
            href="https://www.facebook.com/EuropeanLivingOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#0f5bbf] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {/* Facebook icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Join Our Community
          </a>
        </div>

        {/* Secondary CTA */}
        <p className="mt-6 text-sm md:text-base opacity-80">
          <button
            onClick={() => navigate("/about")}
            className="underline hover:text-[var(--brand-gold)] transition-colors"
          >
            Read Terry's story →
          </button>
        </p>

      </div>
    </section>
  );
}