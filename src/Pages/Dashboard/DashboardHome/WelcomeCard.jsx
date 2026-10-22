import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

const WelcomeCard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="card lg:card-side flex-col-reverse lg:flex-row bg-base-100 border border-base-300 shadow-xl rounded-3xl">
            <div className="card-body text-center lg:text-left text-3xl md:text-4xl lg:text-5xl">
                <h2 className="font-semibold text-heading">Welcome back 👋</h2>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-2">{user?.displayName}</p>
            </div>
            <figure className="p-6 flex justify-center">
                <img
                    src={user?.photoURL}
                    alt="User profile"
                    className="w-30 h-30 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-2"
                    referrerPolicy="no-referrer"
                />
            </figure>
        </div>
    );
};

export default WelcomeCard;