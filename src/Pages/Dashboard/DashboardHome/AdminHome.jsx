import React from 'react';
import WelcomeCard from './WelcomeCard';
import DashboardOverview from '../../../components/dashboard/DashboardOverview';

const AdminHome = () => (
    <div className="container mx-auto">
        <WelcomeCard />
        <DashboardOverview role="admin" />
    </div>
);

export default AdminHome;