import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface Section {
  id: string;
  title: string;
  content: string;
  level: number;
}

interface CollapsibleContentProps {
  content: string;
}

export default function CollapsibleContent({ content }: CollapsibleContentProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Parse markdown into sections
  const parseSections = (): Section[] => {
    const sections: Section[] = [];
    const lines = content.split("\n");
    let currentSection: Section | null = null;
    let contentBuffer: string[] = []; // Explicitly type as string[]

    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match || h3Match) {
        // Save previous section
        if (currentSection !== null) {
          currentSection.content = contentBuffer.join("\n").trim();
          sections.push(currentSection);
          contentBuffer = []; // Reset buffer
        }

        // Start new section
        const title = h2Match ? h2Match[1] : h3Match![1];
        const level = h2Match ? 2 : 3;
        const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

        currentSection = { id, title, content: "", level };
      } else if (currentSection !== null) {
        contentBuffer.push(line);
      }
    });

    // Don't forget the last section
    if (currentSection !== null) {
      currentSection.content = contentBuffer.join("\n").trim();
      sections.push(currentSection);
    }

    return sections;
  };

  const sections = parseSections();

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getPreview = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const expandAll = () => {
    setExpandedSections(new Set(sections.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  return (
    <div className="space-y-4">
      {/* Expand/Collapse All Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={expandAll}
          className="text-sm px-3 py-1 bg-[var(--brand-primary)] text-white rounded hover:bg-[var(--brand-dark)] transition"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="text-sm px-3 py-1 bg-gray-200 text-[var(--brand-dark)] rounded hover:bg-gray-300 transition"
        >
          Collapse All
        </button>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        const preview = getPreview(section.content);
        const showReadMore = section.content.length > 200;

        return (
          <div
            key={section.id}
            className={`border border-gray-200 rounded-lg overflow-hidden ${
              section.level === 3 ? "ml-4" : ""
            }`}
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left p-4 bg-white hover:bg-gray-50 transition flex items-center justify-between"
            >
              <h3
                className={`font-semibold text-[var(--brand-dark)] ${
                  section.level === 2 ? "text-lg" : "text-base"
                }`}
              >
                {section.title}
              </h3>
              <svg
                className={`w-5 h-5 text-[var(--brand-primary)] transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Section Content */}
            <div className="px-4 pb-4 bg-white">
              {isExpanded ? (
                <div className="prose prose-sm max-w-none text-[var(--brand-dark)]">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <>
                  <p className="text-[var(--brand-dark)] opacity-70 text-sm mb-2">
                    {preview}
                  </p>
                  {showReadMore && (
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="text-[var(--brand-primary)] hover:underline text-sm font-medium"
                    >
                      Read more →
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}