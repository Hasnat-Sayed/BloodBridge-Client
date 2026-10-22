// Aside.jsx - Fixed Sidebar Component
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { MdDashboard, MdArticle, MdLogout, MdMenu, MdClose, MdAddCircleOutline, MdHome } from 'react-icons/md';
import { FaUserPlus, FaChartLine, FaUsers, FaStar } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';
import ThemeToggle from './ThemeToggle';

const Aside = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { role, roleLoading, loading } = useContext(AuthContext)

    const ready = !(loading || roleLoading)

    return (
        <>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-3 left-4 z-50 btn btn-circle btn-primary shadow-lg"
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
                    flex flex-col h-screen overflow-hidden border-r border-secondary-content/30
                `}
            >
                <div className="mt-12 lg:mt-0 px-4 py-4 lg:py-0 lg:h-16 flex items-center border-b border-secondary-content/30">
                    <div className="flex items-center gap-2">
                        <img src="https://img.icons8.com/?size=100&id=26115&format=png&color=E63946" className="w-10 h-10 lg:w-9 lg:h-9" alt="" />
                        <div>
                            <h1 className="text-lg font-bold leading-tight">Blood Bridge</h1>
                            <p className="text-xs mt-0.5 leading-tight opacity-70 min-h-4">
                                {ready && role == 'admin' && 'Admin Dashboard'}
                                {ready && role == 'donor' && 'Donor Dashboard'}
                                {ready && role == 'volunteer' && 'Volunteer Dashboard'}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto">
                    {!ready ? (
                        <div className="p-4 space-y-3" aria-busy="true">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="skeleton h-12 w-full bg-secondary-content/10"></div>
                            ))}
                        </div>
                    ) : (<ul className="menu p-4 space-y-3 w-full">
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
                                    <li>
                                        <NavLink
                                            to="/dashboard/review"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={({ isActive }) =>
                                                `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                            }
                                        >
                                            <FaStar className="text-xl" />Write a Review
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }


                        {/* admin links */}
                        {
                            role == 'admin' && (
                                <>
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
                                    <li>
                                        <NavLink
                                            to="/dashboard/all-requests-admin"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={({ isActive }) =>
                                                `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                            }
                                        >
                                            <MdArticle className="text-xl" />
                                            All Donation Request
                                        </NavLink>
                                    </li>
                                </>

                            )
                        }

                        {/* volunteer links */}
                        {
                            role == 'volunteer' && (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/all-requests-volunteer"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={({ isActive }) =>
                                                `gap-3 py-3 ${isActive ? 'bg-primary text-primary-content' : ''}`
                                            }
                                        >
                                            <MdArticle className="text-xl" />
                                            All Donation Request
                                        </NavLink>
                                    </li>
                                </>

                            )
                        }

                    </ul>
                    )}



                </nav>

                <div className="p-4 border-t border-secondary-content/30 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm opacity-80">Theme</span>
                        <ThemeToggle />
                    </div>
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


