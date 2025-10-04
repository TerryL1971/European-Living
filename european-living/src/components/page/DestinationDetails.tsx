import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { destinations } from "../../data/destinations";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function DestinationDetails() {
  const { id } = useParams<{ id?: string }>();
  const destination = destinations.find((d) => d.id === id);

  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const contentFiles = useMemo(
    () =>
      import.meta.glob("../../data/content/*.md", {
        query: "?raw",
        import: "default",
      }) as Record<string, () => Promise<string>>,
    []
  );

  useEffect(() => {
    if (!destination?.contentFile) {
      setMarkdown(null);
      return;
    }

    setLoading(true);

    const targetPath = `../../data/content/${destination.contentFile}`;
    const importer = contentFiles[targetPath];

    if (!importer) {
      console.warn(`Markdown file not found: ${targetPath}`);
      setMarkdown(null);
      setLoading(false);
      return;
    }

    importer()
      .then((raw) => setMarkdown(raw))
      .catch((err) => {
        console.error("Failed to load markdown:", err);
        setMarkdown(null);
      })
      .finally(() => setLoading(false));
  }, [destination, contentFiles]);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Destination not found</h2>
        <Link to="/" className="text-brand-blue underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-80 object-cover rounded-xl mb-6 shadow"
        />

        <h1 className="text-3xl font-bold text-brand-blue mb-2">
          {destination.name}
        </h1>
        <p className="text-gray-700 mb-4">{destination.description}</p>

        {destination.travelTips?.length ? (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Travel Tips</h3>
            <ul className="list-disc list-inside text-gray-700">
              {destination.travelTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          {loading && (
            <div className="text-sm text-gray-500 mb-4">Loading article...</div>
          )}

          {!loading && markdown ? (
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          ) : null}

          {!loading && !markdown && (
            <div className="p-6 bg-gray-50 rounded-lg text-gray-600">
              <p>
                No article yet for this destination. Create one in{" "}
                <code>src/data/content/{destination.contentFile}</code>.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-gold transition"
          >
            ← Back to Destinations
          </Link>
        </div>
      </div>
    </main>
  );
}
