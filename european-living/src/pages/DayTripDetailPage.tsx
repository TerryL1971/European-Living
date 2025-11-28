// src/pages/DayTripDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDayTripById } from '../services/dayTripsService';
import type { DayTrip } from '../services/dayTripsService';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { MapPin, Navigation, Globe, Heart, Share2, Clock, DollarSign, Dumbbell, UtensilsCrossed, Ticket, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

export default function DayTripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dayTrip, setDayTrip] = useState<DayTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
  if (!id) {
    setError('No trip ID provided');
    setLoading(false);
    return;
  }

  async function loadDayTrip() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDayTripById(id!);
      setDayTrip(data);
    } catch {
      console.error('Error loading day trip');
      setError('Failed to load day trip details.');
    } finally {
      setLoading(false);
    }
  }

  loadDayTrip();
}, [id]);

  const handleGetDirections = () => {
    if (!dayTrip?.latitude || !dayTrip?.longitude) return;
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dayTrip.latitude},${dayTrip.longitude}`;
    window.open(url, '_blank');
  };

  const handleOpenWebsite = () => {
    if (dayTrip?.official_website) {
      window.open(dayTrip.official_website, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: dayTrip?.name,
          text: dayTrip?.short_description || dayTrip?.description,
          url: window.location.href,
        });
      } catch {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)] pt-16">
        <LoadingSpinner size="lg" message="Loading trip details..." />
      </div>
    );
  }

  if (error || !dayTrip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--brand-bg)] pt-16 px-6">
        <MapPin className="w-16 h-16 text-[var(--muted)] mb-4" />
        <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-2">Trip Not Found</h2>
        <p className="text-[var(--muted-foreground)] mb-6">{error || 'Unable to load trip details'}</p>
        <button
          onClick={() => navigate('/day-trips')}
          className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-lg hover:bg-opacity-90 transition"
        >
          Back to Day Trips
        </button>
      </div>
    );
  }

  const displayImage = dayTrip.hero_image_url || dayTrip.image_url;
  const displayDescription = dayTrip.short_description || dayTrip.description;

  return (
    <>
      <SEO
        title={`${dayTrip.name} - Day Trip from ${dayTrip.base_name}`}
        description={displayDescription}
        keywords={`${dayTrip.name}, day trip, ${dayTrip.base_name}, ${dayTrip.best_for.join(', ')}`}
      />

      <div className="min-h-screen bg-[var(--brand-bg)] pt-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/day-trips')}
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--brand-dark)] transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Day Trips</span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={dayTrip.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-dark)] flex items-center justify-center">
              <MapPin className="w-32 h-32 text-white opacity-30" />
            </div>
          )}

          {/* Badges on Hero */}
          <div className="absolute top-6 left-6 flex gap-2">
            {dayTrip.featured && (
              <span className="px-4 py-2 bg-[var(--brand-gold)] text-[var(--brand-dark)] font-bold rounded-full text-sm flex items-center gap-2">
                ⭐ Featured
              </span>
            )}
            {dayTrip.is_must_see && (
              <span className="px-4 py-2 bg-green-500 text-white font-bold rounded-full text-sm">
                Must-See
              </span>
            )}
          </div>

          {dayTrip.rating && (
            <div className="absolute top-6 right-6 px-4 py-2 bg-black bg-opacity-70 text-white font-bold rounded-full text-sm flex items-center gap-2">
              ⭐ {dayTrip.rating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Title and Basic Info */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] mb-4">
              {dayTrip.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[var(--muted-foreground)]">
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-[var(--brand-primary)]" />
                From {dayTrip.base_name}
              </span>
              <span>•</span>
              <span>{dayTrip.distance}</span>
              <span>•</span>
              <span>{dayTrip.drive_time} drive</span>
              {dayTrip.train_time && (
                <>
                  <span>•</span>
                  <span>{dayTrip.train_time} by train</span>
                </>
              )}
            </div>
          </div>

          {/* Tags */}
          {dayTrip.tags && dayTrip.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {dayTrip.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              {displayDescription}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {dayTrip.latitude && dayTrip.longitude && (
              <button
                onClick={handleGetDirections}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--brand-primary)] text-white rounded-lg hover:bg-opacity-90 transition font-semibold"
              >
                <Navigation size={20} />
                Get Directions
              </button>
            )}

            {dayTrip.official_website && (
              <button
                onClick={handleOpenWebsite}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--muted)] text-[var(--brand-dark)] rounded-lg hover:bg-opacity-80 transition font-semibold"
              >
                <Globe size={20} />
                Visit Website
              </button>
            )}

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--muted)] text-[var(--brand-dark)] rounded-lg hover:bg-opacity-80 transition font-semibold"
            >
              <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--muted)] text-[var(--brand-dark)] rounded-lg hover:bg-opacity-80 transition font-semibold"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>

          {/* Quick Facts */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12 border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">Quick Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dayTrip.recommended_duration && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--brand-primary)] mt-1" />
                  <div>
                    <p className="font-semibold text-[var(--brand-dark)]">Recommended Time</p>
                    <p className="text-[var(--muted-foreground)]">{dayTrip.recommended_duration}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[var(--brand-primary)] mt-1" />
                <div>
                  <p className="font-semibold text-[var(--brand-dark)]">Cost</p>
                  <p className="text-[var(--muted-foreground)]">{dayTrip.cost}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Dumbbell className="w-5 h-5 text-[var(--brand-primary)] mt-1" />
                <div>
                  <p className="font-semibold text-[var(--brand-dark)]">Difficulty</p>
                  <p className="text-[var(--muted-foreground)]">{dayTrip.difficulty}</p>
                </div>
              </div>

              {dayTrip.food_info && (
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-[var(--brand-primary)] mt-1" />
                  <div>
                    <p className="font-semibold text-[var(--brand-dark)]">Food</p>
                    <p className="text-[var(--muted-foreground)]">{dayTrip.food_info}</p>
                  </div>
                </div>
              )}

              {dayTrip.ticket_info && (
                <div className="flex items-start gap-3">
                  <Ticket className="w-5 h-5 text-[var(--brand-primary)] mt-1" />
                  <div>
                    <p className="font-semibold text-[var(--brand-dark)]">Tickets</p>
                    <p className="text-[var(--muted-foreground)]">{dayTrip.ticket_info}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Photo Gallery */}
          {dayTrip.photos && dayTrip.photos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayTrip.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.image_url}
                    alt={photo.caption || `${dayTrip.name} photo ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Learn More Section */}
          {(dayTrip.full_description || dayTrip.what_to_see || dayTrip.local_tips || dayTrip.best_time_to_visit) && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-[var(--border)]">
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="w-full flex items-center justify-between text-left mb-4"
              >
                <h2 className="text-2xl font-bold text-[var(--brand-dark)]">Learn More</h2>
                {showFullDescription ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {showFullDescription && (
                <div className="space-y-6">
                  {(dayTrip.full_description || dayTrip.description) && (
                    <div>
                      <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                        {dayTrip.full_description || dayTrip.description}
                      </p>
                    </div>
                  )}

                  {dayTrip.what_to_see && (
                    <div>
                      <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-3">What to See</h3>
                      <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                        {dayTrip.what_to_see}
                      </p>
                    </div>
                  )}

                  {dayTrip.local_tips && (
                    <div>
                      <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-3">Local Tips</h3>
                      <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                        {dayTrip.local_tips}
                      </p>
                    </div>
                  )}

                  {dayTrip.best_time_to_visit && (
                    <div>
                      <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-3">Best Time to Visit</h3>
                      <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                        {dayTrip.best_time_to_visit}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}