import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import Loading from '../../../components/Loading';
import AdminHome from './AdminHome';
import DonorHome from './DonorHome';
import VolunteerHome from './VolunteerHome';

const MainDashboard = () => {
    const { role, roleLoading, loading } = useContext(AuthContext)
    if (loading || roleLoading) {
        return <Loading></Loading>
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
    return <Loading />;
};

export default MainDashboard;