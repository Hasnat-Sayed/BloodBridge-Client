import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Loading from './Loading';

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
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (!isPaused && reviews.length > cardsPerView) {
            const interval = setInterval(() => {
                setCurrentIndex(prev =>
                    prev >= reviews.length - cardsPerView ? 0 : prev + 1
                );
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [reviews.length, isPaused, cardsPerView]);

    const renderStars = (rating) => (
        <div className="flex gap-1 justify-center">
            {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                    key={star}
                    size={18}
                    className={star <= rating ? 'text-yellow-400' : 'text-gray-200'}
                />
            ))}
        </div>
    );
    if(loading) return <Loading></Loading>

    return (
        <div className="bg-base-300 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
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
                                className="w-full lg:w-1/3 px-5 shrink-0 hover:scale-105 duration-300"
                            >
                                <div className="card rounded-2xl bg-linear-to-br from-primary/80 to-primary/10 p-6 h-full">
                                    <div className="flex justify-center mb-4">
                                        <FaQuoteLeft className="text-primary text-3xl" />
                                    </div>

                                    <div className="flex flex-col items-center mb-2">
                                        <img
                                            src={review.userPhoto}
                                            className="w-20 h-20 object-cover rounded-full mb-2 ring-4 ring-primary"
                                            alt={review.userName}
                                        />
                                        <h3 className="text-xl font-semibold">{review.userName}</h3>
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="bg-linear-to-r from-secondary/50 to-accent/50 px-6 py-3 rounded-full shadow-inner">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>

                                    <p className="text-center text-gray-700 italic mt-3">
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
