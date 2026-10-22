import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import DashboardSkeleton from '../../../components/dashboard/DashboardSkeleton';
import AdminHome from './AdminHome';
import DonorHome from './DonorHome';
import VolunteerHome from './VolunteerHome';

const MainDashboard = () => {
    const { role, roleLoading, loading } = useContext(AuthContext)
    if (loading || roleLoading) {
        return <DashboardSkeleton cards={role === 'admin' ? 8 : 4} />;
    }
    if (role == 'admin') {
        return <AdminHome></AdminHome>
    }
    if (role == 'donor') {
        return <DonorHome></DonorHome>
    }
    if(role == 'volunteer'){
        return <VolunteerHome></VolunteerHome>
    }
    return <DashboardSkeleton />;;
};

export default MainDashboard;