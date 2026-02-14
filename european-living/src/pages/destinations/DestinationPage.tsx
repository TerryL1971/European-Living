// src/pages/destinations/DestinationPage.tsx
// Fully dynamic - everything from Supabase

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Navigation, Hotel, Mail, ArrowLeft } from "lucide-react";
import { getArticles } from "../../services/articleService";
import type { Article } from "../../services/articleService";
import TableOfContents from "../../components/TableOfContents";
import CollapsibleContent from "../../components/CollapsibleContent";

export default function DestinationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch article by slug
        const articles = await getArticles({ 
          published: true 
        });
        
        const found = articles.find(a => a.slug === id);
        
        if (found) {
          setArticle(found);
          
          // TODO: Increment view count
          // You might want to add a separate function to increment views
        } else {
          setError('Destination not found.');
        }
      } catch (err) {
        console.error("Error loading content:", err);
        setError('Failed to load destination content.');
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-[var(--brand-dark)]">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
            {error || 'Destination not found'}
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

  // Extract country from tags (usually tags[1] is the country)
  const country = article.tags && article.tags[1] ? article.tags[1] : '';
  
  // Generate URLs for action buttons
  // Note: You might want to add lat/lng to your articles table for more accurate maps
  const destinationName = article.destination_name || article.title;
  
  const directionsUrl = `https://www.google.com/maps/search/${encodeURIComponent(destinationName)}`;
  
  const hotelsUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destinationName)}`;

  const content = article.content || '';

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-16">
        <button
          type="button"
          onClick={() => navigate("/", { state: { scrollTo: "destinations" } })}
          className="text-[var(--brand-primary)] hover:text-[var(--brand-dark)] hover:underline py-3 block font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          ← Back to Destinations
        </button>




        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={article.featured_image_url || '/placeholder-city.jpg'}
              alt={destinationName}
              className="w-full h-64 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-city.jpg';
              }}
            />

            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-dark)] mb-2">
                  {destinationName}
                </h1>
                {country && (
                  <p className="text-[var(--brand-dark)] opacity-70">{country}</p>
                )}
              </div>

              {/* Action Buttons Bar */}
              <div className="bg-gradient-to-br from-sky-50 to-amber-50 border border-sky-200 rounded-lg p-4 mb-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[var(--brand-dark)] mb-3">
                  Plan Your Visit
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--brand-primary)] text-white px-4 py-3 rounded-lg hover:bg-[var(--brand-primary-dark)] transition font-semibold text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                  </a>
                  <a
                    href={hotelsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--brand-gold)] text-white px-4 py-3 rounded-lg hover:bg-[var(--brand-amber)] transition font-semibold text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Hotel className="w-5 h-5" />
                    Find Hotels
                  </a>
                  <a
                    href="mailto:info@european-living.live?subject=Help with Trip Planning"
                    className="flex-1 bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] px-4 py-3 rounded-lg hover:bg-[var(--brand-primary)] hover:text-white transition font-semibold text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Mail className="w-5 h-5" />
                    Contact for Questions
                  </a>
                </div>
              </div>

              {content ? (
                <>
                  {/* Mobile: Collapsible Sections */}
                  <div className="lg:hidden mb-6">
                    <CollapsibleContent content={content} />
                  </div>

                  {/* Desktop: Full Content */}
                  <div className="hidden lg:block prose prose-lg max-w-none text-[var(--brand-dark)] mb-6">
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
                <p className="text-[var(--brand-dark)] opacity-80 mb-6">
                  {article.excerpt || article.subtitle ||
                    "Discover everything this wonderful destination has to offer."}
                </p>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="bg-[var(--brand-primary)] text-white px-5 py-2 rounded-lg shadow hover:bg-[var(--brand-dark)] transition"
                >
                  Back Home
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: Table of Contents Sidebar */}
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