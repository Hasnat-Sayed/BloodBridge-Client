import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import { FaTint, FaHeart } from 'react-icons/fa';
import Reveal from './Reveal';

const CallToAction = () => {
    const { user } = useContext(AuthContext);
    return (
        <section className="relative overflow-hidden bg-linear-to-r from-[#D62839] to-[#2B2D42] text-white py-20">
            <FaTint aria-hidden="true" className="float-slow absolute top-6 left-[8%] text-6xl text-white/15" />
            <FaHeart aria-hidden="true" className="float-slower absolute bottom-6 right-[85%] text-5xl text-white/15" />
            <FaHeart aria-hidden="true" className="float-slower absolute bottom-6 right-[10%] text-7xl text-white/15" />
            <FaTint aria-hidden="true" className="float-slower absolute top-10 right-[28%] text-4xl text-white/10" />
            <Reveal className="relative container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Your blood can be someone’s tomorrow</h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                    Join the community of donors, volunteers and supporters saving lives across Bangladesh.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link to={user ? '/dashboard' : '/register'} className="btn btn-lg bg-white text-[#2B2D42] border-white hover:bg-white/90 hover:-translate-y-1 hover:shadow-xl transition-all">
                        {user ? 'Go to Dashboard' : 'Become a Donor'}
                    </Link>
                    <Link to="/funding" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-[#2B2D42] hover:-translate-y-1 transition-all">
                        Support with Funding
                    </Link>
                </div>
            </Reveal>
        </section>
    );
};

export default CallToAction;