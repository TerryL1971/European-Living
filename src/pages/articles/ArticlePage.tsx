import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Sample article data — you can replace this with fetched content or markdown import
const articles = [
  {
    slug: "registering-your-residence",
    title: "How to Register Your Residence in Germany",
    content: `
      If you’re moving to Germany, one of the first things you’ll need to do
      is register your address (Anmeldung). This must be done within 14 days
      of moving into your new home.

      To register, bring your passport, rental contract, and confirmation from
      your landlord (Wohnungsgeberbestätigung) to the local Bürgeramt.
    `,
  },
  {
    slug: "getting-health-insurance",
    title: "Understanding Health Insurance in Germany",
    content: `
      Germany has one of the most comprehensive healthcare systems in the world.
      You’ll need to choose between public (gesetzliche) and private (private)
      health insurance.

      Most employees are automatically enrolled in public insurance. Freelancers
      and high earners can opt for private plans.
    `,
  },
];

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const foundArticle = articles.find((a) => a.slug === slug);
    setArticle(foundArticle || null);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p className="mb-6 text-center text-gray-600">
          The article you’re looking for doesn’t exist or may have been moved.
        </p>
        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-red-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-brand-blue">{article.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-800">
          {article.content.split("\n").map((p, i) =>
            p.trim() ? <p key={i}>{p}</p> : null
          )}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            to="/#contact"
            className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-white hover:text-red-600 transition-colors text-center"
          >
            Contact Us for Help
          </Link>
        </div>
      </div>
    </div>
  );
}
