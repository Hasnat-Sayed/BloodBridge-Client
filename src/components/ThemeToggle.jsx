import React, { useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const getInitialTheme = () =>
    document.documentElement.getAttribute('data-theme') || 'light';

const ThemeToggle = ({ className = '' }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className={`btn btn-ghost btn-circle ${className}`}
        >
            {isDark ? <MdLightMode className="text-2xl" /> : <MdDarkMode className="text-2xl" />}
        </button>
    );
};

export default ThemeToggle;