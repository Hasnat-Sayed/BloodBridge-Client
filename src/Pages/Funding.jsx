import React, { useContext } from 'react';
import { FaHeart, FaHandHoldingHeart, FaRegClock } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';
import useAxios from '../hooks/useAxios';

const Funding = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios()

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const donorName = e.target.donorName.value;
        const donorEmail = user?.email;

        const formData = {
            donateAmount,
            donorEmail,
            donorName,
            created_at: new Date(),
        }

        console.log(formData)
        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                console.log(res.data);
                window.location.href = res.data.url
            })
    }


    return (
        <div className="container mx-auto min-h-screen bg-base-200">
            <div className="bg-linear-to-b from-primary to-secondary text-primary-content py-24">
                <div className="px-4 text-center">
                    <FaHeart className="text-6xl mx-auto mb-4 animate-pulse" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Blood Bridge</h1>
                    <p className="text-xl mb-6 max-w-3xl mx-auto text-gray-300">
                        Your contribution helps us save lives by connecting donors with those in need
                    </p>
                </div>
            </div>

            <div className="container bg-base-200 mx-auto py-20 px-4 lg:px-20 min-h-[80vh]">
                <div className="flex justify-between w-full  flex-col lg:flex-row gap-20">

                    <div className="flex-1 flex flex-col justify-center">

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
                            Make a <span className="text-primary">Difference</span> Today
                        </h2>
                        <p className=" mb-6 text-base-content/80">
                            Your generous donation helps us maintain our platform, organize blood donation camps,
                            and ensure that life-saving blood reaches those who need it most.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <FaHandHoldingHeart className="text-primary text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Save Lives</h4>
                                    <p className="text-base-content/70">
                                        Every contribution helps connect donors with recipients in critical need
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <FaHeart className="text-primary text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Organize Camps</h4>
                                    <p className="text-base-content/70">
                                        Fund blood donation camps in communities that need them most
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                    <FaRegClock className="text-primary text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">24/7 Support</h4>
                                    <p className="text-base-content/70">
                                        Keep our emergency helpline and platform running round the clock
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1  card bg-base-100 shadow-2xl rounded-2xl">

                        <form onSubmit={handleCheckout} className="card-body ">
                            <h3 className="text-2xl font-bold text-center mb-4 text-secondary">
                                Support Our Mission
                            </h3>
                            <fieldset className="fieldset md:px-20">

                                <label className="label font-semibold text-secondary">Name</label>
                                <input
                                    name="donorName"
                                    type="text"
                                    defaultValue={user?.displayName}
                                    className="input w-full bg-base-200 rounded-xl"
                                    readOnly
                                />

                                <label className="label font-semibold text-secondary">Amount</label>
                                <input
                                    name="donateAmount"
                                    type="text"
                                    className="input w-full bg-base-200 rounded-xl"
                                    placeholder="Enter Donation Amount in Dollar"
                                    required
                                />


                                <div className="flex justify-center mt-4">
                                    <button type="submit" className="btn btn-primary rounded-xl">
                                        <FaHeart />
                                        Donate Now
                                    </button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Funding;