import React from 'react';

const Loading = ({ className = 'min-h-[60vh]' }) => {
    return (
        <div className={`flex justify-center items-center ${className}`} role="status" aria-label="Loading">
            <span className="loading loading-spinner w-16 text-primary"></span>
        </div>
    );
};

export default Loading;