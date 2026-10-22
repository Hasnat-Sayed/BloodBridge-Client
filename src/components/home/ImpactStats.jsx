import React, { useEffect, useState } from 'react';
import { FaUsers, FaTint, FaCheckCircle, FaHandHoldingHeart } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import useInView from '../../hooks/useInView';

// counts up from 0 -> value
const Counter = ({ value = 0, prefix = '' }) => {
    const [n, setN] = useState(0);
    const [ref, inView] = useInView(0.4);
    useEffect(() => {
        const target = Number(value) || 0;
        if (!target || !inView) return;
        const steps = 40;
        let i = 0;
        const t = setInterval(() => {
            i++;
            setN(Math.round((target * i) / steps));
            if (i >= steps) clearInterval(t);
        }, 25);
        return () => clearInterval(t);
    }, [value, inView]);
    return <span ref={ref}>{prefix}{(Number(value) ? n : 0).toLocaleString()}</span>;
};

const ImpactStats = () => {
    const axiosInstance = useAxios();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axiosInstance.get('/public-stats')
            .then(res => setStats(res.data))
            .catch(() => setStats({}));
    }, [axiosInstance]);

    const items = [
        { icon: <FaUsers />, label: 'Registered Donors', value: stats?.totalDonors, tone: 'from-secondary/95' },
        { icon: <FaTint />, label: 'Blood Requests', value: stats?.totalRequests, tone: 'from-primary/60' },
        { icon: <FaCheckCircle />, label: 'Donations Completed', value: stats?.completedDonations, tone: 'from-neutral/70' },
        { icon: <FaHandHoldingHeart />, label: 'Funds Raised', value: stats?.totalFunds, prefix: '$', tone: 'from-accent/70' },
    ];

    return (
        <section className="bg-base-100 py-16">
            <div className="container mx-auto px-4 lg:px-20">
                <SectionTitle title="Our" highlight="Impact in Numbers" subtitle="Live figures pulled straight from the Blood Bridge database." />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, i) => (
                        <Reveal key={item.label} delay={i * 100}>
                        <div className={`group card h-full bg-linear-to-b ${item.tone} to-base-200 border border-base-300 shadow-sm text-center hover:-translate-y-2 hover:shadow-xl hover:border-primary transition-all duration-300`}>
                            <div className="card-body items-center p-6">
                                <span className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center text-3xl text-primary shadow group-hover:bg-primary group-hover:text-primary-content group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{item.icon}</span>
                                <p className="text-3xl md:text-4xl font-bold text-heading">
                                    {stats ? <Counter value={item.value} prefix={item.prefix} /> : <span className="loading loading-dots"></span>}
                                </p>
                                <p className="text-base-content/80 font-medium">{item.label}</p>
                            </div>
                        </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;