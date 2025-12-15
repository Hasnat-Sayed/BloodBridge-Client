import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleAuthProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [userStatus, setUserStatus] = useState('')

    const registerWithEmailAndPass = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)

    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleAuthProvider)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            // console.log(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])


    useEffect(() => {
        if (!user) return;
        axios.get(`http://localhost:5000/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
                setUserStatus(res.data.status)
                setRoleLoading(false)
            })
    }, [user])



    const authData = {
        registerWithEmailAndPass,
        setUser,
        user,
        setLoading,
        loading,
        signInWithGoogle,
        role,
        roleLoading,
        userStatus

    }

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;