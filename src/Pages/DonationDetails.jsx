import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaCalendarAlt, FaClock, FaEnvelope, FaHandHoldingHeart, FaHospital, FaInfoCircle, FaMapMarkerAlt, FaTint, FaUser } from 'react-icons/fa';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';

const DonationDetails = () => {
    const { user } = useContext(AuthContext);
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);


    const fetchDetails = () => {
        axiosSecure.get(`/details/${id}`)
            .then(res => {
                setDetail(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axiosSecure, id])



    const handleConfirmDonation = (e) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target
        const donor_name = form.name.value;
        const donor_email = form.email.value;

        const formData = {
            donor_name,
            donor_email
        }
        console.log(formData)

        axiosSecure.patch(`/donate-blood/${detail?._id}`, formData)
            .then(res => {
                console.log(res.data);
                Swal.fire("Success", "Donation Request Accepted", "success")
                setLoading(false)
                fetchDetails();

            }).catch(err => console.log(err))

        setShowModal(false);
    };



    if (loading) return <Loading></Loading>

    return (
        <div className="min-h-screen bg-base-200 py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                        Donation Request <span className="text-primary">Details</span>
                    </h1>
                    <p className="text-base-content/80">Request ID: #{detail?._id}</p>
                </div>

                <div className="card bg-base-100 shadow-2xl border border-secondary/20 mb-6">
                    <div className="card-body">

                        <div className="flex justify-between items-center mb-3">
                            <h2 className="card-title text-3xl text-secondary">Request Information:</h2>
                            <span className={`badge badge-secondary badge-lg font-bold text-lg px-4 py-4`}>
                                {detail?.donation_status?.toUpperCase()}
                            </span>
                        </div>

                        <div className="alert bg-primary/10 border-primary mb-3">
                            <FaTint className="text-primary text-5xl" />
                            <div>
                                <h3 className="font-bold text-lg">Blood Group Required</h3>
                                <div className="text-3xl font-bold text-primary">{detail?.blood_group}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="flex justify-start items-center gap-3">
                                <FaUser className="text-primary text-xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Requester Name</p>
                                    <p className="text-lg font-bold text-secondary">{detail?.requester_name}</p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">
                                <FaEnvelope className="text-accent text-2xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Requester Email</p>
                                    <p className="text-lg font-bold text-secondary">{detail?.requester_email}</p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">
                                <FaUser className="text-error text-2xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Recipient Name</p>
                                    <p className="text-lg font-bold text-secondary">{detail?.recipient_name}</p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">
                                <FaMapMarkerAlt className="text-error text-2xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Recipient Location</p>
                                    <p className="text-lg font-bold text-secondary">
                                        {detail?.recipient_upazila}, {detail?.recipient_district}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">
                                <FaHospital className="text-accent text-2xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Hospital Name</p>
                                    <p className="text-lg font-bold text-secondary">{detail?.hospital_name}</p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">
                                <FaMapMarkerAlt className="text-primary text-2xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Full Address</p>
                                    <p className="text-lg font-bold text-secondary">{detail?.full_address}</p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">
                                <FaCalendarAlt className="text-primary text-2xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Donation Date</p>
                                    <p className="text-lg font-bold text-secondary">{detail?.donation_date}</p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-3">
                                <FaClock className="text-accent text-2xl" />
                                <div>
                                    <p className="text-sm text-base-content/60 font-semibold">Donation Time</p>
                                    <p className="text-lg font-bold text-secondary">{detail?.donation_time}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-start gap-3">
                                <FaInfoCircle className="text-primary text-2xl " />
                                <div className="flex-1">
                                    <p className="text-sm text-base-content/60 font-semibold mb-2">Request Message</p>
                                    <div className="bg-base-300 p-3 rounded-lg">
                                        <p className="text-base leading-relaxed">{detail?.request_message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {detail?.donation_status === 'pending' && (
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn btn-primary btn-lg gap-2 px-12 rounded-lg hover:scale-105 transition-all transform duration-200"
                                >
                                    <FaHandHoldingHeart className="text-2xl" />
                                    Donate Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {showModal && (
                <div className="modal modal-open">
                    <form onSubmit={handleConfirmDonation}>
                        <div className="modal-box max-w-md rounded-2xl">
                            <h3 className="font-bold text-2xl text-secondary mb-4">Confirm Donation</h3>
                            <p className="text-base-content/70 mb-6">
                                Please confirm your details before proceeding with the donation.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="label font-semibold text-secondary">
                                        Donor Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={user?.displayName}
                                        className="input rounded-lg w-full bg-base-200"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="label font-semibold text-secondary">
                                        Donor Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={user?.email}
                                        className="input rounded-lg w-full bg-base-200"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-ghost rounded-lg"
                                >Cancel
                                </button>

                                <button
                                    type='submit'
                                    className="btn btn-primary rounded-lg">
                                    <FaHandHoldingHeart />
                                    Confirm Donation
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            )}
        </div>
    );
};

export default DonationDetails;