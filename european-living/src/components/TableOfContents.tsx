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

export default function TableOfContents({ content }: TableOfContentsProps) {
  // Normalize content to always be a string
  const safeContent = content ?? "";

  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    const usedIds = new Set<string>();
    let match;

    // Generate unique & slug-safe IDs
    const generateUniqueId = (text: string): string => {
      const baseId = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      let id = baseId;
      let counter = 1;

      while (usedIds.has(id)) {
        id = `${baseId}-${counter}`;
        counter++;
      }

      usedIds.add(id);
      return id;
    };

    while ((match = headingRegex.exec(safeContent)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateUniqueId(text);

      items.push({ id, text, level });
    }

    setToc(items);
  }, [safeContent]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => {
      if (heading.id) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        window.scrollBy({ top: -100, behavior: "smooth" });
      }, 100);
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="sticky top-24 bg-white rounded-lg shadow-md p-4 max-h-[calc(100vh-8rem)] overflow-y-auto border border-gray-200">
      <h3 className="text-lg font-bold text-[var(--brand-dark)] mb-3">
        Table of Contents
      </h3>

      <nav>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left w-full text-sm hover:text-[var(--brand-primary)] transition-colors ${
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
