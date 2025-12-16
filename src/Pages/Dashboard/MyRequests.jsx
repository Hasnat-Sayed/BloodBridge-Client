import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading';

const MyRequests = () => {

    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(true)

    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequests(res.data.request)
                setTotalRequest(res.data.totalRequest)

                setLoading(false);

            })
    }, [axiosSecure, currentPage, itemsPerPage])

    // console.log(myRequests)
    // console.log(totalRequest)

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: 'badge-warning',
            inprogress: 'badge-info',
            done: 'badge-success',
            canceled: 'badge-error'
        };
        return statusConfig[status] || 'badge-ghost';
    };

    if (loading) return <Loading></Loading>

    return (
        <div className='container bg-base-200 mx-auto pt-6 pb-16 min-h-screen'>
            <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">My <span className='text-primary'>Requests</span></h3>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-2xl">
                <table className="table">
                    <thead className='bg-base-300'>
                        <tr className='bg-secondary text-secondary-content'>
                            <th></th>
                            <th>Recipient Name</th>
                            <th>Location</th>
                            <th>Donation <br />Date &Time</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Donor Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myRequests.map((request, index) =>
                                <tr key={request?._id} className="hover:bg-base-200">
                                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td><p className="font-bold">{request?.recipient_name}</p></td>
                                    <td>
                                        <p className="font-bold">{request?.recipient_district}</p>
                                        <p className='text-base-content/80'>{request?.recipient_upazila}</p>
                                    </td>

                                    <td><p className="font-bold">{request?.donation_date}</p>
                                        <p className='text-base-content/80'>{request?.donation_time}</p>
                                    </td>

                                    <td>
                                        <p className='badge badge-outline badge-primary font-bold'>{request?.blood_group}</p>
                                    </td>

                                    <td>
                                        <span className={`badge text-black ${getStatusBadge(request?.donation_status)}`}>
                                            {request?.donation_status}
                                        </span>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex justify-center mt-12 gap-4'>
                <button onClick={handlePrev} className="btn btn-accent">Prev</button>
                {
                    pages.map(page =>
                        <button
                            className={`btn btn-outline ${page === currentPage ?
                                'bg-secondary text-white' : ''}`}
                            onClick={() => setCurrentPage(page)}>

                            {page}
                        </button>
                    )
                }
                <button onClick={handleNext} className="btn btn-accent">Next</button>
            </div>
        </div >
    );
};

export default MyRequests;