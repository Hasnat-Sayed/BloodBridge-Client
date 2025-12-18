import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import Loading from '../../../components/Loading';
import AdminHome from './AdminHome';
import DonorHome from './DonorHome';
import VolunteerHome from './VolunteerHome';

const MainDashboard = () => {
    const { role, roleLoading } = useContext(AuthContext)
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminHome></AdminHome>
    }
    else if (role === 'donor') {
        return <DonorHome></DonorHome>
    }
    else {
        return <VolunteerHome></VolunteerHome>
    }
};

export default MainDashboard;