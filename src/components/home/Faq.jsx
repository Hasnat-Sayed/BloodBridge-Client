import React from 'react';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';

const faqs = [
    { q: 'Who can donate blood?', a: 'Healthy adults aged 18–60, weighing at least 50 kg, with no active infection can usually donate.' },
    { q: 'How often can I donate?', a: 'Whole blood can be donated every 3–4 months, so your body has time to recover.' },
    { q: 'How do I request blood?', a: 'Register, open your dashboard and create a donation request with the hospital, date and blood group.' },
    { q: 'Is my personal data safe?', a: 'Your contact details are shown only to the donor or requester involved in a confirmed request.' },
    { q: 'How are funds used?', a: 'Funding supports donation camps, emergency coordination and platform running costs.' },
];

const Faq = () => (
    <section className="bg-base-300 py-16">
        <div className="container mx-auto px-4 lg:px-20 max-w-4xl">
            <SectionTitle title="Frequently Asked" highlight="Questions" />
            <div className="space-y-3">
                {faqs.map((f, i) => (
                    <Reveal key={f.q} delay={i * 80}>
                        <div className="collapse collapse-arrow bg-base-100 border border-base-200/50 border-l-4 border-l-primary shadow-md  hover:shadow-lg hover:bg-base-200 transition-all duration-300">
                            <input type="radio" name="faq" defaultChecked={i === 0} aria-label={f.q} />
                            <div className="collapse-title font-semibold text-heading">{f.q}</div>
                            <div className="collapse-content text-base-content/80">{f.a}</div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default Faq;