import { useEffect, useRef, useState } from 'react';

const useInView = (threshold = 0.15) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(() => !('IntersectionObserver' in window));

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (inView) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
        }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threshold]);

    return [ref, inView];
};

export default useInView;