import React, { useEffect, useState } from 'react';
import { FaUsers, FaTint, FaCheckCircle, FaHandHoldingHeart } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import SectionTitle from './SectionTitle';

// counts up from 0 -> value
const Counter = ({ value = 0, prefix = '' }) => {
    const [n, setN] = useState(0);
    useEffect(() => {
        const target = Number(value) || 0;
        if (!target) return;
        const steps = 40;
        let i = 0;
        const t = setInterval(() => {
            i++;
            setN(Math.round((target * i) / steps));
            if (i >= steps) clearInterval(t);
        }, 25);
        return () => clearInterval(t);
    }, [value]);
    return <>{prefix}{(Number(value) ? n : 0).toLocaleString()}</>;
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
        { icon: <FaUsers />, label: 'Registered Donors', value: stats?.totalDonors },
        { icon: <FaTint />, label: 'Blood Requests', value: stats?.totalRequests },
        { icon: <FaCheckCircle />, label: 'Donations Completed', value: stats?.completedDonations },
        { icon: <FaHandHoldingHeart />, label: 'Funds Raised', value: stats?.totalFunds, prefix: '$' },
    ];

    return (
        <section className="bg-base-100 py-16">
            <div className="container mx-auto px-4 lg:px-20">
                <SectionTitle title="Our" highlight="Impact in Numbers" subtitle="Live figures pulled straight from the Blood Bridge database." />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map(item => (
                        <div key={item.label} className="card bg-base-200 border border-base-300 text-center">
                            <div className="card-body items-center p-6">
                                <span className="text-4xl text-primary">{item.icon}</span>
                                <p className="text-3xl md:text-4xl font-bold text-heading">
                                    {stats ? <Counter value={item.value} prefix={item.prefix} /> : <span className="loading loading-dots"></span>}
                                </p>
                                <p className="text-base-content/80 font-medium">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;