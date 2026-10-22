import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../../components/Aside';
import DashboardTopbar from '../../components/DashboardTopbar';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-base-200">
            <Aside />

            <div className="flex-1 lg:ml-64 overflow-y-auto">
                <DashboardTopbar />
                <div className="p-5 lg:p-6 min-h-[calc(100%-4rem)]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;