import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { FaCalendarAlt, FaClock, FaEye, FaMapMarkerAlt } from 'react-icons/fa';
import Loading from '../components/Loading';

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/pending-requests')
            .then(res => {
                console.log(res.data)
                setRequests(res.data)
                setLoading(false)
            })

    }, [axiosInstance])


    return (
        <div className='container bg-base-200 mx-auto pt-10 pb-16 px-4 lg:px-20 min-h-screen'>
            <div className="text-center mb-4">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-base-content">Pending <span className='text-primary'>Blood</span> Donation <span className='text-accent'>Requests</span></h3>
            </div>

            {
                loading ? (<Loading></Loading>) : (
                    <div className="mt-6 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map(request => (
                            <div key={request?._id}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl hover:border-primary hover:-translate-y-2 transition-all duration-300 border border-secondary/20">
                                <div className="card-body">

                                    <div className="flex justify-between items-start pb-3 border-b border-secondary/30">
                                        <h3 className="font-bold text-2xl  text-secondary">{request.recipient_name}</h3>
                                        <div className="badge badge-primary badge-lg font-bold text-lg px-4 py-4">
                                            {request?.blood_group}
                                        </div>
                                    </div>

                                    <div className="space-y-3 mt-2 pb-2 border-b border-secondary/30">
                                        <div className="flex items-center gap-2 text-base-content/80">
                                            <FaMapMarkerAlt className="text-error text-xl" />
                                            <span className="font-medium text-lg">
                                                {request?.recipient_upazila}, {request?.recipient_district}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-base-content/80">
                                            <FaCalendarAlt className="text-primary text-xl" />
                                            <span className="font-medium text-lg">{request?.donation_date}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-base-content/80">
                                            <FaClock className="text-accent text-xl" />
                                            <span className="font-medium text-lg">{request?.donation_time}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions mt-2">
                                        <button className="btn btn-primary w-full gap-2">
                                            <FaEye />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default DonationRequests;