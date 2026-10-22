import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';

const CallToAction = () => {
    const { user } = useContext(AuthContext);
    return (
        <section className="bg-linear-to-r from-[#D62839] to-[#2B2D42] text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Your blood can be someone’s tomorrow</h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
                    Join the community of donors, volunteers and supporters saving lives across Bangladesh.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link to={user ? '/dashboard' : '/register'} className="btn btn-lg bg-white text-[#2B2D42] border-white hover:bg-white/90">
                        {user ? 'Go to Dashboard' : 'Become a Donor'}
                    </Link>
                    <Link to="/funding" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-[#2B2D42]">
                        Support with Funding
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;