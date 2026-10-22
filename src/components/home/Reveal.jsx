import React from 'react';
import useInView from '../../hooks/useInView';

// fade + slide up when scrolled into view. delay in ms for staggering.
const Reveal = ({ children, delay = 0, className = '' }) => {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={`reveal ${inView ? 'in' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default Reveal;