import React from 'react';

const SectionTitle = ({ title, highlight, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
            {title} <span className="text-primary">{highlight}</span>
        </h2>
        {subtitle && (
            <p className="text-lg text-base-content/80 max-w-3xl mx-auto">{subtitle}</p>
        )}
    </div>
);

export default SectionTitle;