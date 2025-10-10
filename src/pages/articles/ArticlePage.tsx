import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { features } from "../../data/features";
import { ArrowLeft } from "lucide-react";

const articles = import.meta.glob("../../data/content/*.md", {
  query: "?raw",
  import: "default",
});

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

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
        .then((mod) => setContent(mod as string))
        .catch((err) => {
          console.error("Error loading article:", err);
          setError(true);
        });
    } else {
      console.error("File not found in import.meta.glob:", filePath);
      setError(true);
    }
  }, [id]);

  // 📈 Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="relative bg-gray-50 min-h-screen">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

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
            <div className="mb-4 flex justify-center">
              <feature.icon className="w-14 h-14 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {feature.title}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {feature.description}
            </p>
          </div>
        )}

        {/* Markdown Content */}
        <article
          className="
            prose 
            prose-blue 
            prose-lg 
            md:prose-xl 
            mx-auto 
            prose-headings:font-bold 
            prose-headings:text-gray-900 
            prose-h1:text-3xl 
            prose-h2:text-2xl 
            prose-h3:text-xl 
            prose-p:text-gray-700 
            prose-strong:text-gray-900 
            prose-a:text-blue-600 
            hover:prose-a:text-blue-800
            prose-img:rounded-xl
            prose-img:shadow-md
            prose-li:marker:text-blue-600
            prose-blockquote:border-l-4
            prose-blockquote:border-blue-500
            prose-blockquote:bg-blue-50
            prose-blockquote:p-4
            prose-blockquote:rounded-lg
            prose-blockquote:italic
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Back Button at Bottom */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
