import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-96">
            <div className="w-20 h-20 border-8 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;