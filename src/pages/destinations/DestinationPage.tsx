import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { destinations } from "../../data/destinations";
import type { Destination } from "../../data/destinations";

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
          // Dynamic import of markdown files
          const module = await import(`../../data/content/${destination.contentFile}?raw`);
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

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-[var(--brand-primary)] hover:text-[var(--brand-dark)] hover:underline mb-6 block font-medium"
        >
          ← Back to Destinations
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">
                {destination.name}
              </h1>
              <p className="text-[var(--brand-dark)] opacity-70">{destination.country}</p>
            </div>

            {loading ? (
              <p className="text-[var(--brand-dark)] opacity-80">Loading content...</p>
            ) : content ? (
              <div className="prose prose-lg max-w-none text-[var(--brand-dark)] mb-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                >
                  {content}
                </ReactMarkdown>
              </div>
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

              <button
                onClick={() => navigate("/contact")}
                className="bg-[var(--brand-dark)] text-white px-5 py-2 rounded-lg shadow hover:bg-[var(--brand-black)] transition"
              >
                Contact for Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}