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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--brand-light)] drop-shadow-md leading-tight">
          Explore Europe with{" "}
          <span className="text-[var(--brand-primary)]">Confidence</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
          Your complete guide to traveling across Europe. Find destinations,
          transportation, accommodations, English-speaking services, and essential
          German phrases — all in one place.
        </p>
      </div>
    </section>
  );
}
