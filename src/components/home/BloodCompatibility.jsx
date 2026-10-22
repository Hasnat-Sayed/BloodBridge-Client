import React, { useState } from 'react';
import SectionTitle from './SectionTitle';

// who can DONATE TO whom
const canDonateTo = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'],
};
const groups = Object.keys(canDonateTo);

const BloodCompatibility = () => {
    const [selected, setSelected] = useState('O-');

    return (
        <section className="bg-base-100 py-16">
            <div className="container mx-auto px-4 lg:px-20">
                <SectionTitle title="Blood Group" highlight="Compatibility" subtitle="Select a blood group to see who it can donate to." />
                <div className="flex flex-wrap justify-center gap-3 mb-8" role="group" aria-label="Select blood group">
                    {groups.map(g => (
                        <button
                            key={g}
                            onClick={() => setSelected(g)}
                            aria-pressed={selected === g}
                            className={`btn btn-lg w-20 hover:-translate-y-1 hover:scale-105 transition-all duration-200 ${selected === g ? 'btn-primary shadow-lg scale-105' : 'btn-outline'}`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
                <div className="card bg-linear-to-br from-primary/10 to-accent/10 border border-base-300 max-w-3xl mx-auto shadow-md">
                    <div className="card-body items-center text-center">
                        <p className="text-base-content/80">
                            <span key={selected} className="font-bold text-primary text-3xl inline-block pop-in">{selected}</span> donors can give blood to:
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {canDonateTo[selected].map((g, i) => (
                                <span key={`${selected}-${g}`} style={{ animationDelay: `${i * 40}ms` }} className="badge badge-lg badge-primary font-bold pop-in">{g}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BloodCompatibility;