import React from 'react';

const StatCard = ({ icon, label, value, prefix = '' }) => (
    <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
        <div className="card-body flex-row items-center gap-4 p-5">
            <div className="w-14 h-14 shrink-0 rounded-full bg-primary/15 text-primary text-3xl flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-3xl font-bold text-heading">
                    {prefix}{Number(value ?? 0).toLocaleString()}
                </p>
                <p className="text-base-content/80 font-medium">{label}</p>
            </div>
        </div>
    </div>
);

export default StatCard;