import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import auth from '../../firebase/firebase.config';
import Loading from '../../components/Loading';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [isEditable, setIsEditable] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [loading, setLoading] = useState(true);

    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        photoURL: '',
        district: '',
        upazila: '',
        bloodGroup: ''
    });

    useEffect(() => {
        // console.log(user)
        axiosSecure.get('/user-profile')
            .then(res => {
                setProfileData({
                    name: res.data.name || user?.displayName,
                    email: res.data.email || user?.email,
                    photoURL: res.data.mainPhotoUrl || user?.photoURL,
                    district: res.data.district || '',
                    upazila: res.data.upazila || '',
                    bloodGroup: res.data.blood || ''
                });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

        axios.get('/district.json')
            .then(res => setDistricts(res.data.districts));
        axios.get('/upazila.json')
            .then(res => setUpazilas(res.data.upazilas));

    }, [axiosSecure, user]);

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const photo = e.target.photo;
        const file = photo.files[0];
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbURL}`, { image: file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        const mainPhotoUrl = res.data.data.display_url

        const updatedData = {
            name: profileData.name,
            mainPhotoUrl: mainPhotoUrl,
            district: profileData.district,
            upazila: profileData.upazila,
            blood: profileData.bloodGroup
        };
        // console.log(updatedData)

        updateProfile(auth.currentUser, {
            displayName: profileData.name,
            photoURL: mainPhotoUrl
        })
            .then(() => {
                return axiosSecure.patch(`/update-profile/${user?.email}`, updatedData);
            })
            .then(() => {
                setUser({
                    ...user,
                    displayName: profileData.name,
                    photoURL: profileData.photoURL
                });
                setIsEditable(false);
                setIsUpdating(false);
                toast.success('Profile updated successfully!');
            })
            .catch(error => {
                console.log(error);
            });
    };



    if (loading) return <Loading />

    return (
        <div className="container mx-auto max-w-3xl">
            <div className="card bg-base-100 border border-secondary/20 rounded-2xl shadow-2xl">
                <div className="card-body">
                    <div className="text-center mb-5">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                            My <span className="text-primary">Profile</span>
                        </h1>

                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <div className="avatar">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={profileData.photoURL}
                                        alt="Profile"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                            </div>
                        </div>


                        <form onSubmit={handleSave} className='space-y-4'>
                            <div className='flex justify-center'>
                                {!isEditable && (
                                    <button onClick={handleEdit} className="btn btn-primary">
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                            <div>
                                <label className="label font-semibold text-secondary">Email</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    className="input input-bordered w-full rounded-xl bg-base-200"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="label font-semibold text-secondary">Name</label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="input input-bordered w-full rounded-xl bg-base-200"
                                    placeholder="Enter your name"
                                    disabled={!isEditable}
                                />
                            </div>

                            {
                                isEditable && (
                                    <div>
                                        <label className="label text-secondary font-semibold">Photo</label>
                                        <input
                                            name="photo"
                                            type="file"
                                            className="input w-full bg-base-200 file:mr-4 file:-ml-4 file:py-2.5 file:px-5 file:rounded-l-sm  file:text-sm file:font-semibold file:bg-red-100 file:text-red-600 hover:file:bg-red-200 file:cursor-pointer rounded-xl"
                                            required
                                        />
                                    </div>)
                            }


                            <div>
                                <label className="label font-semibold text-secondary">Blood Group</label>
                                <select
                                    value={profileData.bloodGroup}
                                    onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                                    className="select select-bordered w-full rounded-xl bg-base-200"
                                    disabled={!isEditable}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div>
                                <label className="label ont-semibold text-secondary">District</label>
                                <select value={profileData.district}
                                    onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                                    className="select select-bordered w-full rounded-xl bg-base-200"
                                    disabled={!isEditable} >

                                    <option value="">Select District</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label ont-semibold text-secondary">Upazilla</label>
                                <select
                                    value={profileData.upazila}
                                    onChange={(e) => setProfileData({ ...profileData, upazila: e.target.value })}
                                    className="select select-bordered w-full rounded-xl bg-base-200"
                                    disabled={!isEditable}
                                >
                                    <option value="">Select Upazila</option>
                                    {upazilas.map(u => (
                                        <option key={u.id} value={u.name}>{u.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex justify-center'>
                                {isEditable && (
                                    <button type="submit" className="btn btn-primary" disabled={isUpdating}>
                                        {isUpdating ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                )}
                            </div>

                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;