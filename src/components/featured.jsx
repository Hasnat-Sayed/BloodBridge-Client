import React from 'react';
import {
    FaSearch,
    FaShieldAlt,
    FaChartLine,
    FaHospital,
    FaMobileAlt,
    FaLock,
    FaDonate,
    FaTachometerAlt
} from 'react-icons/fa';

const Featured = () => {
    const features = [
        {
            icon: <FaSearch />,
            title: 'Smart Search',
            description: 'Find blood donors by location, blood type, and availability with advanced filtering for quick matches'
        },
        {
            icon: <FaDonate />,
            title: 'Support Through Funding',
            description: 'Donate money securely to support blood donation programs and emergency medical needs'
        },

        {
            icon: <FaShieldAlt />,
            title: 'Verified Donors',
            description: 'All donors are verified and authenticated. Safe and secure donation process guaranteed'
        },
        {
            icon: <FaChartLine />,
            title: 'Track Your Impact',
            description: 'Monitor your donation history and manage your donation requests with clear status updates'
        },
        {
            icon: <FaHospital />,
            title: 'Hospital Network',
            description: 'Connected with major hospitals for seamless coordination during emergencies'
        },
        {
            icon: <FaMobileAlt />,
            title: 'Mobile Friendly',
            description: 'Access anywhere, anytime with our easy-to-use interface designed for all  device'
        },

        {
            icon: <FaLock />,
            title: 'Privacy Protected',
            description: 'Your data is completely secure. Your personal data is secure and visible only when necessary'
        },
        {
            icon: <FaTachometerAlt />,
            title: 'Personal Dashboard',
            description: 'Access your own dashboard to manage requests, donations, and profile information easily'
        }

    ];

    return (
        <div className="bg-linear-to-b from-bg-base-300 to-bg-base-200 ">
            <div className="container mx-auto px-4 py-16 lg:px-20 min-h-screen">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                        Why Choose <span className="text-primary">Blood Bridge?</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
                        Discover the features that make Blood Bridge the most trusted platform for blood donation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-2xl hover:shadow-primary hover:border-primary hover:-translate-y-2 transition-all duration-300 border border-base-300 group"
                        >
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                    <span className="text-3xl text-primary group-hover:text-primary-content transition-colors duration-300">
                                        {feature.icon}
                                    </span>
                                </div>

                                <h3 className="card-title text-xl font-bold text-secondary mb-2">
                                    {feature.title}
                                </h3>

                                <p className="text-base-content/70 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;