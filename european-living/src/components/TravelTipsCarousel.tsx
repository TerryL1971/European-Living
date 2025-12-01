// src/components/TravelTipsCarousel.tsx - Filtered to exclude City Guides

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface Article {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  category?: string;
  image_url?: string;
  slug: string;
  featured_image_url?: string;
}

export default function TravelTipsCarousel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      // Query articles table, excluding City Guides (show only Travel Tips, Practical Guides, Cultural Tips, etc.)
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .neq('category', 'City Guides')
        .order('created_at', { ascending: false })
        .limit(9);

      if (error) {
        console.error('Travel Tips Supabase error:', error);
        throw error;
      }

      console.log('✅ TRAVEL TIPS - Fetched from articles (excluding City Guides):', data);
      setArticles(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching travel tips:', error);
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    if (articles.length === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = prev - 3;
      return newIndex < 0 ? Math.max(0, articles.length - 3) : newIndex;
    });
  };

  const goToNext = () => {
    if (articles.length === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = prev + 3;
      return newIndex >= articles.length ? 0 : newIndex;
    });
  };

  const visibleArticles = articles.slice(currentIndex, currentIndex + 3);
  while (visibleArticles.length < 3 && articles.length > visibleArticles.length) {
    visibleArticles.push(articles[visibleArticles.length]);
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#30407C]"></div>
            <p className="mt-4 text-[#1E2326]">Loading travel tips...</p>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section id="travel-tips" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1E2326] mb-4">
              Travel Tips & Essentials
            </h2>
            <p className="text-xl text-[#0D0D0A]/70">
              Expert guidance for living and traveling in Europe
            </p>
          </div>
          <div className="text-center p-12 bg-[#F5F2EB] rounded-2xl">
            <p className="text-[#1E2326] mb-4">No articles available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="travel-tips" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E2326] mb-4">
            Travel Tips & Essentials
          </h2>
          <p className="text-xl text-[#0D0D0A]/70">
            Expert guidance for living and traveling in Europe
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {visibleArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/articles/${article.slug}`)}
                className="group bg-[#F5F2EB] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {(article.image_url || article.featured_image_url) ? (
                    <img
                      src={article.image_url || article.featured_image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#30407C] to-[#1E50BA]">
                      <span className="text-white text-lg font-semibold px-4 text-center">{article.title}</span>
                    </div>
                  )}
                  
                  {article.category && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#30407C] text-white rounded-full text-xs font-semibold">
                      {article.category}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1E2326] mb-2 group-hover:text-[#30407C] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {(article.description || article.excerpt) && (
                    <p className="text-sm text-[#0D0D0A]/70 line-clamp-2">
                      {article.description || article.excerpt}
                    </p>
                  )}

                  <div className="mt-4 pt-4 border-t border-white">
                    <div className="flex items-center justify-between text-[#30407C] font-semibold group-hover:text-[#1E50BA]">
                      <span>Read More</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {articles.length > 3 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#F5F2EB] transition-all z-10 hover:scale-110"
                aria-label="Previous articles"
              >
                <ChevronLeft className="w-6 h-6 text-[#1E2326]" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#F5F2EB] transition-all z-10 hover:scale-110"
                aria-label="Next articles"
              >
                <ChevronRight className="w-6 h-6 text-[#1E2326]" />
              </button>
            </>
          )}

          {articles.length > 3 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(articles.length / 3) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * 3)}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / 3) === idx
                      ? 'w-8 bg-[#30407C]'
                      : 'w-2 bg-[#30407C]/30'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 p-6 bg-[#30407C] rounded-2xl text-center">
          <p className="text-white text-lg mb-4">
            Have a topic you'd like us to cover?
          </p>
          <button
            onClick={() => navigate('/about')}
            className="px-6 py-3 bg-white text-[#30407C] font-semibold rounded-full hover:bg-[#F5F2EB] transition-colors"
          >
            Suggest a Topic
          </button>
        </div>
      </div>
    </section>
  );
}