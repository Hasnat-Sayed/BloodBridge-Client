import React from 'react';
import { FaUserLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className='container mx-auto w-full flex flex-col min-h-screen'>
            <div className='flex-1'>
                <div className='bg-base-200 min-h-screen flex flex-col justify-center items-center text-center'>

                    <FaUserLock className="h-60 w-60 text-primary" />
                    <h1 className='text-5xl font-semibold mt-2'>
                         You Are Forbidden to Access This Page
                    </h1>
                    <p className='text-[#627382] text-xl py-4 mb-2'>
                         Please contact the administrator if you believe this is an error.
                    </p>

                    <Link to='/' className="btn btn-primary font-semibold text-white py-3 px-10 rounded-sm ">
                        Go Back!
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Forbidden;