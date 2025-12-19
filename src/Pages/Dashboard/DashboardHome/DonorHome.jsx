import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaCheck, FaEdit, FaEye, FaTimes, FaTrash } from 'react-icons/fa';

const DonorHome = () => {
    const { user } = useContext(AuthContext)
    const [latest, setLatest] = useState([])
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(true)

    const fetchLatest = () => {
        axiosSecure.get('/latest')
            .then(res => {
                setLatest(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }
    // console.log(latest.length)

    useEffect(() => {
        fetchLatest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axiosSecure]);
    console.log(latest)

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
                            fetchLatest()

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

    const handleDoneCancel = (id, status) => {
        axiosSecure.patch(`/update/request/status?id=${id}&status=${status}`)
            .then(res => {
                console.log(res.data);
                Swal.fire("Success", `Marked as ${status}`, "success")
                fetchLatest();
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
        <div className="container mx-auto">
            <div className="card lg:card-side flex-col-reverse lg:flex-row bg-base-100 shadow-2xl rounded-3xl">
                <div className="card-body text-center lg:text-left text-3xl md:text-4xl lg:text-5xl">
                    <h2 className=" font-semibold text-secondary">
                        Welcome back 👋
                    </h2>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2">
                        {user?.displayName}
                    </p>

                </div>

                <figure className="p-6 flex justify-center">
                    <img
                        src={user?.photoURL}
                        alt="User profile"
                        className="w-30 h-30 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-2"
                        referrerPolicy="no-referrer"
                    />
                </figure>
            </div>

            {
                latest.length == 0 ? (
                    <div className=" flex justify-center pt-14 items-center">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content/40">
                                You didn't created any<span className="text-primary/40"> request!</span>
                            </h1>

                        </div>
                    </div>
                ) : (
                    <div className='container bg-base-200 mx-auto pt-14 pb-16'>
                        <div className="text-center mb-5">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">My Recent <span className='text-primary'>Donation Requests</span></h3>
                        </div>

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
                                        <th>Done /<br />Cancel</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        latest.map((request, index) =>
                                            <tr key={request?._id} className='text-xs'>
                                                <th>{index + 1}</th>
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
                                                <td>
                                                    <div className="flex flex-wrap gap-2">


                                                        <Link to={`/dashboard/edit-my-request/${request?._id}`}
                                                            className="btn btn-xs btn-accent"
                                                            title="Edit Request">
                                                            <FaEdit className='text-base' />
                                                        </Link>

                                                        <button onClick={() => handleDelete(request?._id)}
                                                            className="btn btn-xs btn-warning"
                                                            title="Delete Request">
                                                            <FaTrash className='text-base' />
                                                        </button>

                                                        <Link to={`/details/${request?._id}`}
                                                            className="btn btn-xs btn-primary"
                                                            title="View Details">
                                                            <FaEye className='text-base' />
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
                            <Link to={'/dashboard/my-requests'}>
                                <button className="btn btn-secondary">View my all request</button>
                            </Link>
                        </div>
                    </div >
                )
            }




        </div>
    );
};

export default DonorHome;