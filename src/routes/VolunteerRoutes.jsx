import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';
import Forbidden from '../components/Forbidden';

const VolunteerRoutes = ({ children }) => {
    const { loading, role, roleLoading } = useContext(AuthContext)
    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'volunteer') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default VolunteerRoutes;