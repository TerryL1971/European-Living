// src/components/page/HeroSection.tsx
import React, { JSX } from "react";

export default function HeroSection(): JSX.Element {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[var(--brand-bg)]"
    >
      {/* Background image */}
      <img
        src="/images/hero-bg.jpg"
        alt="European street scene"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_55%] lg:object-[center_50%]"
        loading="eager"
        decoding="async"
        draggable="false"
      />

      {/* Enhanced gradient overlay - darker and more dramatic */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      {/* Additional subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 text-center text-white max-w-5xl">
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
          style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)'
          }}
        >
          Explore Europe with{" "}
          <span className="text-[var(--brand-gold)]">Confidence</span>
        </h1>

        <p 
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed"
          style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)'
          }}
        >
          Your complete guide to traveling across Europe. Find destinations,
          transportation, accommodations, English-speaking services, and essential
          German phrases — all in one place.
        </p>

        {/* Optional: Add a CTA button for more emphasis */}
        <div className="mt-8">
          <button
            onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </section>
  );
}