import React from 'react';
import { FaUserPlus, FaFileMedical, FaHandHoldingMedical, FaHeartbeat } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

const steps = [
    { icon: <FaUserPlus />, title: 'Register', text: 'Create a free account with your blood group, district and upazila.' },
    { icon: <FaFileMedical />, title: 'Post or Find a Request', text: 'Create a donation request or search donors by blood group and location.' },
    { icon: <FaHandHoldingMedical />, title: 'Donor Confirms', text: 'A donor accepts from the details page and the request moves to “in progress”.' },
    { icon: <FaHeartbeat />, title: 'Life Saved', text: 'After donation the request is marked done and the impact is tracked.' },
];

const HowItWorks = () => (
    <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4 lg:px-20">
            <SectionTitle title="How It" highlight="Works" subtitle="From registration to a completed donation in four simple steps." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((s, i) => (
                    <div key={s.title} className="card bg-base-100 border border-base-300 shadow-md relative">
                        <span className="absolute -top-4 -left-3 w-9 h-9 rounded-full bg-primary text-primary-content font-bold flex items-center justify-center shadow">
                            {i + 1}
                        </span>
                        <div className="card-body items-center text-center">
                            <span className="text-4xl text-primary">{s.icon}</span>
                            <h3 className="card-title text-heading">{s.title}</h3>
                            <p className="text-base-content/80 text-sm">{s.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;