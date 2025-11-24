// src/pages/destinations/DestinationPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Navigation, Hotel, Mail } from "lucide-react";
import { getArticles, getArticleBySlug } from "../../services/articleService";
import type { Article } from "../../services/articleService";
import TableOfContents from "../../components/TableOfContents";
import CollapsibleContent from "../../components/CollapsibleContent";

/**
 * Destination page:
 * - Resolve destination by slug from route param (id)
 * - Find article by destination_name (exact match) first
 * - Fallback to article slug === id
 * - Renders markdown content with TOC and collapsible mobile content
 */

export default function DestinationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // We no longer use the static destinations list - the "destination" data comes from articles
  // We'll fetch the article that matches destination_name === id (or slug === id) or destination_name === "City Name"
  useEffect(() => {
    const loadContent = async () => {
      if (!id) {
        setError("Invalid destination");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setArticle(null);

      try {
        // 1) Try exact match on destination_name (case-insensitive)
        const articlesByDestination = await getArticles({
          published: true,
          // NOTE: our getArticles supports filtering; if not, we fallback to fetching all and filtering
          destination: id,
          limit: 1,
        });

        if (articlesByDestination && articlesByDestination.length > 0) {
          setArticle(articlesByDestination[0]);
          return;
        }

        // 2) Fallback: fetch all published city guides and find by slug or by destination_name
        const allCityGuides = await getArticles({
          category: "City Guides",
          published: true,
        });

        // Prefer slug match
        let found = allCityGuides.find((a) => a.slug === id);

        // If not by slug, try destination_name (case-insensitive)
        if (!found) {
          const lowerId = id.toLowerCase();
          found =
            allCityGuides.find(
              (a) => (a.destination_name || "").toLowerCase() === lowerId
            ) ??
            allCityGuides.find(
              (a) => (a.destination_name || "").toLowerCase().includes(lowerId)
            );
        }

        if (found) {
          setArticle(found);
          return;
        }

        // 3) Try direct getArticleBySlug if available
        const bySlug = await getArticleBySlug(id);
        if (bySlug) {
          setArticle(bySlug);
          return;
        }

        setError("No content available for this destination yet.");
      } catch (err) {
        console.error("Error loading destination content:", err);
        setError("Failed to load destination content.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [id]);

  // When loading, show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no article found show a friendly message
  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
            {error || "Content not available"}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[var(--brand-primary)] text-white px-5 py-2 rounded-lg shadow hover:bg-[var(--brand-dark)] transition"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  // Build google maps / booking urls using the article.destination_name when available
  const placeName = article.destination_name || article.title;
  const directionsUrl = placeName
    ? `https://www.google.com/maps/search/${encodeURIComponent(placeName)}`
    : null;

  const hotelsUrl = placeName
    ? `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(placeName)}`
    : null;

  const content = article.content || "";

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-16">
        <button
          onClick={() => navigate(-1)}
          className="text-[var(--brand-primary)] hover:text-[var(--brand-dark)] hover:underline mb-6 block font-medium"
        >
          ← Back to Destinations
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
            {article.featured_image_url && (
              <img
                src={article.featured_image_url}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-dark)] mb-2">
                  {placeName}
                </h1>
                {article.subtitle && <p className="text-[var(--brand-dark)] opacity-70">{article.subtitle}</p>}
              </div>

              {/* Action Buttons */}
              <div className="bg-[var(--brand-bg)] rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-[var(--brand-dark)] mb-3">Plan Your Visit</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  {directionsUrl && (
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[var(--brand-primary)] text-white px-4 py-3 rounded-lg hover:bg-[var(--brand-dark)] transition font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-5 h-5" />
                      Get Directions
                    </a>
                  )}
                  {hotelsUrl && (
                    <a
                      href={hotelsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[var(--brand-gold)] text-[var(--brand-dark)] px-4 py-3 rounded-lg hover:bg-yellow-400 transition font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <Hotel className="w-5 h-5" />
                      Find Hotels
                    </a>
                  )}
                  <a
                    href="mailto:european.living.live@gmail.com?subject=Help with Trip Planning"
                    className="flex-1 bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] px-4 py-3 rounded-lg hover:bg-[var(--brand-primary)] hover:text-white transition font-semibold text-center flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Contact for Questions
                  </a>
                </div>
              </div>

              {/* Content rendering */}
              <div>
                {/* Mobile Collapsible */}
                <div className="lg:hidden mb-6">
                  <CollapsibleContent content={content} />
                </div>

                {/* Desktop full content + TOC */}
                <div className="hidden lg:block prose prose-lg max-w-none text-[var(--brand-dark)] mb-6">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      h2: ({ children, ...props }) => {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                        return (
                          <h2 id={id} className="text-2xl font-bold text-[var(--brand-dark)] mt-8 mb-4" {...props}>
                            {children}
                          </h2>
                        );
                      },
                      h3: ({ children, ...props }) => {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
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
              </div>

              <div className="flex gap-4">
                <button onClick={() => navigate("/")} className="bg-[var(--brand-primary)] text-white px-5 py-2 rounded-lg shadow hover:bg-[var(--brand-dark)] transition">
                  Back Home
                </button>
              </div>
            </div>
          </div>

          {/* TOC Sidebar */}
          {content && (
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <TableOfContents content={content} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
