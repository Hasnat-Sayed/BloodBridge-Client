import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import auth from '../firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const DEMO_USERS = [
    { role: 'Admin', email: 'admin@mail.com', password: '123456aA' },
    { role: 'Volunteer', email: 'messi@mail.com', password: '123456aA' },
    { role: 'Donor', email: 'rakin@mail.com', password: '123456aA' },
];

const Login = () => {

    const { setUser, setLoading, signInWithGoogle } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                const wrong = ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(e.code);
                toast.error(wrong ? "Invalid email or password" : e.message);
                setBtnLoading(false);
            });
    }

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            setUser(user);

            try {
                await axios.get(`https://bloodbridge-puce.vercel.app/users/${encodeURIComponent(user.email)}`);
                toast.success("Login Successful");
                navigate(location.state || "/");
            } catch (checkError) {
                if (checkError.response?.status !== 404) throw checkError;

                await axios.post('https://bloodbridge-puce.vercel.app/users', {
                    email: user.email,
                    name: user.displayName,
                    mainPhotoUrl: user.photoURL,
                    blood: "",
                    district: "",
                    upazila: ""
                });
                toast.info("Welcome! Please update your profile");
                navigate("/dashboard/profile");
            }
        } catch (error) {
            console.error(error);
            if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
                toast.error("Google sign-in failed. Please try again.");
            }
        } finally {
            setGoogleLoading(false);
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
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className='relative'>
                            <label className="label font-semibold">Password</label>
                            <input
                                name="password"
                                type={show ? "text" : "password"}
                                className="input w-full bg-base-200"
                                placeholder="Enter Your Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
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
                    <div className=" md:px-20">
                        <div className="bg-base-300 rounded-xl shadow shadow-primary/30 p-2 flex flex-col justify-center items-center">
                        <p className="text-sm text-base-content/90 mb-2">Try a demo account:</p>
                        <div className="flex flex-wrap gap-2">
                            {DEMO_USERS.map(d => (
                                <button
                                    key={d.role}
                                    type="button"
                                    onClick={() => { setEmail(d.email); setPassword(d.password); }}
                                    className="btn btn-sm btn-outline btn-primary"
                                >
                                    {d.role}
                                </button>
                            ))}
                        </div>
                    </div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default Login;