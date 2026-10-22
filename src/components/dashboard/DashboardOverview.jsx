import React, { useEffect, useState } from 'react';
import { FaUsers, FaDonate, FaTint, FaHourglassHalf, FaCheckCircle, FaUserFriends, FaSpinner } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading';
import StatCard from './StatCard';
import DashboardCharts from './DashboardCharts';

const count = (list, status) => list.filter(r => r.donation_status === status).length;

// role: 'admin' | 'volunteer' | 'donor'
const DashboardOverview = ({ role }) => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ requests: [], funds: [], stats: {}, users: [] });

    useEffect(() => {
        const requestUrl = role === 'donor'
            ? '/my-request?page=0&size=1000&status='
            : '/all-requests?page=0&size=1000&status=';

        const calls = [
            axiosSecure.get(requestUrl).then(r => r.data.request || []).catch(() => []),
            role === 'donor' ? Promise.resolve({}) : axiosSecure.get('/stats').then(r => r.data).catch(() => ({})),
            role === 'donor' ? Promise.resolve([]) : axiosSecure.get('/all-funds').then(r => r.data).catch(() => []),
            role === 'admin' ? axiosSecure.get('/users').then(r => r.data).catch(() => []) : Promise.resolve([]),
        ];

        Promise.all(calls).then(([requests, stats, funds, users]) => {
            setData({ requests, stats, funds, users });
            setLoading(false);
        });
    }, [axiosSecure, role]);

    if (loading) return <Loading />;

    const { requests, funds, stats, users } = data;

    const cards = {
        admin: [
            { icon: <FaUserFriends />, label: 'Total Users', value: users.length },
            { icon: <FaUsers />, label: 'Total Donors', value: stats.totalDonors },
            { icon: <FaDonate />, label: 'Total Funding', value: stats.totalFunds, prefix: '$' },
            { icon: <FaTint />, label: 'Blood Requests', value: stats.totalRequest },
            { icon: <FaHourglassHalf />, label: 'Pending Requests', value: count(requests, 'pending') },
            { icon: <FaCheckCircle />, label: 'Completed Donations', value: count(requests, 'done') },
        ],
        volunteer: [
            { icon: <FaUsers />, label: 'Total Donors', value: stats.totalDonors },
            { icon: <FaTint />, label: 'Blood Requests', value: stats.totalRequest },
            { icon: <FaHourglassHalf />, label: 'Pending Requests', value: count(requests, 'pending') },
        ],
        donor: [
            { icon: <FaTint />, label: 'My Requests', value: requests.length },
            { icon: <FaHourglassHalf />, label: 'Pending', value: count(requests, 'pending') },
            { icon: <FaSpinner />, label: 'In Progress', value: count(requests, 'inprogress') },
            { icon: <FaCheckCircle />, label: 'Completed', value: count(requests, 'done') },
        ],
    }[role] || [];

    return (
        <section className="mt-10">
            <h3 className="text-2xl md:text-4xl font-bold text-heading text-center mb-6">
                Dashboard <span className="text-primary">Overview</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {cards.map(c => <StatCard key={c.label} {...c} />)}
            </div>
            <DashboardCharts requests={requests} funds={funds} showFunding={role === 'admin'} />
        </section>
    );
};

export default DashboardOverview;