import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../../components/Aside';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-base-200">
            <Aside />

            <div className="flex-1 lg:ml-64 overflow-y-auto">
                <div className="p-5 lg:p-6 pt-20 lg:pt-6 min-h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;