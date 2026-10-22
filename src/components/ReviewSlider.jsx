
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { ChevronRight, MessageSquareQuote } from 'lucide-react';
import SectionTitle from './home/SectionTitle';

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [cardsPerView, setCardsPerView] = useState(1);
    const [loading, setLoading] = useState(true);
    const [expandedReviews, setExpandedReviews] = useState({});

    useEffect(() => {
        const updateView = () => {
            if (window.innerWidth >= 1280) {
                setCardsPerView(4);
            } else if (window.innerWidth >= 768) {
                setCardsPerView(2);
            } else {
                setCardsPerView(1);
            }
        };

        updateView();
        window.addEventListener('resize', updateView);

        return () => window.removeEventListener('resize', updateView);
    }, []);

    useEffect(() => {
        let isMounted = true;

        axios
            .get('https://bloodbridge-puce.vercel.app/review')
            .then((res) => {
                if (isMounted) {
                    setReviews(Array.isArray(res.data) ? res.data : []);
                }
            })
            .catch((err) => {
                console.error('Failed to fetch reviews:', err);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const maxIndex = Math.max(0, reviews.length - cardsPerView);
    const canSlide = reviews.length > cardsPerView;

    // Keep the slider within bounds when the screen size changes.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    useEffect(() => {
        if (isPaused || !canSlide) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 4500);

        return () => clearInterval(interval);
    }, [isPaused, canSlide, maxIndex]);

    const renderStars = (rating) => {
        const value = Math.max(0, Math.min(5, Number(rating) || 0));

        return (
            <div
                className="flex items-center gap-1"
                aria-label={`${value} out of 5 stars`}
            >
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        size={13}
                        className={
                            star <= value
                                ? 'text-amber-400'
                                : 'text-base-300'
                        }
                    />
                ))}
                <span className="ml-1 text-xs font-semibold text-base-content/60">
                    {value.toFixed(1)}
                </span>
            </div>
        );
    };

    const toggleReview = (id) => {
        setExpandedReviews((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (loading) {
        return (
            <section className="bg-base-200 py-16">
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-lg text-primary" />
                </div>
            </section>
        );
    }

    if (reviews.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-base-200 py-16 sm:py-20">
            <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

            <div className="container relative mx-auto px-4 sm:px-6">
                <SectionTitle
                    title="What Our"
                    highlight="Users Say"
                    subtitle="Real experiences from the people who trust BloodBridge."
                />

                <div
                    className="overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocusCapture={() => setIsPaused(true)}
                    onBlurCapture={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            setIsPaused(false);
                        }
                    }}
                >
                    <div
                        className="flex items-stretch py-3 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                        }}
                    >
                        {reviews.map((review, index) => {
                            const id = review._id || `review-${index}`;
                            const comment = String(review.comment || '').trim();
                            const isExpanded = Boolean(expandedReviews[id]);
                            const isLong = comment.length > 180;

                            return (
                                <div
                                    key={id}
                                    className="w-full shrink-0 px-2 sm:px-3 md:w-1/2 xl:w-1/4"
                                >
                                    <article className="group relative flex h-full min-h-[270px] flex-col overflow-hidden border-primary/40 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md hover:shadow-primary/50 sm:p-6">
                                        {/* Top accent */}
                                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-secondary/50 opacity-80 transition-opacity group-hover:opacity-100" />

                                        {/* Quote icon */}
                                        <div className="mb-2 flex items-start justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FaQuoteRight size={17} />
                                            </div>

                                            <MessageSquareQuote
                                                size={22}
                                                className="text-base-content/10"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p
                                                className={`break-words text-sm leading-7 text-base-content/80 ${isExpanded
                                                    ? 'whitespace-pre-wrap'
                                                    : 'line-clamp-4'
                                                    }`}
                                            >
                                                {comment
                                                    ? `“${comment}”`
                                                    : 'No written comment provided.'}
                                            </p>

                                            {isLong && (
                                                <button
                                                    type="button"
                                                    onClick={() => toggleReview(id)}
                                                    aria-expanded={isExpanded}
                                                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                                                >
                                                    {isExpanded
                                                        ? 'Show less'
                                                        : 'Read full review'}
                                                    <ChevronRight
                                                        size={14}
                                                        className={`transition-transform ${isExpanded
                                                            ? '-rotate-90'
                                                            : 'rotate-90'
                                                            }`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        <div className="my-3 border-t border-primary/30" />

                                        <div className="flex items-center gap-3">
                                            {review.userPhoto ? (
                                                <img
                                                    src={review.userPhoto}
                                                    referrerPolicy="no-referrer"
                                                    alt=""
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                                                />
                                            ) : null}

                                            <div
                                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary ring-2 ring-primary/10 ${review.userPhoto ? 'hidden' : ''
                                                    }`}
                                            >
                                                {(review.userName || 'U')
                                                    .trim()
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-sm font-bold text-base-content">
                                                    {review.userName || 'Anonymous user'}
                                                </h3>

                                                <div className="mt-1.5">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {canSlide && (
                    <div className="mt-7 flex justify-center gap-2">
                        {Array.from({ length: maxIndex + 1 }, (_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to review position ${i + 1}`}
                                aria-current={currentIndex === i ? 'true' : undefined}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-base-content/20 hover:bg-primary/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReviewSlider;
