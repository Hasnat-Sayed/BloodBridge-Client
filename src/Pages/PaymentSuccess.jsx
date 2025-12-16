import React, { useEffect } from 'react';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router';
import useAxios from '../hooks/useAxios';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
            })
    }, [axiosInstance, sessionId])

    return (
        <div>
            <div className='container mx-auto w-full flex flex-col min-h-screen'>
                <div className='flex-1'>
                    <div className='bg-base-200 min-h-screen flex flex-col justify-center items-center text-center'>

                        <MdOutlineDownloadDone className="h-60 w-60 text-primary" />
                        <h1 className='text-5xl font-semibold mt-2 py-4 mb-2'>
                            Donation Successful!
                        </h1>

                        <Link to='/' className="btn btn-secondary font-semibold text-white py-3 px-10 rounded-sm ">
                            Go Back!
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;