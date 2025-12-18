import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CreateRequest = () => {

    const { user, userStatus } = useContext(AuthContext);

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])

    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('');

    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas)
            })
        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts)
            })
    }, [])

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target
        const requester_name = form.requester_name.value;
        const requester_email = form.requester_email.value;
        const recipient_name = form.recipient_name.value;
        const recipient_district = district
        const recipient_upazila = upazila
        const hospital_name = form.hospital_name.value;
        const full_address = form.full_address.value;
        const blood_group = form.blood_group.value;
        const donation_date = form.donation_date.value;
        const donation_time = form.donation_time.value;
        const request_message = form.request_message.value;

        const formData = {
            requester_name,
            requester_email,
            recipient_name,
            recipient_district,
            recipient_upazila,
            hospital_name,
            full_address,
            blood_group,
            donation_date,
            donation_time,
            request_message,
            donation_status: 'pending'
        }

        axiosSecure.post('/requests', formData)
            .then(res => {
                console.log(res.data.insertedId);
                toast.success("Request Created Successfully");
                form.reset();
            }).catch(err => console.log(err))
    }

    if (userStatus == 'blocked')
        return (
            <div className=" flex justify-center items-center min-h-screen">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                        Sorry you are<span className="text-primary"> Blocked!</span>
                    </h1>

                </div>
            </div>
        )


    return (
        <div className="max-w-3xl mx-auto py-10 px-10 lg:px-20 bg-base-100 border border-gray-400 rounded-2xl shadow-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                    Create <span className="text-primary">Donation Request</span>
                </h1>

            </div>


            <form onSubmit={handleRequest} className="space-y-4">
                <div>
                    <label className="label text-secondary font-semibold text-xl">Requester Name</label>
                    <input
                        type="text"
                        name="requester_name"
                        value={user?.displayName || ''}
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="Requester Name"
                        readOnly
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Requester Email</label>
                    <input
                        type="email"
                        name="requester_email"
                        value={user?.email || ''}
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="Requester Email"
                        readOnly
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Recipient Name</label>
                    <input
                        type="text"
                        name="recipient_name"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="Enter recipient name"
                        required
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Recipient District</label>
                    <select
                        name="recipientDistrict"
                        className="select select-bordered w-full rounded-xl bg-base-200"
                        required value={district} onChange={(e) => setDistrict(e.target.value)}
                    >
                        <option disabled value=''>Select Your District</option>
                        {
                            districts.map(d => <option value={d?.name} key={d.id} > {d?.name}</option>)
                        }
                    </select>
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Recipient Upazila</label>
                    <select
                        name="recipientUpazila"
                        className="select select-bordered w-full rounded-xl bg-base-200"
                        required value={upazila} onChange={(e) => setUpazila(e.target.value)}
                    >
                        <option disabled value=''>Select Your Upazila</option>
                        {
                            upazilas.map(u => <option value={u?.name} key={u.id} >{u?.name}</option>)
                        }
                    </select>
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Hospital Name</label>
                    <input
                        type="text"
                        name="hospital_name"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="e.g., Dhaka Medical College Hospital"
                        required
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Full Address Line</label>
                    <input
                        type="text"
                        name="full_address"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="e.g., Zahir Raihan Rd, Dhaka"
                        required
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Blood Group</label>
                    <select
                        name="blood_group"
                        className="select select-bordered w-full rounded-xl bg-base-200"
                        required
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
                    <label className="label text-secondary font-semibold text-xl">Donation Date</label>
                    <input
                        type="date"
                        name="donation_date"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        required
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Donation Time</label>
                    <input
                        type="time"
                        name="donation_time"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        required
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Request Message</label>
                    <textarea
                        name="request_message"
                        rows="5"
                        className="textarea textarea-bordered w-full rounded-xl bg-base-200"
                        placeholder="Please explain why you need blood donation in detail..."
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg rounded-xl mt-4 w-full text-lg">
                    Request Blood Donation
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;