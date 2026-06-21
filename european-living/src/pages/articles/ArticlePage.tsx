// src/pages/articles/ArticlePage.tsx

import { JSX, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getArticleBySlug, getRelatedArticles, Article } from '../../services/articleService';
import ReactMarkdown, { Components } from 'react-markdown';
import { Clock, Calendar, Tag, ArrowLeft, Navigation, Hotel, Mail, Printer } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import { HTMLProps } from 'react';
import TableOfContents from '../../components/TableOfContents';

type MarkdownImageProps = HTMLProps<HTMLImageElement>;

// ── Print stylesheet injected into <head> once ─────────────────────────────
// NOTE: Print media queries use literal hex values rather than CSS variables.
// var(--brand-primary-dark) / var(--brand-gold) correspond to #0C4A6E / #F59E0B.
// Some browsers' print engines don't reliably resolve custom properties in
// @media print, so these stay hardcoded but matched to the real brand palette.
const PRINT_STYLES = `
@media print {
  /* Hide everything except the article content */
  header, nav, footer,
  .no-print {
    display: none !important;
  }

  /* Reset page */
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt;
    line-height: 1.6;
  }

  /* Make article fill the full page */
  .print-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }

  /* Print header — show site name and URL */
  .print-header {
    display: block !important;
    border-bottom: 2pt solid #0C4A6E;
    padding-bottom: 8pt;
    margin-bottom: 16pt;
  }

  /* Checklist items render cleanly */
  ul li input[type="checkbox"] {
    margin-right: 6pt;
  }

  /* Blockquotes (tips/warnings) */
  blockquote {
    border-left: 3pt solid #F59E0B !important;
    padding-left: 10pt !important;
    margin: 8pt 0 !important;
    background: #f9f9f9 !important;
  }

  /* Tables */
  table {
    width: 100% !important;
    border-collapse: collapse !important;
    font-size: 10pt;
  }
  th, td {
    border: 1pt solid #ccc !important;
    padding: 4pt 8pt !important;
  }
  th {
    background: #0C4A6E !important;
    color: white !important;
  }

  /* Page breaks */
  h2 {
    page-break-before: auto;
    page-break-after: avoid;
  }
  ul, ol, table {
    page-break-inside: avoid;
  }

  /* Links — show URL in print */
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #555;
  }
  a[href^="/"]:after {
    content: " (european-living.live" attr(href) ")";
    font-size: 9pt;
    color: #555;
  }
}
`;

function injectPrintStyles() {
  if (document.getElementById('el-print-styles')) return;
  const style = document.createElement('style');
  style.id = 'el-print-styles';
  style.textContent = PRINT_STYLES;
  document.head.appendChild(style);
}

// ── Sub-components ─────────────────────────────────────────────────────────

const MarkdownImage = ({ alt, src, ...props }: MarkdownImageProps) => {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt || ''}
      className="w-full h-auto rounded-lg shadow-md my-8 no-print"
      loading="lazy"
      {...props}
    />
  );
};

const createHeadingComponent = (level: number) => {
  const HeadingComponent = ({ children }: { children?: React.ReactNode }) => {
    const text = String(children);
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag id={id}>{children}</Tag>;
  };
  return HeadingComponent;
};

interface BackButtonConfig {
  text: string;
  path: string;
}

const getBackButtonConfig = (category: string | null): BackButtonConfig => {
  switch (category) {
    case 'City Guides':
      return { text: '← Back to Destinations', path: '/#destinations' };
    case 'Travel Tips':
    case 'Travel Tips & Essentials':
      return { text: '← Back to Travel Tips', path: '/#tips' };
    case 'Day Trips':
      return { text: '← Back to Day Trips', path: '/#day-trips' };
    case 'PCS Guides':
      return { text: '← Back to PCS Guide', path: '/pcs-guide' };
    default:
      return { text: '← Back', path: '/' };
  }
};

// ── Main component ─────────────────────────────────────────────────────────

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shouldPrint = searchParams.get('print') === 'true';

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prevSlugRef = useRef<string | undefined>(undefined);
  const printTriggered = useRef(false);

  // Inject print styles once on mount
  useEffect(() => {
    injectPrintStyles();
  }, []);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;

      const isNewArticle = prevSlugRef.current && prevSlugRef.current !== slug;

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

        const related = await getRelatedArticles(data.id, data.category, data.tags, 3);
        setRelatedArticles(related);

        if (isNewArticle) {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }, 100);
        }
      } catch (err: unknown) {
        const castError = err as Error;
        console.error('Error loading article:', castError);
        setError('Failed to load article');
      } finally {
        setLoading(false);
        prevSlugRef.current = slug;
      }
    }

    loadArticle();
  }, [slug]);

  // Auto-trigger print dialog when ?print=true and article is loaded
  useEffect(() => {
    if (shouldPrint && article && !loading && !printTriggered.current) {
      printTriggered.current = true;
      // Small delay so the page finishes rendering before the dialog opens
      setTimeout(() => {
        window.print();
      }, 600);
    }
  }, [shouldPrint, article, loading]);

  const handlePrint = () => {
    window.print();
  };

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
            onClick={() => navigate('/destinations')}
            className="flex items-center mx-auto text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  const components: Components = {
    img: MarkdownImage,
    h2: createHeadingComponent(2),
    h3: createHeadingComponent(3),
  };

  const backConfig = getBackButtonConfig(article.category ?? null);
  const isCityGuide = article.category === 'City Guides';
  const isPCSGuide = article.category === 'PCS Guides';
  const destinationName = article.destination_name || article.title;
  const directionsUrl = `https://www.google.com/maps/search/${encodeURIComponent(destinationName)}`;
  const hotelsUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destinationName)}`;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">

      {/* ── Hidden print header — only shows when printing ── */}
      <div className="print-header" style={{ display: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '16pt', color: '#0C4A6E' }}>
              European Living
            </div>
            <div style={{ fontSize: '9pt', color: '#6b7280' }}>
              european-living.live — Resources for US Military Families in Europe
            </div>
          </div>
          <div style={{ fontSize: '9pt', color: '#6b7280' }}>
            Printed {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* ── Article header ── */}
      <div className="bg-[var(--brand-bg-alt)] border-b no-print">
        <div className="max-w-7xl mx-auto px-4 mt-18 py-6">

          {article.category && (
            <span className="inline-block bg-[var(--brand-primary)] text-white text-sm px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {article.author && (
              <span className="font-medium">By {article.author}</span>
            )}
            {article.created_at && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </div>
            )}
            {article.reading_time_minutes && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.reading_time_minutes} min read
              </div>
            )}
            <span className="text-gray-400">{article.view_count} views</span>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center bg-[var(--brand-primary)] text-white text-xs px-2 py-1 rounded"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <button
              onClick={() => navigate(backConfig.path)}
              className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)] hover:underline font-medium"
            >
              {backConfig.text}
            </button>

            {/* Print / Save button — shown on all articles but especially useful for PCS Guides */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--brand-primary-dark)] text-[var(--brand-primary-dark)] text-sm font-semibold hover:bg-[var(--brand-primary-dark)] hover:text-white transition-colors"
              title="Print or save as PDF"
            >
              <Printer className="w-4 h-4" />
              {isPCSGuide ? 'Print / Save Checklist' : 'Print Article'}
            </button>
          </div>
        </div>
      </div>

      {/* ── PCS Guide action bar ── */}
      {isPCSGuide && (
        <div className="no-print max-w-7xl mx-auto px-4 py-4">
          <div
            className="rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)',
              color: '#fff',
            }}
          >
            <div>
              <div className="font-bold text-base">Save this checklist</div>
              <div className="text-sm opacity-80 mt-0.5">
                Print it, save as PDF, or screenshot it for offline access.
                On iPhone: tap Share → Save to Files. On Android: tap Share → Save as PDF.
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105"
              style={{ backgroundColor: '#F59E0B', color: '#fff' }}
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
          </div>
        </div>
      )}

      {/* ── City guide action bar ── */}
      {isCityGuide && (
        <div className="no-print max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-sky-50 to-amber-50 border border-sky-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--brand-dark)] mb-3">
              Plan Your Visit to {destinationName}
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[var(--brand-primary)] text-white px-4 py-3 rounded-lg hover:bg-[var(--brand-primary-dark)] transition font-semibold text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
              <a
                href={hotelsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[var(--brand-gold)] text-white px-4 py-3 rounded-lg hover:bg-[var(--brand-amber)] transition font-semibold text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Hotel className="w-5 h-5" />
                Find Hotels
              </a>
              <a
                href="mailto:info@european-living.live?subject=Help with Trip Planning"
                className="flex-1 bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] px-4 py-3 rounded-lg hover:bg-[var(--brand-primary)] hover:text-white transition font-semibold text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Contact for Questions
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Featured image ── */}
      {article.featured_image_url && (
        <div className="no-print max-w-7xl mx-auto px-4 pb-8">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* ── Article body ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">

          <aside className="no-print hidden lg:block w-64 flex-shrink-0">
            <TableOfContents content={article.content} />
          </aside>

          <article className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-md p-8 print-content">
              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md">
                <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>

        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div className="no-print max-w-7xl mx-auto px-4 py-8 border-t flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={() => navigate(backConfig.path)}
          className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)] hover:underline font-medium"
        >
          {backConfig.text}
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--brand-primary-dark)] text-[var(--brand-primary-dark)] text-sm font-semibold hover:bg-[var(--brand-primary-dark)] hover:text-white transition-colors"
        >
          <Printer className="w-4 h-4" />
          {isPCSGuide ? 'Print / Save Checklist' : 'Print Article'}
        </button>
      </div>

      {/* ── Related articles ── */}
      {relatedArticles.length > 0 && (
        <div className="no-print max-w-7xl mx-auto px-4 py-12 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <div
                key={relatedArticle.id}
                onClick={() => navigate(`/articles/${relatedArticle.slug}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
              >
                {relatedArticle.category && (
                  <span className="inline-block bg-[var(--muted)] text-[var(--brand-primary-dark)] text-xs px-2 py-1 rounded mb-2">
                    {relatedArticle.category}
                  </span>
                )}
                <h3 className="font-bold text-lg text-gray-900 mb-2">{relatedArticle.title}</h3>
                {relatedArticle.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3">{relatedArticle.excerpt}</p>
                )}
                {relatedArticle.reading_time_minutes && (
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {relatedArticle.reading_time_minutes} min read
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Footer attribution ── */}
      <div className="no-print max-w-7xl mx-auto px-4 py-8 border-t text-center">
        <button
          onClick={() => navigate('/')}
          className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)] hover:underline font-semibold text-lg"
        >
          European Living
        </button>
        <p className="text-gray-600 text-sm mt-2">Your Guide to Europe</p>
      </div>

    </div>
  );
}