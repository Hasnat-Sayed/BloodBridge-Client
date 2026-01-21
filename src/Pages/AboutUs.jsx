import React from 'react';
import { FaHeart, FaHandHoldingHeart, FaUsers, FaBullseye, FaEye, FaLinkedin, FaGithub, FaTwitter, FaInfoCircle } from 'react-icons/fa';
import hasnat from '../assets/hasnat.jpeg';
import sakib from '../assets/sakib.jpeg';
import amran from '../assets/amran.png';
import { FcAbout } from 'react-icons/fc';

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Hasnat Bin Sayed",
            role: "Founder & Lead Developer",
            image: hasnat,
            bio: "Passionate about creating technology that saves lives and connects communities.",
        },
        {
            name: "Mohammad Sakib",
            role: "Front-End Developer",
            image: sakib,
            bio: "Dedicated to building scalable solutions that make a real difference in healthcare.",
        },
        {
            name: "Mohammad Amran",
            role: "UI/UX Designer",
            image: amran,
            bio: "Designing intuitive and responsive experiences that empower donors and recipients alike.",
        }
    ];

    const stats = [
        { number: "5,000+", label: "Lives Saved", icon: <FaHeart /> },
        { number: "50+", label: "Partner Hospitals", icon: <FaHandHoldingHeart /> },
        { number: "24/7", label: "Emergency Support", icon: <FaBullseye /> }
    ];

    const values = [
        {
            title: "Compassion",
            description: "We believe every donation is an act of love that can save a life.",
            icon: <FaHeart className="text-5xl text-error" />
        },
        {
            title: "Accessibility",
            description: "Making blood donation simple, fast, and accessible to everyone.",
            icon: <FaHandHoldingHeart className="text-5xl text-primary" />
        },
        {
            title: "Community",
            description: "Building a strong network of donors and recipients across Bangladesh.",
            icon: <FaUsers className="text-5xl text-success" />
        },
        {
            title: "Reliability",
            description: "Ensuring accurate information and timely connections in emergencies.",
            icon: <FaBullseye className="text-5xl text-warning" />
        }
    ];

    return (
        <div className="min-h-screen">
            
            <div className="bg-linear-to-b from-primary to-secondary text-primary-content py-10">
                <div className="px-4 text-center">
                    <FaInfoCircle className="text-6xl mx-auto mb-4 animate-pulse" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-secondary">BloodBridge</span></h1>
                    <p className="text-xl mb-6 max-w-3xl mx-auto text-gray-300">
                         Connecting donors with those in need, one drop at a time.
                    </p>
                </div>
            </div>

            <div className="bg-base-200 container mx-auto px-4 py-16 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="">

                            <div className="bg-linear-to-br from-secondary/35   rounded-2xl p-6 text-center transform hover:shadow-secondary/60 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 shadow-md ">
                                <div className="text-4xl mb-2 flex justify-center text-primary">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-base-content/70 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className="bg-base-300 pt-20 pb-5">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                                Our Mission and Vision
                            </h2>

                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-linear-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-20"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=400&fit=crop"
                                    alt="Blood Donation"
                                    className="relative rounded-3xl shadow-2xl w-full h-100 object-cover"
                                />
                            </div>

                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed text-base-content/80">
                                    BloodBridge was born from a simple yet powerful idea: <strong className="text-primary">no one should struggle to find blood in an emergency</strong>.
                                </p>
                                <p className="text-lg leading-relaxed text-base-content/80">
                                    Founded in 2025, we've built a platform that instantly connects those who need blood with willing donors across Bangladesh. Our technology-driven approach has revolutionized how communities respond to blood donation requests.
                                </p>
                                <p className="text-lg leading-relaxed text-base-content/80">
                                    Every day, we witness the power of human compassion as strangers become lifesavers, proving that together, we can make a difference.
                                </p>
                                <div className="pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-1 bg-primary rounded-full"></div>
                                        <span className="text-primary font-semibold italic">Saving lives, one connection at a time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-base-300 py-20 container mx-auto px-4  lg:px-20">

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-3xl p-10 h-full border-2 border-primary/20 hover:border-primary/40 hover:shadow-md transition-colors">
                        <div className='flex gap-4 items-center'>
                            <div className="p-4 bg-primary/30 rounded-2xl mb-6">
                                <FaBullseye className="text-5xl text-primary" />
                            </div>
                            <h3 className="text-4xl font-bold text-primary mb-6">Our Mission</h3>
                        </div>

                        <p className="text-lg leading-relaxed text-base-content/80">
                            To create a seamless, technology-driven blood donation ecosystem that ensures
                            <strong className="text-primary"> no patient ever waits for blood</strong>. We strive to make
                            blood donation accessible, efficient, and rewarding for every Bangladeshi citizen.
                        </p>

                    </div>

                    <div className="bg-linear-to-br from-secondary/5 to-secondary/10 rounded-3xl p-10 h-full border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-md transition-colors">
                        <div className='flex gap-4 items-center'>
                            <div className="p-4 bg-secondary/30 rounded-2xl mb-6">
                                <FaEye className="text-5xl text-secondary" />
                            </div>
                            <h3 className="text-4xl font-bold text-secondary mb-6">Our Vision</h3>
                        </div>

                        <p className="text-lg leading-relaxed text-base-content/80">
                            To build Bangladesh's largest community of voluntary blood donors, where
                            <strong className="text-secondary"> every district, every upazila has a network of heroes</strong> ready
                            to save lives. We envision a future where blood shortages are a thing of the past.
                        </p>

                    </div>

                </div>

            </div>

            {/* Core Values */}
            <div className="bg-base-200 py-20 container mx-auto px-4  lg:px-20">

                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Our Core Values
                    </h2>
                    <p className="text-xl text-base-content/70">
                        The principles that guide everything we do
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="group">
                            <div className="bg-base-100 rounded-2xl p-8 text-center h-full shadow-lg border-2 border-primary/80 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-primary mb-4">
                                    {value.title}
                                </h4>
                                <p className="text-base-content/70 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className="bg-base-300 py-20 container mx-auto px-4  lg:px-20">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Meet Our Team
                    </h2>
                    <p className="text-xl text-base-content/70">
                        The passionate individuals behind BloodBridge
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="group">
                            <div className="relative">

                                <div className="relative bg-base-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-base-300 group-hover:border-primary/30">

                                    <div className="relative overflow-hidden h-80">
                                        <div className="absolute inset-0 bg-linear-to-t from-primary/50 via-primary/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-secondary font-semibold mb-4 text-sm uppercase tracking-wide">
                                            {member.role}
                                        </p>
                                        <p className="text-base-content/70 leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    );
};

export default AboutUs;