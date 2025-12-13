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
        const fetchRole = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/users/role/${user.email}`
            );
            setRole(res.data.role);
        } catch {
            setRole("user");
        } finally {
            setRoleLoading(false);
        }
    };

    fetchRole();
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

    }

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;