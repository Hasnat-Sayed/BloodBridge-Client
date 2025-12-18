import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import { FaCheck, FaEdit, FaEye, FaTimes, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllRequestVolunteer = () => {

    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)

    const axiosSecure = useAxiosSecure()

    const [filter, setFilter] = useState('');

    const fetchRequest = () => {
        axiosSecure.get(`/all-requests?page=${currentPage - 1}&size=${itemsPerPage}&status=${filter}`)
            .then(res => {
                setMyRequests(res.data.request)
                setTotalRequest(res.data.totalRequest)
                setLoading(false);

            })
    }

    useEffect(() => {
        fetchRequest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axiosSecure, currentPage, itemsPerPage, filter])


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

    

    const handleDoneCancel = (id, status) => {
        axiosSecure.patch(`/update/request/status?id=${id}&status=${status}`)
            .then(res => {
                console.log(res.data);
                Swal.fire("Success", `Marked as ${status}`, "success")
                fetchRequest();
            })
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
                    <div className="text-center mb-5">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">All  <span className='text-primary'>Blood</span> Donation Request</h3>
                    </div>
        
        
                    <select onChange={(e) => setFilter(e.target.value)} className="select select-bordered rounded-2xl mb-5" defaultValue="">
                        <option disabled value="">Filter by Status</option>
                        <option value="">All Requests</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
        
        
                    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-2xl">
                        <table className="table table-zebra ">
                            <thead className='bg-base-300'>
                                <tr className='bg-secondary text-sm text-secondary-content'>
                                    <th></th>
                                    <th>Recipient <br /> Name</th>
                                    <th>Location</th>
                                    <th>Donation <br />Date And Time</th>
                                    <th>Blood <br />Group</th>
                                    <th>Donation <br />Status</th>
                                    <th>Donor Info</th>
                                    <th>Done / Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myRequests.map((request, index) =>
                                        <tr key={request?._id} className='text-xs'>
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
                                                <p className='badge badge-soft badge-outline badge-primary font-bold badge-sm'>{request?.blood_group}</p>
                                            </td>
        
                                            <td>
                                                <span className={`badge badge-sm font-medium text-black ${getStatusBadge(request?.donation_status)}`}>
                                                    {request?.donation_status}
                                                </span>
                                            </td>
        
                                            <td>
                                                {request?.donation_status === 'inprogress' ? (
                                                    <div className="text-xs">
                                                        <p className="font-semibold">{request.donor_name}</p>
                                                        <p className="text-base-content/60">{request.donor_email}</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-base-content/40">N/A</p>
                                                )}
                                            </td>
                                            <td>
        
                                                <div className="flex flex-wrap gap-2">
                                                    {request?.donation_status === 'inprogress' ? (
                                                        <>
                                                            <button onClick={() => handleDoneCancel(request._id, 'done')}
                                                                className="btn btn-xs btn-success"
                                                                title="Mark as Done">
                                                                <FaCheck className='text-base' />
                                                            </button>
        
                                                            <button onClick={() => handleDoneCancel(request._id, 'canceled')}
                                                                className="btn btn-xs btn-error "
                                                                title="Cancel Request">
                                                                <FaTimes className='text-base' />
                                                            </button>
                                                        </>
                                                    ) : (<p className="text-base-content/40">N/A</p>)
                                                    }
                                                </div>
        
        
        
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
                            pages.map((page, index) =>
                                <button key={index}
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

export default AllRequestVolunteer;