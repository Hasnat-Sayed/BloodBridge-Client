import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import SectionTitle from './SectionTitle';

const UrgentRequests = () => {
    const axiosInstance = useAxios();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/pending-requests')
            .then(res => setRequests(Array.isArray(res.data) ? res.data.slice(0, 6) : []))
            .catch(() => setRequests([]))
            .finally(() => setLoading(false));
    }, [axiosInstance]);

    return (
        <section className="bg-base-100 py-16">
            <div className="container mx-auto px-4 lg:px-20">
                <SectionTitle title="Urgent" highlight="Blood Requests" subtitle="People waiting for a donor right now. Open a request to help." />

                {loading ? (
                    <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                ) : requests.length === 0 ? (
                    <p className="text-center text-base-content/70">No pending requests at the moment. Thank you, donors!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map(r => (
                            <div key={r._id} className="card bg-base-200 border border-base-300 hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-md">
                                <div className="card-body">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-xl text-heading">{r.recipient_name}</h3>
                                        <span className="badge badge-primary badge-lg font-bold">{r.blood_group}</span>
                                    </div>
                                    <ul className="space-y-2 text-base-content/80 mt-2">
                                        <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" />{r.recipient_upazila}, {r.recipient_district}</li>
                                        <li className="flex items-center gap-2"><FaCalendarAlt className="text-primary" />{r.donation_date}</li>
                                        <li className="flex items-center gap-2"><FaClock className="text-primary" />{r.donation_time}</li>
                                    </ul>
                                    <Link to={`/details/${r._id}`} className="btn btn-primary btn-sm mt-3">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-10">
                    <Link to="/pending-requests" className="btn btn-outline btn-primary">See all requests</Link>
                </div>
            </div>
        </section>
    );
};

export default UrgentRequests;