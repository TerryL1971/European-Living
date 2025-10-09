import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const articles = [
  {
    slug: "transportation",
    title: "Transportation Made Simple",
    content: `
Getting around Europe is easy once you understand the transport systems.
Learn how to use trains, buses, flights, and car rentals efficiently.
Discover regional passes and apps that help you plan every leg of your journey.`,
  },
  {
    slug: "accommodation",
    title: "Accommodation Assistance",
    content: `
Find tips for booking hotels, hostels, and short-term apartments.
Learn how to compare platforms like Booking.com and Airbnb, and avoid common tourist traps.`,
  },
  {
    slug: "services",
    title: "English-Speaking Services",
    content: `
Need a doctor, lawyer, or mechanic who speaks English?
This guide helps you find trusted professionals in major German and European cities.`,
  },
  {
    slug: "phrases",
    title: "Essential German Phrases",
    content: `
Learn essential German words and phrases for greetings, dining, shopping, and emergencies.
Perfect for newcomers or travelers who want to connect with locals.`,
  },
  {
    slug: "budgeting",
    title: "Budgeting & Payments",
    content: `
Understand how to manage money, use ATMs, and send international transfers in Europe.
We cover bank account setup, digital wallets, and currency exchange tips.`,
  },
  {
    slug: "etiquette",
    title: "Cultural Etiquette",
    content: `
Learn the unspoken social rules that help you blend in — from tipping to punctuality.
Avoid awkward moments and impress locals with your cultural awareness.`,
  },
];

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const found = articles.find((a) => a.slug === slug);
    setArticle(found || null);
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
        <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">
          {article.content}
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
