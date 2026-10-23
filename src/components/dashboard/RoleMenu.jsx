import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaChevronDown } from 'react-icons/fa';

const RoleMenu = ({ options = [], disabled = false, label = 'Change role' }) => {
    const btnRef = useRef(null);
    const menuRef = useRef(null);
    const [pos, setPos] = useState(null); // null = closed

    const close = useCallback(() => setPos(null), []);

    const toggle = () => {
        if (pos) return close();
        const r = btnRef.current.getBoundingClientRect();
        const menuHeight = options.length * 48 + 24;
        const openUp = r.bottom + menuHeight > window.innerHeight && r.top > menuHeight;
        setPos({
            right: window.innerWidth - r.right,
            ...(openUp ? { bottom: window.innerHeight - r.top + 6 } : { top: r.bottom + 6 }),
        });
    };

    useEffect(() => {
        if (!pos) return;
        const onDown = (e) => {
            if (!menuRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) close();
        };
        const onKey = (e) => e.key === 'Escape' && close();
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        window.addEventListener('resize', close);
        window.addEventListener('scroll', close, true);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', close);
            window.removeEventListener('scroll', close, true);
        };
    }, [pos, close]);

    return (
        <>
            <button
                ref={btnRef}
                type="button"
                onClick={toggle}
                disabled={disabled}
                aria-haspopup="menu"
                aria-expanded={Boolean(pos)}
                className="btn btn-sm btn-outline gap-2"
            >
                {label}
                <FaChevronDown className={`text-xs transition-transform ${pos ? 'rotate-180' : ''}`} />
            </button>

            {pos && createPortal(
                <ul
                    ref={menuRef}
                    role="menu"
                    style={{ position: 'fixed', ...pos }}
                    className="menu bg-base-100 text-base-content rounded-box border border-base-300 shadow-xl w-52 p-2 z-[1000]"
                >
                    {options.map(o => (
                        <li key={o.label} role="none">
                            <button
                                role="menuitem"
                                type="button"
                                onClick={() => { close(); o.onClick(); }}
                                className="flex items-center gap-3"
                            >
                                {o.icon}{o.label}
                            </button>
                        </li>
                    ))}
                </ul>,
                document.body
            )}
        </>
    );
};

export default RoleMenu;