import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { features } from "../../data/features";
import { ArrowLeft } from "lucide-react";

// Preload all markdown files as raw text
const articles = import.meta.glob("../../data/content/*.md", {
  query: "?raw",
  import: "default",
});

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    const feature = features.find((f) => f.id === id);
    if (!feature) {
      setError(true);
      return;
    }

    const filePath = `../../data/content/${feature.id}.md`;
    const loader = articles[filePath];

    if (loader) {
      loader()
        .then((mod) => setContent(mod))
        .catch((err) => {
          console.error("Error loading article:", err);
          setError(true);
        });
    } else {
      console.error("File not found in import.meta.glob:", filePath);
      setError(true);
    }
  }, [id]);

  if (error || !content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p className="text-gray-600 mb-6">
          The article you’re looking for doesn’t exist or may have been moved.
        </p>
        <Link
          to="/"
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const feature = features.find((f) => f.id === id);

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      {/* Back Button */}
      <div className="mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      {feature && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {feature.title}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {feature.description}
          </p>
          <div className="mt-6 flex justify-center">
            <feature.icon className="w-12 h-12 text-blue-600" />
          </div>
        </div>
      )}

      {/* Markdown Content */}
      <article className="prose prose-lg md:prose-xl prose-blue mx-auto prose-headings:font-semibold prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700">
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </article>

      {/* Back Button at Bottom */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
}
