import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';
import Forbidden from '../components/Forbidden';

const AdminRoutes = ({ children }) => {
    const { loading, role, roleLoading } = useContext(AuthContext)

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoutes;