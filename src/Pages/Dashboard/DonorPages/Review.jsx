import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Review = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (rating === 0) {
            toast.error('Please select a rating');
            setLoading(false);
            return;
        }

        if (comment.trim().length < 10) {
            toast.error('Comment must be at least 10 characters long');
            setLoading(false);
            return;
        }

        const reviewData = {
            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,
            rating,
            comment: comment.trim(),
            createdAt: new Date()
        };

        await axiosSecure.post('/review', reviewData)
            .then(res => {
                console.log(res)
                toast.success('Review submitted successfully!');
                setRating(0);
                setComment('');
                setLoading(false);

            })
    };

    return (
        <div className="flex justify-center px-4 py-1">
            <div className="card bg-base-100 w-full max-w-2xl shadow-2xl  pt-10 pb-8 rounded-2xl">
                <div className="text-center mb-2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                        Submit Your  <span className="text-primary">Review</span>
                    </h1>

                </div>

                <p className="text-center text-sm text-gray-600 mb-6">
                    Share your experience with our blood donation platform
                </p>

                <div className="flex flex-col items-center mb-6">
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-20 h-20 rounded-full mb-2 object-cover"
                    />
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <form onSubmit={handleSubmit} className="card-body pt-0">
                    <fieldset className="fieldset md:px-20">
                        <div className="mb-4">
                            <label className="label flex justify-center">
                                <span className="text-secondary font-semibold text-lg">
                                    Your Rating
                                </span>
                            </label>

                            <div className="flex gap-2 justify-center py-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="transition-transform hover:scale-125 cursor-pointer"
                                    >
                                        <FaStar
                                            size={40}
                                            className={
                                                star <= rating
                                                    ? 'text-yellow-500'
                                                    : 'text-gray-300'
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center flex-col gap-2 items-center mb-4">
                            <label className="label flex justify-center">
                                <span className="label-text text-secondary font-semibold text-lg">
                                    Your Feedback
                                </span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full bg-base-200 h-32 resize-none"
                                placeholder="Share your experience... (minimum 10 characters)"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                minLength={10}
                                required
                            />

                            <label className="label">
                                <span className="label-text-alt text-gray-500">
                                    {comment.length} characters
                                </span>
                            </label>
                        </div>


                        <div className="flex gap-3 mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary flex-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="btn btn-ghost mt-3"
                        >
                            Cancel
                        </button>

                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Review;
