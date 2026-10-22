import React from 'react';
import {
    ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { byBloodGroup, byMonth, byStatus } from '../../utils/dashboardData';

const tick = { fill: 'var(--color-base-content)', fontSize: 12 };
const tooltipStyle = {
    contentStyle: {
        background: 'var(--color-base-100)',
        border: '1px solid var(--color-base-300)',
        borderRadius: 8,
        color: 'var(--color-base-content)',
    },
    itemStyle: { color: 'var(--color-base-content)' },
    labelStyle: { color: 'var(--color-base-content)', fontWeight: 600 },
};

const ChartCard = ({ title, children, className = '' }) => (
    <div className={`card bg-base-100 border border-base-300 shadow-md rounded-2xl ${className}`}>
        <div className="card-body">
            <h3 className="card-title text-heading">{title}</h3>
            <div className="h-72 w-full">{children}</div>
        </div>
    </div>
);

const Empty = () => (
    <div className="text-xl h-full flex items-center justify-center text-base-content/70">No data yet</div>
);

const DashboardCharts = ({ requests = [], funds = [], showFunding = false }) => {
    const bloodData = byBloodGroup(requests);
    const statusData = byStatus(requests);
    const monthData = byMonth(requests, showFunding ? funds : []);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            {/* BAR */}
            <ChartCard title="Requests by Blood Group">
                {requests.length === 0 ? <Empty /> : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bloodData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" />
                            <XAxis dataKey="group" tick={tick} stroke="var(--color-base-content)" />
                            <YAxis allowDecimals={false} tick={tick} stroke="var(--color-base-content)" />
                            <Tooltip {...tooltipStyle} cursor={{ fill: 'var(--color-base-300)', opacity: 0.4 }} />
                            <Bar dataKey="requests" name="Requests" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </ChartCard>

            {/* PIE */}
            <ChartCard title="Request Status Distribution">
                {statusData.length === 0 ? <Empty /> : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={statusData} dataKey="value" nameKey="name" innerRadius="45%" outerRadius="75%" paddingAngle={3} stroke="var(--color-base-100)">
                                {statusData.map(s => <Cell key={s.name} fill={s.color} />)}
                            </Pie>
                            <Tooltip {...tooltipStyle} />
                            <Legend wrapperStyle={{ color: 'var(--color-base-content)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </ChartCard>

            {/* LINE */}
            <ChartCard title={showFunding ? 'Monthly Requests & Funding' : 'Monthly Requests'} className="xl:col-span-2">
                {monthData.length === 0 ? <Empty /> : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" />
                            <XAxis dataKey="month" tick={tick} stroke="var(--color-base-content)" />
                            <YAxis yAxisId="left" allowDecimals={false} tick={tick} stroke="var(--color-base-content)" />
                            {showFunding && (
                                <YAxis yAxisId="right" orientation="right" tick={tick} stroke="var(--color-base-content)" tickFormatter={v => `$${v}`} />
                            )}
                            <Tooltip {...tooltipStyle} />
                            <Legend wrapperStyle={{ color: 'var(--color-base-content)' }} />
                            <Line yAxisId="left" type="monotone" dataKey="requests" name="Requests" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} />
                            {showFunding && (
                                <Line yAxisId="right" type="monotone" dataKey="funding" name="Funding ($)" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4 }} />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </ChartCard>
        </div>
    );
};

export default DashboardCharts;