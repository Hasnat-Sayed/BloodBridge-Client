import React from 'react';
import WelcomeCard from './WelcomeCard';
import DashboardOverview from '../../../components/dashboard/DashboardOverview';

const VolunteerHome = () => (
    <div className="container mx-auto">
        <WelcomeCard />
        <DashboardOverview role="volunteer" />
    </div>
);

export default VolunteerHome;