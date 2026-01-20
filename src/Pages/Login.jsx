import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import auth from '../firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {

    const { setUser, setLoading, signInWithGoogle } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [show, setShow] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnLoading(true)
        const email = e.target.email.value;
        const pass = e.target.password.value;
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {

                const user = userCredential.user;
                setUser(user);
                setLoading(false)
                toast.success("SignIn Successful")
                setBtnLoading(false);
                navigate(location.state || "/")
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.message);
            });
    }

    const handleGoogle = async () => {
        setGoogleLoading(true);
        const result = await signInWithGoogle();
        const user = result.user;
        setUser(user);
        const encodedEmail = encodeURIComponent(user.email);

        try {
            const checkUser = await axios.get(
                `https://bloodbridge-puce.vercel.app/users/${encodedEmail}`
            );

            if (checkUser.data) {
                toast.success("Login Successful");
                setGoogleLoading(false);
                navigate(location.state || "/");
            }
        } catch (checkError) {

            if (checkError.response && checkError.response.status === 404) {

                const basicUserData = {
                    email: user.email,
                    name: user.displayName,
                    mainPhotoUrl: user.photoURL,
                    blood: "",
                    district: "",
                    upazila: ""
                };

                try {
                    await axios.post('https://bloodbridge-puce.vercel.app/users', basicUserData);

                    toast.info("Welcome! Please update your profile");
                    setGoogleLoading(false);
                    navigate("/dashboard/profile");

                } catch (createError) {
                    console.error(createError);
                    toast.error("Failed to create user. Please try again.");
                    setGoogleLoading(false);
                }
            }
        }

    };



    return (
        <div className="flex justify-center px-4 py-5 min-h-screen items-center bg-base-300">
            <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-md pt-10 pb-3 rounded-2xl">
                <h2 className="font-semibold text-4xl text-center mx-10 text-primary">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <fieldset className="fieldset md:px-20">

                        <label className="label font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input w-full bg-base-200"
                            placeholder="Enter Your Email"
                            required
                        />

                        <div className='relative'>
                            <label className="label font-semibold">Password</label>
                            <input
                                name="password"
                                type={show ? "text" : "password"}
                                className="input w-full bg-base-200"
                                placeholder="Enter Your Password"
                                required
                            />

                            <span onClick={() => setShow(!show)} className='absolute right-2 top-7.5 cursor-pointer z-50 text-lg'>
                                {show ? <FaEye /> : <FaRegEyeSlash />}</span>
                        </div>


                        


                        <button type="submit" className="btn btn-primary mt-3" disabled={btnLoading}>
                            {btnLoading ? (
                                <span className="loading loading-spinner text-primary loading-sm"></span>
                            ) : (
                                'Login'
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-2 my-2">
                            <div className="h-px w-16 bg-gray-600"></div>
                            <span className="text-sm">or</span>
                            <div className="h-px w-16 bg-gray-600"></div>
                        </div>

                        <button type='button' onClick={handleGoogle} className="btn btn-secondary" disabled={googleLoading}>
                            {
                                googleLoading ? (
                                    <span className="loading loading-spinner text-primary loading-sm"></span>
                                ) : (
                                    <>
                                        <FcGoogle className='text-xl' /> Login With Google
                                    </>

                                )
                            }

                        </button>


                        <p className="font-medium text-lg text-center pt-5">
                            Dont’t Have An Account ?{" "}
                            <Link className="hover:underline text-primary"
                                to="/register">
                                Register
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;