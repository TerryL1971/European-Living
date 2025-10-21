// src/pages/businesses/BusinessDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getBusinessById,
  getReviewsByBusiness,
  Business,
  Review,
} from "../../services/businessServices";
import { Star, MapPin, Phone, Mail, Globe, ArrowLeft, Navigation } from "lucide-react";
import MapView from "../../components/MapView";

export default function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        const [bizData, reviewData] = await Promise.all([
          getBusinessById(id),
          getReviewsByBusiness(id),
        ]);
        setBusiness(bizData);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error loading business:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <p className="text-[var(--brand-dark)]">Loading business...</p>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
            Business not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[var(--brand-primary)] text-white px-5 py-2 rounded-lg hover:bg-[var(--brand-dark)] transition"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--brand-primary)] hover:text-[var(--brand-dark)] mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Featured Layout - Large format with image + map side by side */}
        {business.featured ? (
          <div className="bg-[var(--brand-primary)] bg-opacity-95 rounded-xl p-8 shadow-xl">
            {/* Image and Map Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Business Image */}
              {business.imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={business.imageUrl}
                    alt={business.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Map with directions */}
              {business.latitude && business.longitude && (
                <div className="relative rounded-lg overflow-hidden">
                  <MapView
                    center={[business.latitude, business.longitude]}
                    zoom={15}
                    height="h-64"
                    markers={[
                      {
                        position: [business.latitude, business.longitude],
                        title: business.name,
                        description: business.address,
                      },
                    ]}
                  />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-[var(--brand-gold)] text-[var(--brand-dark)] px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-400 transition flex items-center gap-2 text-sm font-semibold z-[1000]"
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </a>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-[var(--brand-gold)] text-[var(--brand-dark)] px-3 py-1 rounded-full text-sm font-bold">
                ⭐ FEATURED
              </span>
              {business.verified && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ VERIFIED
                </span>
              )}
              {business.englishFluency && (
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  {business.englishFluency} English
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{business.name}</h1>
            <p className="text-white opacity-90 mb-4 text-lg">{business.description}</p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white mb-4">
              <div>
                <p>
                  <strong>📍 Location:</strong> {business.location}
                </p>
                {business.address && <p className="ml-5 opacity-80">{business.address}</p>}
                {business.baseDistance && (
                  <p>
                    <strong>🚗 Distance:</strong> {business.baseDistance}
                  </p>
                )}
              </div>
              <div>
                {business.phone && (
                  <p>
                    <strong>📞 Phone:</strong>{" "}
                    <a href={`tel:${business.phone}`} className="underline hover:text-[var(--brand-gold)]">
                      {business.phone}
                    </a>
                  </p>
                )}
                {business.email && (
                  <p>
                    <strong>✉️ Email:</strong>{" "}
                    <a href={`mailto:${business.email}`} className="underline hover:text-[var(--brand-gold)]">
                      {business.email}
                    </a>
                  </p>
                )}
                {business.website && (
                  <p>
                    <strong>🌐 Website:</strong>{" "}
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--brand-gold)]">
                      Visit Site
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Insider Tip */}
            {business.notes && (
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-white text-sm">
                  <strong>💡 Insider Tip:</strong> {business.notes}
                </p>
              </div>
            )}

            {/* Reviews Section */}
            <div className="border-t border-white/20 pt-6 mt-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Reviews from Military Families
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-white">{review.userName}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-white opacity-90">{review.comment}</p>
                      )}
                      {review.createdAt && (
                        <p className="text-xs text-white opacity-60 mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white opacity-80">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        ) : (
          /* Standard Layout - Regular business detail page */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Only show image if it exists */}
            {business.imageUrl && (
              <div className="w-full h-64 bg-gray-100">
                <img
                  src={business.imageUrl}
                  alt={business.name ?? "Business"}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">
                    {business.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    {business.verified && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>
                </div>

                {reviews.length > 0 && (
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(avgRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{reviews.length} reviews</p>
                  </div>
                )}
              </div>

              <p className="text-[var(--brand-dark)] opacity-80 mb-6 text-lg">
                {business.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />
                    <div>
                      <p className="font-semibold text-[var(--brand-dark)]">Location</p>
                      <p className="text-gray-600">{business.location}</p>
                      {business.address && (
                        <p className="text-sm text-gray-500">{business.address}</p>
                      )}
                      {business.baseDistance && (
                        <p className="text-sm text-[var(--brand-primary)]">
                          {business.baseDistance}
                        </p>
                      )}
                    </div>
                  </div>

                  {business.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
                      <div>
                        <p className="font-semibold text-[var(--brand-dark)]">Phone</p>
                        <a
                          href={`tel:${business.phone}`}
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          {business.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {business.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
                      <div>
                        <p className="font-semibold text-[var(--brand-dark)]">Email</p>
                        <a
                          href={`mailto:${business.email}`}
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          {business.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {business.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[var(--brand-primary)]" />
                      <div>
                        <p className="font-semibold text-[var(--brand-dark)]">Website</p>
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}

                  {business.englishFluency && (
                    <div>
                      <p className="font-semibold text-[var(--brand-dark)]">
                        English Fluency
                      </p>
                      <p className="text-gray-600 capitalize">
                        {business.englishFluency}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {business.notes && (
                <div className="bg-[var(--brand-bg)] rounded-lg p-4 mb-8">
                  <p className="text-sm text-[var(--brand-dark)] opacity-80">
                    <strong>💡 Insider Tip:</strong> {business.notes}
                  </p>
                </div>
              )}

              {/* Reviews */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-6">
                  Reviews from Military Families
                </h2>

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-[var(--brand-bg)] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-[var(--brand-dark)]">
                            {review.userName}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-[var(--brand-dark)] opacity-80">{review.comment}</p>
                        )}
                        {review.createdAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}