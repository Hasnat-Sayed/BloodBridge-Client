import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactUs = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone, message } = formData;

        if (name.trim().length < 3) {
            toast.error('Name must be at least 3 characters');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (phone.trim().length < 11) {
            toast.error('Please enter a valid phone number');
            return;
        }

        if (message.trim().length < 10) {
            toast.error('Message must be at least 10 characters long');
            return;
        }

        toast.success('Thank you for contacting us! We will get back to you soon.');

        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    }

    return (

        <div className="bg-primary">
            <div className="container mx-auto px-4 py-16 lg:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                        Get In <span className="text-white">Touch</span>
                    </h2>
                    <p className="text-lg text-white max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to us anytime!
                    </p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto">
                    <div className="space-y-6">
                        <div className="card bg-base-200 shadow-xl shadow-secondary border  border-secondary">
                            <div className="card-body">
                                <h3 className="text-3xl font-bold text-secondary mb-6">
                                    Contact Information
                                </h3>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring ring-primary">
                                        <FaPhone className="text-2xl text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-secondary mb-1">
                                            Emergency Hotline
                                        </h4>
                                        <p className="text-primary font-medium ">
                                            +880 1234-567890
                                        </p>
                                        <p className="text-sm text-base-content/80 mt-1">
                                            24/7 Available
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center ring ring-accent">
                                        <FaEnvelope className="text-2xl text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-secondary mb-1">
                                            Email Us
                                        </h4>
                                        <p className="text-accent font-medium ">
                                            info@bloodbridge.com
                                        </p>
                                        <p className="text-sm text-base-content/80 mt-1">
                                            Response within 24 hours
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center ring ring-error">
                                        <FaMapMarkerAlt className="text-2xl text-error" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-secondary mb-1">
                                            Visit Us
                                        </h4>
                                        <p className="text-base-content/80">
                                            560/A, ChowdhuryHat<br />
                                            Chittagong, Bangladesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center ring ring-success">
                                        <FaClock className="text-2xl text-success" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-secondary mb-1">
                                            Office Hours
                                        </h4>
                                        <p className="text-base-content/80">
                                            Monday - Thursday: 9:00 AM - 6:00 PM<br />
                                            Saturday: 10:00 AM - 4:00 PM<br />
                                            Friday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl shadow-secondary border  border-secondary">
                        <div className="card-body">
                            <h3 className="text-3xl font-bold text-secondary mb-6">
                                Send Us a Message
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold text-secondary">Your Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input input-bordered w-full rounded-xl bg-base-100"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold text-secondary">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input input-bordered w-full rounded-xl bg-base-100"
                                        placeholder="your.email@example.com"
                                    />

                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold text-secondary">Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input input-bordered w-full rounded-xl bg-base-100"
                                        placeholder="+880 1234-567890"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold text-secondary">Message</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="textarea textarea-bordered w-full rounded-xl bg-base-100"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-lg btn-secondary w-full rounded-xl text-lg"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ContactUs;