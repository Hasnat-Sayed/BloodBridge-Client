import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import RequestCard from '../RequestCard';
import useAxios from '../../hooks/useAxios';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

const UrgentRequests = () => {
    const axiosInstance = useAxios();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/pending-requests?page=0&size=6')
            .then(res => setRequests(res.data.requests || []))
            .catch(() => setRequests([]))
            .finally(() => setLoading(false));
    }, [axiosInstance]);

    return (
        <section className="bg-base-300 py-16">
            <div className="container mx-auto px-4 lg:px-20">
                <SectionTitle title="Urgent" highlight="Blood Requests" subtitle="People waiting for a donor right now. Open a request to help." />

                {loading ? (
                    <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                ) : requests.length === 0 ? (
                    <p className="text-center text-base-content/70">No pending requests at the moment. Thank you, donors!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map((r, i) => (
                            <Reveal key={r._id} delay={(i % 3) * 100} className="h-full">
                                <RequestCard request={r} className="bg-base-200" />
                            </Reveal>
                        ))}
                    </div>
                )}

                <div className="text-center mt-10">
                    <Link to="/pending-requests" className="btn btn-outline btn-primary hover:scale-105 transition-transform">See all requests</Link>
                </div>
            </div>
        </section>
    );
};

export default UrgentRequests;