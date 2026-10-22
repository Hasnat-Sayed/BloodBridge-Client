import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [cardsPerView, setCardsPerView] = useState(1);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const updateView = () => {
            setCardsPerView(window.innerWidth >= 1024 ? 3 : 1);
        };
        updateView();
        window.addEventListener('resize', updateView);
        return () => window.removeEventListener('resize', updateView);
    }, []);


    useEffect(() => {
        axios.get('https://bloodbridge-puce.vercel.app/review')
            .then(res => {
                setReviews(res.data)
                setLoading(false)
            })
            .catch(err => { console.log(err); setLoading(false) })
    }, []);

    useEffect(() => {
        if (!isPaused && reviews.length > cardsPerView) {
            const interval = setInterval(() => {
                setCurrentIndex(prev =>
                    prev >= reviews.length - cardsPerView ? 0 : prev + 1
                );
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [reviews.length, isPaused, cardsPerView]);

    const renderStars = (rating) => (
        <div className="flex gap-1 justify-center">
            {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                    key={star}
                    size={18}
                    className={star <= rating ? 'text-yellow-400' : 'text-base-300'}
                />
            ))}
        </div>
    );
    if (loading) return <div className="bg-base-200 py-16 flex justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
    if (reviews.length === 0) return null

    return (
        <div className="bg-base-200 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
                        What Our <span className='text-primary'>Users Say</span>
                    </h2>

                </div>

                <div
                    className="relative overflow-hidden hover:cursor-pointer "
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className="flex py-2 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
                        }}
                    >
                        {reviews.map((review, index) => (
                            <div
                                key={review._id || index}
                                className="w-full lg:w-1/3 px-5 shrink-0 hover:scale-[1.02] duration-300"
                            >
                                <div className="card rounded-2xl bg-base-100 border border-base-300 shadow-md p-6 h-full">
                                    <div className="flex justify-center mb-4">
                                        <FaQuoteLeft className="text-primary text-3xl" />
                                    </div>

                                    <div className="flex flex-col items-center mb-2">
                                        <img
                                            src={review.userPhoto}
                                            className="w-20 h-20 object-cover rounded-full mb-2 ring-4 ring-primary"
                                            alt={review.userName}
                                        />
                                        <h3 className="text-xl font-semibold text-heading">{review.userName}</h3>
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="bg-base-200 px-6 py-3 rounded-full">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>

                                    <p className="text-center text-base-content/80 italic mt-3">
                                        “{review.comment}”
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewSlider;