// src/components/page/HeroSection.tsx
import React, { JSX } from "react";

export default function HeroSection(): JSX.Element {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--brand-bg)] drop-shadow-md leading-tight">
          Explore Europe with{" "}
          <span className="text-[var(--brand-primary)]">Confidence</span>
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-white/90">
          Your complete guide to traveling across Europe. Find destinations,
          transportation, accommodations, English-speaking services, and essential
          German phrases — all in one place.
        </p>
      </div>
    </section>
  );
}
