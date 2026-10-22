import React from 'react';
import Reveal from './Reveal';

const SectionTitle = ({ title, highlight, subtitle }) => (
    <Reveal className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
            {title} <span className="text-primary">{highlight}</span>
        </h2>
        <div className="flex items-center justify-center gap-1 mb-4" aria-hidden="true">
            <span className="h-1 w-10 rounded-full bg-primary"></span>
            <span className="h-1 w-3 rounded-full bg-accent"></span>
            <span className="h-1 w-1.5 rounded-full bg-primary/50"></span>
        </div>
        {subtitle && (
            <p className="text-lg text-base-content/80 max-w-3xl mx-auto">{subtitle}</p>
        )}
    </Reveal>
);

export default SectionTitle;