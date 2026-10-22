import React from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

// shared card (home + /pending-requests)
const RequestCard = ({ request: r }) => (
    <div className="group card h-full bg-base-100 border border-primary border-l-4  border-l-primary  hover:border-primary hover:-translate-y-2 hover:shadow-xl transition-all duration-300 shadow-md hover:shadow-primary/25">
        <div className="card-body">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl text-heading">{r.recipient_name}</h3>
                <span className="badge badge-primary badge-lg font-bold heartbeat">{r.blood_group}</span>
            </div>
            <ul className="space-y-2 text-base-content/80 mt-2">
                <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" />{r.recipient_upazila}, {r.recipient_district}</li>
                <li className="flex items-center gap-2"><FaCalendarAlt className="text-primary" />{r.donation_date}</li>
                <li className="flex items-center gap-2"><FaClock className="text-primary" />{r.donation_time}</li>
            </ul>
            <Link to={`/details/${r._id}`} className="btn btn-primary btn-sm mt-3 gap-2">
                View Details <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
        </div>
    </div>
);

export default RequestCard;