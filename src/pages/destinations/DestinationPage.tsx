import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Navigation, Hotel, Mail } from "lucide-react";
import { destinations } from "../../data/destinations";
import type { Destination } from "../../data/destinations";
import TableOfContents from "../../components/TableOfContents";
import CollapsibleContent from "../../components/CollapsibleContent";

export default function DestinationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const destination: Destination | undefined = destinations.find(
    (d) => d.id === id
  );

  useEffect(() => {
    const loadContent = async () => {
      if (destination?.contentFile) {
        setLoading(true);
        try {
          const module = await import(`../../data/content/${destination.contentFile}.md?raw`);
          setContent(module.default);
        } catch (err) {
          console.error("Error loading content:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadContent();
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
            Destination not found
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

  // Generate URLs for action buttons
  const directionsUrl = destination.lat && destination.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`
    : null;

  const hotelsUrl = destination.lat && destination.lng
    ? `https://www.booking.com/searchresults.html?latitude=${destination.lat}&longitude=${destination.lng}&radius=5`
    : `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination.name)}`;

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
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-dark)] mb-2">
                  {destination.name}
                </h1>
                <p className="text-[var(--brand-dark)] opacity-70">{destination.country}</p>
              </div>

              {/* Action Buttons Bar */}
              <div className="bg-[var(--brand-bg)] rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-[var(--brand-dark)] mb-3">
                  Plan Your Visit
                </h3>
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
                  <a
                    href={hotelsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--brand-gold)] text-[var(--brand-dark)] px-4 py-3 rounded-lg hover:bg-yellow-400 transition font-semibold text-center flex items-center justify-center gap-2"
                  >
                    <Hotel className="w-5 h-5" />
                    Find Hotels
                  </a>
                  <a
                    href="mailto:info@european-living.com?subject=Help with Trip Planning"
                    className="flex-1 bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] px-4 py-3 rounded-lg hover:bg-[var(--brand-primary)] hover:text-white transition font-semibold text-center flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Contact for Questions
                  </a>
                </div>
              </div>

              {loading ? (
                <p className="text-[var(--brand-dark)] opacity-80">Loading content...</p>
              ) : content ? (
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
                  {destination.description ||
                    "Discover everything this wonderful destination has to offer. From historical landmarks to modern attractions, there's something for everyone."}
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