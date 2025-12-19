import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { FaDonate, FaTint, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';

const AdminHome = () => {
    const { user } = useContext(AuthContext)
    const [stats, setStats] = useState([])
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosSecure.get('/stats')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [axiosSecure]);


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

            <div className="text-center mt-14">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary">Dashboard <span className='text-primary'> Overview</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

                <div className="card bg-base-100 shadow-2xl  rounded-2xl hover:shadow-2xl hover:shadow-red-300 hover:-translate-y-2 transition-all duration-300 ">
                    <div className="card-body items-center text-center">
                        <FaUsers className="text-7xl text-primary" />
                        <h2 className="text-4xl font-bold my-3">
                            {stats?.totalDonors}
                        </h2>
                        <p className="text-accent text-2xl font-semibold">
                            Total Donors
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-2xl  rounded-2xl hover:shadow-2xl hover:shadow-red-300 hover:-translate-y-2 transition-all duration-300 ">
                    <div className="card-body items-center text-center">
                        <FaDonate className="text-7xl text-primary" />
                        <h2 className="text-4xl font-bold my-3">
                            $ {stats?.totalFunds}
                        </h2>
                        <p className="text-accent text-2xl font-semibold">
                            Total Funding
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-2xl  rounded-2xl hover:shadow-2xl hover:shadow-red-300 hover:-translate-y-2 transition-all duration-300 ">
                    <div className="card-body items-center text-center">
                        <FaTint className="text-7xl text-primary" />
                        <h2 className="text-4xl font-bold my-3">
                            {stats?.totalRequest}
                        </h2>
                        <p className="text-accent text-2xl  font-semibold">
                            Blood Requests
                        </p>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default AdminHome;