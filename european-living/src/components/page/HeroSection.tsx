// src/components/page/HeroSection.tsx
import React, { JSX } from "react";

export default function HeroSection(): JSX.Element {
  const bgUrl =
    "https://pkacbcohrygpyapgtzpq.supabase.co/storage/v1/object/public/images/hero-bg.jpg";

  return (
    <section
      id="home"
      aria-label="Hero"
      // Using inline style for the background image ensures it's painted behind children
      style={{
        backgroundImage: `url("${bgUrl}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 55%",
      }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[var(--brand-bg, #000)]"
    >
      {/* Top dark gradient (dramatic) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Subtle bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 px-6 sm:px-10 text-center text-white max-w-5xl">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
          style={{
            textShadow:
              "0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          Explore Europe with{" "}
          <span className="text-[var(--brand-gold,#F5C04A)]">Confidence</span>
        </h1>

        <p
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl font-medium leading-relaxed"
          style={{
            textShadow:
              "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)",
          }}
        >
          Your complete guide to traveling across Europe. Find destinations,
          transportation, accommodations, English-speaking services, and
          essential German phrases — all in one place.
        </p>

        <div className="mt-8">
          <button
            onClick={() =>
              document
                .getElementById("destinations")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[var(--brand-primary,#1E40AF)] hover:bg-[var(--brand-dark,#153A84)] text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </section>
  );
}
