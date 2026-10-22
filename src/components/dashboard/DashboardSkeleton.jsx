import React from 'react';

const StatSkeleton = () => (
    <div className="card bg-base-100 border border-base-300 shadow-md rounded-2xl">
        <div className="card-body flex-row items-center gap-4 p-5">
            <div className="skeleton w-14 h-14 rounded-full shrink-0"></div>
            <div className="space-y-2">
                <div className="skeleton h-7 w-20"></div>
                <div className="skeleton h-4 w-32"></div>
            </div>
        </div>
    </div>
);

const ChartSkeleton = ({ className = '' }) => (
    <div className={`card bg-base-100 border border-base-300 shadow-md rounded-2xl ${className}`}>
        <div className="card-body">
            <div className="skeleton h-6 w-48"></div>
            <div className="skeleton h-72 w-full"></div>
        </div>
    </div>
);

export const OverviewSkeleton = ({ cards = 4 }) => (
    <section className="mt-10" aria-busy="true" aria-label="Loading dashboard">
        <div className="skeleton h-9 w-64 mx-auto mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {Array.from({ length: cards }).map((_, i) => <StatSkeleton key={i} />)}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton className="xl:col-span-2" />
        </div>
    </section>
);

const DashboardSkeleton = ({ cards = 4 }) => (
    <div className="container mx-auto">
        <div className="card lg:card-side bg-base-100 border border-base-300 shadow-xl rounded-3xl">
            <div className="card-body gap-4">
                <div className="skeleton h-10 w-72 max-w-full"></div>
                <div className="skeleton h-10 w-48 max-w-full"></div>
            </div>
            <div className="p-6 flex justify-center">
                <div className="skeleton w-30 h-30 rounded-full"></div>
            </div>
        </div>
        <OverviewSkeleton cards={cards}/>
    </div>
);

export default DashboardSkeleton;