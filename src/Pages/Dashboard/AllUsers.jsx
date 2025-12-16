import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Loading from '../../components/Loading';
import { Link } from 'react-router';
import { FaBan, FaUnlock, FaUserCheck, FaUserShield } from 'react-icons/fa';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = () => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }
    

    useEffect(() => {
        fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axiosSecure])


    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                console.log(res.data);
                fetchUsers();
            })
    }

    const handleMakeVolunteer = (email, role) => {
        axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`)
            .then(res => {
                console.log(res.data);
                fetchUsers();
            })
    }

    const handleMakeAdmin = (email, role) => {
        axiosSecure.patch(`/update/user/admin?email=${email}&role=${role}`)
            .then(res => {
                console.log(res.data);
                fetchUsers();
            })
    }





    if (loading) return <Loading></Loading>
    return (
        <div className='container bg-base-200 mx-auto pt-10 pb-16 px-4 lg:px-20 min-h-screen'>
            <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">All <span className='text-primary'>Users</span></h3>
            </div>


            <div className="overflow-x-auto rounded-xl shadow-2xl">
                <table className="table">
                    <thead className='text-primary text-xl bg-base-100'>
                        <tr>
                            <th>User Info</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map(user =>
                                <tr key={user?._id} className='bg-base-200'>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.mainPhotoUrl}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name}</div>
                                                <p className='text-base-content/80'>{user?.email}</p>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={`badge text-white badge-lg ${user.role === 'admin' ? 'badge-primary' : user.role === 'volunteer' ? 'badge-secondary' : 'badge-accent'}`}>
                                            {user?.role}
                                        </p>
                                    </td>
                                    <td>
                                        <p className={`badge badge-outline text-lg font-semibold 
                                        ${user?.status == 'active' ? 'text-success' : 'text-error'}`}>
                                            {user?.status}
                                        </p>
                                    </td>


                                    <td>
                                        <div className='flex flex-wrap gap-3'>

                                            {/* block and unblock */}
                                            {
                                                user?.status == 'active' ? (
                                                    <button
                                                        onClick={() => handleStatusChange(user?.email, 'blocked')} className="btn btn-error text-white btn-sm rounded-2xl">
                                                        <FaBan className="text-sm" />Block
                                                    </button>) : (
                                                    <button
                                                        onClick={() => handleStatusChange(user?.email, 'active')} className="btn btn-accent btn-sm rounded-2xl">
                                                        <FaUnlock className="text-sm" />Unblock
                                                    </button>
                                                )
                                            }

                                            {/* make volunteer */}
                                            {user?.role === 'donor' && (
                                                <button
                                                    onClick={() => handleMakeVolunteer(user?.email, 'volunteer')}
                                                    className="btn btn-sm rounded-2xl btn-secondary "
                                                >
                                                    <FaUserCheck className="text-sm" />
                                                    Make Volunteer
                                                </button>
                                            )}

                                            {/* make admin */}
                                            {(user?.role == 'donor' || user?.role == 'volunteer') && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user?.email, 'admin')}
                                                    className="btn btn-sm btn-success rounded-2xl"
                                                >
                                                    <FaUserShield className="text-sm" />
                                                    Make Admin
                                                </button>
                                            )}


                                        </div>
                                    </td>

                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>



        </div>
    );
};

export default AllUsers;