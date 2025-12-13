import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {

    const { user, registerWithEmailAndPass, setUser, signInWithGoogle, setLoading } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;

        if (pass.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (!upperCase.test(pass)) {
            setError("Password must contain at least one Uppercase letter");
            return;
        }
        if (!lowerCase.test(pass)) {
            setError("Password must contain at least one Lowercase letter");
            return;
        }
        setError("");


        const name = e.target.name.value;
        const photo = e.target.photo;
        const file = photo.files[0];
        const role = e.target.role.value;

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbURL}`, { image: file },
            {
                headers: {

                    'Content-Type': 'multipart/form-data'
                }
            })
        const mainPhotoUrl = res.data.data.display_url

        const formData = {
            email,
            pass,
            name,
            mainPhotoUrl,
            role
        }

        if (res.data.success == true) {
            registerWithEmailAndPass(email, pass)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: mainPhotoUrl
                    }).then(() => {
                        setUser(userCredential.user)
                        axios.post('http://localhost:5000/users', formData)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        toast.success("Registration Successful")
                        navigate("/")
                    }).catch((error) => {
                        console.log(error)
                        toast.error(error.message);
                    })
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(error.message);

                })
            console.log(user)
        }



    }
    const handleGoogleUp = () => {
        signInWithGoogle()
            .then((res) => {
                setLoading(false);
                setUser(res.user);
                toast.success("Registration Successful");
                navigate("/")
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.message);
            });

    }

    return (
        <div className="bg-base-300 flex justify-center px-4 py-10 items-center min-h-screen">
            <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl my-16 pt-10 pb-3 rounded-2xl">
                <h2 className="font-semibold text-4xl text-center pb-7 mx-10 border-primary text-primary border-b">
                    Register Your Account
                </h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <fieldset className="fieldset md:px-20">

                        <label className="label text-secondary font-semibold">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="input w-full bg-base-200"
                            placeholder="Enter Your Name"
                            required
                        />

                        <label className="label text-secondary font-semibold">Photo</label>
                        <input
                            name="photo"
                            type="file"
                            className="input w-full bg-base-200 file:mr-4 file:-ml-4 file:py-2.5 file:px-5 file:rounded-l-sm  file:text-sm file:font-semibold file:bg-red-100 file:text-red-600 hover:file:bg-red-200 file:cursor-pointer"
                            required
                        />

                        <label className="label text-secondary font-semibold">Photo</label>
                        <select name="role" defaultValue="Choose Role" className="select w-full bg-base-200">
                            <option disabled={true}>Choose Role</option>
                            <option value="manager">Manager</option>
                            <option value="buyer">Buyer</option>
                        </select>

                        <label className="label text-secondary font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input w-full bg-base-200"
                            placeholder="Enter Your Email"
                            required
                        />

                        <div className='relative'>
                            <label className="label text-secondary font-semibold">Password</label>
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



                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}

                        <button type="submit" className="btn btn-primary mt-3">
                            Register
                        </button>

                        <div className="flex items-center justify-center gap-2 my-2">
                            <div className="h-px w-16 bg-gray-600"></div>
                            <span className="text-sm">or</span>
                            <div className="h-px w-16 bg-gray-600"></div>
                        </div>

                        <button type='button' onClick={handleGoogleUp} className="btn btn-secondary">
                            <FcGoogle className='text-xl' /> Register With Google
                        </button>

                        <p className="font-medium text-lg text-center pt-5">
                            Already Have An Account ?{" "}
                            <Link className="hover:underline text-primary"
                                to="/login">
                                Login
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;