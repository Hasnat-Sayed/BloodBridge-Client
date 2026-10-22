import React from 'react';
import { FaUserPlus, FaFileMedical, FaHandHoldingMedical, FaHeartbeat } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

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
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {/* connecting line (desktop) */}
                <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] border-t-2 border-dashed border-primary/40" aria-hidden="true"></div>
                {steps.map((s, i) => (
                    <Reveal key={s.title} delay={i * 120}>
                    <div className="group card h-full bg-base-100 border border-base-300 shadow-md relative hover:-translate-y-2 hover:shadow-xl hover:border-primary transition-all duration-300">
                        <span className="absolute -top-4 -left-3 w-9 h-9 rounded-full bg-primary text-primary-content font-bold flex items-center justify-center shadow">
                            {i + 1}
                        </span>
                        <div className="card-body items-center text-center">
                            <span className="w-16 h-16 rounded-full bg-primary/15 text-primary text-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-content group-hover:scale-110 transition-all duration-300">{s.icon}</span>
                            <h3 className="card-title text-heading">{s.title}</h3>
                            <p className="text-base-content/80 text-sm">{s.text}</p>
                        </div>
                    </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;