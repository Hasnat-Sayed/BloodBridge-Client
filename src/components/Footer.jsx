import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeartbeat } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer>
            <div className="bg-secondary text-secondary-content p-10 px-4 lg:px-20">
                <div className="flex flex-col md:flex-row md:justify-between gap-8">
                    <aside className='max-w-sm'>
                        <img src="https://img.icons8.com/?size=100&id=26115&format=png&color=000000" className="w-12 h-12" alt="" />
                        <p className='font-bold text-2xl mt-1 text-primary'>
                            Blood <span className='text-secondary-content/80'>Bridge</span>
                        </p>
                        <p className='opacity-80 mt-1'>
                            Connecting donors with those in need of blood. Every drop counts, every donor matters. <br /> Join us in saving lives.
                        </p>
                    </aside>

                    <nav>
                        <h6 className="footer-title text-lg text-primary mb-4">Quick Links</h6>
                        <div className="flex flex-col gap-2">
                            <Link to="/" className="link link-hover opacity-80 hover:opacity-100">Home</Link>
                            <Link to="/donation-requests" className="link link-hover opacity-80 hover:opacity-100">Donation Requests</Link>
                            <Link to="/search-donors" className="link link-hover opacity-80 hover:opacity-100">Search Donors</Link>

                        </div>
                    </nav>

                    <nav>
                        <h6 className="footer-title text-lg text-primary mb-4">Contact Us</h6>
                        <div className="flex flex-col gap-2">
                            <a className="link link-hover opacity-80 hover:opacity-100 flex items-center gap-2">
                                <MdEmail className="text-lg text-primary" />
                                <span>info@bloodbridge.com</span>
                            </a>
                            <a className="link link-hover opacity-80 hover:opacity-100 flex items-center gap-2">
                                <MdPhone className="text-lg text-primary" />
                                <span>+880-1234567890</span>
                            </a>
                            <a className="link link-hover opacity-80 hover:opacity-100 flex items-center gap-2">
                                <MdLocationOn className="text-lg text-primary" />
                                <span>Chittagong, Bangladesh</span>
                            </a>
                        </div>
                    </nav>

                    <nav>
                        <h6 className="footer-title text-lg text-primary mb-4">Follow Us</h6>
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                className="link link-hover opacity-80 hover:opacity-100 hover:text-primary transition-all"
                            >
                                <FaFacebookF className='text-2xl' />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                className="link link-hover opacity-80 hover:opacity-100 hover:text-primary transition-all"
                            >
                                <FaTwitter className='text-2xl' />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                className="link link-hover opacity-80 hover:opacity-100 hover:text-primary transition-all"
                            >
                                <FaInstagram className='text-2xl' />
                            </a>

                        </div>
                    </nav>
                </div>
            </div>

            <div className="bg-secondary text-secondary-content py-6 border-t border-accent/50">
                <div className="px-4 lg:px-20 flex flex-col md:flex-row justify-center items-center">
                    <p className="text-sm">
                        Copyright © {new Date().getFullYear()} Blood Bridge. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;