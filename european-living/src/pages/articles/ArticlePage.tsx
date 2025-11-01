// src/pages/articles/ArticlePage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlug, getRelatedArticles, Article } from '../../services/articleService';
import ReactMarkdown, { Components } from 'react-markdown'; 
import { Clock, Calendar, Tag, ArrowLeft } from 'lucide-react';
import remarkGfm from 'remark-gfm'; 
import { HTMLProps } from 'react'; 

// --- Custom Image Renderer Component ---

// Define the required props explicitly to satisfy TypeScript
type MarkdownImageProps = HTMLProps<HTMLImageElement>;

const MarkdownImage = ({ alt, src, ...props }: MarkdownImageProps) => {
  // IMPORTANT: Since the migration script ensures the 'src' in the Markdown
  // is the full, absolute Supabase URL, we simply use it as-is.
  if (!src) return null;
  
  return (
    <img 
      // Use the src directly, as it is already the absolute URL from the DB.
      src={src} 
      alt={alt || ''} 
      className="w-full h-auto rounded-lg shadow-md my-8" 
      loading="lazy" 
      {...props} 
    />
  );
};


export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      setArticle(null); 
      setRelatedArticles([]);
      
      try {
        const data = await getArticleBySlug(slug);
        
        if (!data) {
          setError('Article not found');
          setLoading(false);
          return;
        }
        
        setArticle(data);
        
        const related = await getRelatedArticles(
          data.id,
          data.category,
          data.tags,
          3
        );
        setRelatedArticles(related);
        
      } catch (err: unknown) { 
        const castError = err as Error;
        console.error('Error loading article:', castError);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    }
    
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error || 'Article Not Found'}
          </h1>
          <button
            onClick={() => navigate('/articles')} 
            className="flex items-center mx-auto text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </button>
        </div>
      </div>
    );
  }
  
  // FIX: This now correctly sets the component map without using 'as any', 
  // resolving your final ESLint error.
  const components: Components = {
    img: MarkdownImage, 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          {/* Category Badge */}
          {article.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
          )}
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-6">
              {article.subtitle}
            </p>
          )}
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {article.author && (
              <span className="font-medium">By {article.author}</span>
            )}
            
            {article.created_at && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
            
            {article.reading_time_minutes && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.reading_time_minutes} min read
              </div>
            )}
            
            <span className="text-gray-400">
              {article.view_count} views
            </span>
          </div>
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Image - already full URL, should render fine */}
      {article.featured_image_url && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md">
          <ReactMarkdown
            components={components} 
            remarkPlugins={[remarkGfm]}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 py-12 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map(relatedArticle => (
              <button
                key={relatedArticle.id}
                onClick={() => navigate(`/articles/${relatedArticle.slug}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-left"
              >
                {relatedArticle.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                    {relatedArticle.category}
                  </span>
                )}
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {relatedArticle.title}
                </h3>
                {relatedArticle.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {relatedArticle.excerpt}
                  </p>
                )}
                {relatedArticle.reading_time_minutes && (
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {relatedArticle.reading_time_minutes} min read
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}