// src/components/TableOfContents.tsx

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string | null | undefined;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "") // remove emojis
    .replace(/[^\w\s-]/g, "")              // remove punctuation
    .trim()
    .replace(/\s+/g, "-");
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  /**
   * Build TOC from ACTUAL rendered headings
   */
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );

    const usedIds = new Set<string>();
    const items: TocItem[] = [];

    headings.forEach((heading) => {
      const level = heading.tagName === "H2" ? 2 : 3;
      const text = heading.textContent?.trim() ?? "";
      if (!text) return;

      // Ensure heading has an ID
      let id = heading.id;

      if (!id) {
        const base = slugify(text);
        id = base;
        let counter = 1;

        while (usedIds.has(id)) {
          id = `${base}-${counter++}`;
        }

        heading.id = id;
      }

      usedIds.add(id);

      items.push({ id, text, level });
    });

    setToc(items);
  }, [content]);

  /**
   * Active section tracking
   */
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-96px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // account for sticky header
    setTimeout(() => {
      window.scrollBy({ top: -96, behavior: "smooth" });
    }, 50);
  };

  if (toc.length === 0) return null;

  return (
    <div className="
    hidden lg:block
    fixed
    top-1/2
    right-4
    -translate-y-1/2
    w-72
    bg-white
    rounded-lg
    shadow-lg
    p-4
    max-h-[calc(100vh-8rem)]
    overflow-y-auto
    border border-gray-200
    z-40
  ">
      <h3 className="text-lg font-bold text-[var(--brand-dark)] mb-3">
        Table of Contents
      </h3>

      <nav>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left w-full text-sm transition-colors hover:text-[var(--brand-primary)] ${
                  activeId === item.id
                    ? "text-[var(--brand-primary)] font-semibold"
                    : "text-[var(--brand-dark)] opacity-70"
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
