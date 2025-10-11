// src/pages/articles/ArticlePage.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { features } from "../../data/features";
import ReactMarkdown from "react-markdown";

type ArticleParams = {
  slug: string;
};

export default function ArticlePage() {
  const { slug } = useParams<ArticleParams>();
  const article = features.find((feature) => feature.id === slug);

  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // ✅ Import all markdown files once at top-level (so ESLint won't complain)
  const markdownFiles = import.meta.glob("../../data/content/*.md", { as: "raw" });

  useEffect(() => {
    if (!article) return;

    const fileKey = `../../data/content/${article.id}.md`;
    const loader = markdownFiles[fileKey];

    if (!loader) {
      setError(true);
      return;
    }

    loader()
      .then((text: string) => setContent(text))
      .catch(() => setError(true));
  }, [article, markdownFiles]); // ✅ include markdownFiles to satisfy ESLint

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Article Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn’t find the article you’re looking for.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const Icon = article.icon;

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Icon className="w-10 h-10 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          {article.description}
        </p>

        {error ? (
          <p className="text-red-600">Error loading article content.</p>
        ) : content ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-gray-500">Loading article...</p>
        )}

        <div className="mt-10">
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
