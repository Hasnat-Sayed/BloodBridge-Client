import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const DashboardTopbar = () => {
    const { user } = useContext(AuthContext);
    const name = user?.displayName || 'User';
    const initial = name.charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-20 h-16 shrink-0 flex items-center justify-end gap-3 pl-16 pr-4 lg:pl-6 lg:pr-6 bg-secondary backdrop-blur border-b border-secondary-content/30">
            <Link
                to="/dashboard/profile"
                title="My Profile"
                className="flex items-center gap-3 min-w-0 rounded-full py-1 pl-3 pr-1 hover:bg-base-200 transition-colors"
            >
                <div className="text-right leading-tight min-w-0">
                    <p className="font-semibold text-white truncate max-w-35 sm:max-w-60">{name}</p>
                    <p className="text-xs text-white truncate max-w-35 sm:max-w-60">{user?.email}</p>
                </div>
                {user?.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 shrink-0 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-2"
                    />
                ) : (
                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary text-white font-bold flex items-center justify-center">
                        {initial}
                    </div>
                )}
            </Link>
        </header>
    );
};

export default DashboardTopbar;