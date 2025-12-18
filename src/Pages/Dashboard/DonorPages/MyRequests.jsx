import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import { FaCheck, FaEdit, FaEye, FaTimes, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-my-request/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount == 1) {
                            const filterData = myRequests.filter(req => req?._id != id)
                            setMyRequests(filterData)

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });
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
                <table className="table table-zebra ">
                    <thead className='bg-base-300'>
                        <tr className='bg-secondary text-secondary-content'>
                            <th></th>
                            <th>Recipient <br /> Name</th>
                            <th>Location</th>
                            <th>Donation <br />Date And Time</th>
                            <th>Blood <br />Group</th>
                            <th>Status</th>
                            <th>Donor Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myRequests.map((request, index) =>
                                <tr key={request?._id}>
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
                                        <p className='badge badge-soft badge-outline badge-primary font-bold'>{request?.blood_group}</p>
                                    </td>

                                    <td>
                                        <span className={`badge badge-sm font-medium text-black ${getStatusBadge(request?.donation_status)}`}>
                                            {request?.donation_status}
                                        </span>
                                    </td>

                                    <td>
                                        {request?.donation_status === 'inprogress' ? (
                                            <div className="text-sm">
                                                <p className="font-semibold">{request.donor_name}</p>
                                                <p className="text-base-content/60">{request.donor_email}</p>
                                            </div>
                                        ) : (
                                            <p className="text-base-content/40">N/A</p>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-2">

                                            {request?.donation_status === 'inprogress' && (
                                                <>
                                                    <button // onClick={() => handleDone(request._id)}
                                                        className="btn btn-sm btn-success"
                                                        title="Mark as Done">
                                                        <FaCheck className='text-lg' />
                                                    </button>

                                                    <button // onClick={() => handleCancel(request._id)}
                                                        className="btn btn-sm btn-error "
                                                        title="Cancel Request">
                                                        <FaTimes className='text-lg' />
                                                    </button>
                                                </>
                                            )}

                                            <Link to={`/dashboard/edit-my-request/${request?._id}`}
                                                className="btn btn-sm btn-accent"
                                                title="Edit Request">
                                                <FaEdit className='text-lg' />
                                            </Link>

                                            <button onClick={() => handleDelete(request?._id)}
                                                className="btn btn-sm btn-warning"
                                                title="Delete Request">
                                                <FaTrash className='text-lg' />
                                            </button>

                                            <Link to={`/details/${request?._id}`}
                                                className="btn btn-sm btn-primary"
                                                title="View Details">
                                                <FaEye className='text-lg' />
                                            </Link>
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

export default MyRequests;