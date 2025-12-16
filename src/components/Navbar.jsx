import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import { FaPaw } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';

const Navbar = () => {

    const { user, setUser, loading } = useContext(AuthContext);


    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                toast.success("Signout successful");
                setUser(null);
            })
            .catch((e) => {
                toast.error(e.message);
            });
    }

    return (
        <div className="navbar bg-base-100 backdrop-blur-xl shadow-xl px-2 lg:px-20 border-b border-white/20  z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0 pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="0"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/pending-requests">Donation Requests</NavLink></li>
                        <li><NavLink to="search">Search</NavLink></li>
                        {
                            user && (<>
                                <li><NavLink to="/funding">Funding</NavLink></li>
                            </>)
                        }

                    </ul>
                </div>
                <div className='flex items-center gap-2 group cursor-pointer'>
                    <div className="rounded-lg bg-linear-to-br from-primary/30 to-secondary/30 p-2 group-hover:from-primary/40 group-hover:to-secondary/40 transition-all">
                        <img
                            src="https://img.icons8.com/?size=100&id=26115&format=png&color=E63946"
                            className="w-5 h-5 md:w-7 md:h-7  group-hover:scale-110 transition-transform"
                            alt="Blood Bridge"
                        />
                    </div>
                    <div>
                        <p className="text-xl md:text-2xl font-bold text-primary leading-none">
                            Blood <span className="text-secondary">Bridge</span>
                        </p>
                    </div>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/pending-requests">Donation Requests</NavLink></li>
                    <li><NavLink to="search">Search</NavLink></li>
                    {
                        user && (<>
                            <li><NavLink to="/funding">Funding</NavLink></li>
                        </>)
                    }
                </ul>
            </div>

            {
                loading ? (
                    <div className="navbar-end flex gap-3">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                ) : (
                    <div className="navbar-end flex items-center gap-2 md:gap-3">
                        {user ? (
                            <>
                                <div className="dropdown dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="flex justify-center items-center gap-2 p-1 bg-base-100 rounded-full cursor-pointer shadow-lg hover:shadow-black/30 transition-all border border-base-300"
                                    >
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-3 ring-primary">
                                                <img
                                                    src={user?.photoURL}
                                                    alt={user?.displayName}
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </div>
                                        <HiDotsVertical className='text-xl text-secondary' />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-base-300 font-bold"
                                    >
                                        <li>
                                            <Link to="/dashboard" className="py-3">
                                                <MdDashboard className='text-xl' />
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleSignOut} className="py-3 text-error">
                                                <CiLogout className='text-xl' />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm md:btn-md btn-primary rounded-full">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-sm md:btn-md btn-secondary rounded-full">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )
            }




        </div>
    );
};

export default Navbar;