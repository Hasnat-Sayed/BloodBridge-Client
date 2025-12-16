import React from 'react';
import { MdError } from 'react-icons/md';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='container mx-auto w-full flex flex-col min-h-screen'>
            <div className='flex-1'>
                <div className='bg-base-200 min-h-screen flex flex-col justify-center items-center text-center'>

                    <MdError className="h-60 w-60 text-primary" />
                    <h1 className='text-5xl font-semibold mt-2 py-4 mb-2'>
                        Oops, Donation cancelled!
                    </h1>
                    

                    <Link to='/' className="btn btn-primary font-semibold text-white py-3 px-10 rounded-sm ">
                        Go Back!
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;