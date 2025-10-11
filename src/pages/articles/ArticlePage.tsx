import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { features } from "../../data/features";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import TableOfContents from "../../components/TableOfContents";
import CollapsibleContent from "../../components/CollapsibleContent";
import Header from "../../components/page/Header";

type ArticleParams = {
  slug: string;
};

export default function ArticlePage() {
  const { slug } = useParams<ArticleParams>();
  const article = features.find((feature) => feature.id === slug);

  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const markdownFiles = import.meta.glob("../../data/content/*.md", { 
    query: "?raw", 
    import: "default" 
  });

  useEffect(() => {
    if (!article) return;

    const fileKey = `../../data/content/${article.id}.md`;
    const loader = markdownFiles[fileKey];

    if (!loader) {
      setError(true);
      return;
    }

    loader()
      .then((text) => setContent(text as string)) // ✅ Fixed type assertion
      .catch(() => setError(true));
  }, [article, markdownFiles]);

  if (!article) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[var(--brand-bg)]">
          <h2 className="text-2xl font-bold mb-4 text-[var(--brand-dark)]">
            Article Not Found
          </h2>
          <p className="text-[var(--brand-dark)] opacity-70 mb-6">
            We couldn't find the article you're looking for.
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg hover:bg-[var(--brand-dark)] transition"
          >
            Back to Home
          </Link>
        </div>
      </>
    );
  }

  const Icon = article.icon;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[var(--brand-bg)] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-[var(--brand-primary)] hover:text-[var(--brand-dark)] mb-6 font-medium"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="flex-1 bg-white rounded-lg shadow-lg p-4 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-10 h-10 text-[var(--brand-primary)]" />
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-dark)]">
                  {article.title}
                </h1>
              </div>

              <p className="text-[var(--brand-dark)] opacity-80 leading-relaxed mb-8 text-base sm:text-lg">
                {article.description}
              </p>

              {error ? (
                <p className="text-red-600">Error loading article content.</p>
              ) : content ? (
                <>
                  {/* Mobile: Collapsible Sections */}
                  <div className="lg:hidden">
                    <CollapsibleContent content={content} />
                  </div>

                  {/* Desktop: Full Content */}
                  <div className="hidden lg:block prose prose-lg max-w-none text-[var(--brand-dark)]">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h2: ({ children, ...props }) => {
                          const text = String(children);
                          const id = text
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-");
                          return (
                            <h2 id={id} className="text-2xl font-bold text-[var(--brand-dark)] mt-8 mb-4" {...props}>
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children, ...props }) => {
                          const text = String(children);
                          const id = text
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-");
                          return (
                            <h3 id={id} className="text-xl font-semibold text-[var(--brand-dark)] mt-6 mb-3" {...props}>
                              {children}
                            </h3>
                          );
                        },
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                </>
              ) : (
                <p className="text-[var(--brand-dark)] opacity-70">Loading article...</p>
              )}

              <div className="mt-10 pt-6 border-t border-gray-200">
                <Link
                  to="/"
                  className="inline-block px-5 py-2 bg-[var(--brand-primary)] text-white rounded-lg hover:bg-[var(--brand-dark)] transition"
                >
                  ← Back to Home
                </Link>
              </div>
            </article>

            {/* Desktop: Table of Contents Sidebar */}
            {content && (
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <TableOfContents content={content} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}