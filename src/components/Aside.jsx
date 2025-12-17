// Aside.jsx - Fixed Sidebar Component
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { MdDashboard, MdArticle, MdLogout, MdMenu, MdClose, MdAddCircleOutline, MdHome } from 'react-icons/md';
import { FaUserPlus, FaChartLine, FaUsers } from 'react-icons/fa';
import { BiDonateBlood } from 'react-icons/bi';
import { AuthContext } from '../provider/AuthProvider';
import Loading from './Loading';

const Aside = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { role, roleLoading } = useContext(AuthContext)

    if(roleLoading) return <Loading></Loading>
 
    return (
        <>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 btn btn-circle btn-primary shadow-lg"
            >
                {isSidebarOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
            </button>

            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-secondary text-secondary-content transform transition-transform duration-300 ease-in-out 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                    flex flex-col h-screen overflow-hidden
                `}
            >
                <div className="mt-12 lg:mt-0 p-6 border-b border-secondary-content/40">
                    <div className="flex items-center gap-2">
                        <img src="https://img.icons8.com/?size=100&id=26115&format=png&color=E63946" className="w-12 h-12" alt="" />
                        <div>
                            <h1 className="text-xl font-bold">Blood Bridge</h1>
                            <p className="text-xs mt-1 opacity-70">
                                {role == 'admin' && 'Admin Dashboard'}
                                {role == 'donor' && 'Donor Dashboard'}
                                {role == 'volunteer' && 'Volunteer Dashboard'}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto">
                    <ul className="menu p-4 space-y-3 w-full">
                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`}
                            >
                                <MdDashboard className="text-xl" />
                                Dashboard
                            </NavLink>
                        </li>


                        {/* donor links */}
                        {
                            role == 'donor' && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/create-request"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={({ isActive }) =>
                                                `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                            }
                                        >
                                            <MdAddCircleOutline className="text-xl" />Create Donation Request
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/dashboard/my-requests"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={({ isActive }) =>
                                                `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                            }
                                        >
                                            <MdArticle className="text-xl" />My Donation Requests
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }


                        {/* admin links */}
                        {
                            role == 'admin' && (
                                <li>
                                    <NavLink
                                        to="/dashboard/all-users"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                        }
                                    >
                                        <FaUsers className="text-xl" />
                                        All Users
                                    </NavLink>
                                </li>
                            )
                        }


                        <li>
                            <NavLink
                                to="/dashboard/content-management"
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                }
                            >
                                <MdArticle className="text-xl" />
                                Content Management
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/statistics"
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                }
                            >
                                <FaChartLine className="text-xl" />
                                Statistics
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                }
                            >
                                <FaUserPlus className="text-xl" />
                                My Profile
                            </NavLink>
                        </li>
                    </ul>


                </nav>

                <div className="p-4 border-t border-secondary-content/40">
                    <Link
                        to='/'
                        className="btn btn-accent btn-block gap-2"
                    >
                        <MdHome className="text-xl" />
                        Back to Home
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Aside;


