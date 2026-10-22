import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import RequestCard from '../components/RequestCard';
import Reveal from '../components/home/Reveal';

const PAGE_SIZE = 12;

// 1 … 4 5 [6] 7 8 … 20
const getPageList = (current, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) pages.push('…');
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < total - 1) pages.push('…');
    pages.push(total);
    return pages;
};

const SkeletonCard = () => (
    <div className="card bg-base-200 border border-base-300 border-l-4 border-l-primary/40 shadow-md">
        <div className="card-body gap-3">
            <div className="flex justify-between">
                <div className="skeleton h-6 w-40"></div>
                <div className="skeleton h-7 w-12 rounded-full"></div>
            </div>
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-1/2"></div>
            <div className="skeleton h-4 w-1/3"></div>
            <div className="skeleton h-8 w-32 mt-2"></div>
        </div>
    </div>
);

const DonationRequests = () => {
    const axiosInstance = useAxios();
    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retryKey, setRetryKey] = useState(0);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    useEffect(() => {
        let ignore = false;
        axiosInstance.get(`/pending-requests?page=${currentPage - 1}&size=${PAGE_SIZE}`)
            .then(res => {
                if (ignore) return;
                setRequests(res.data.requests || []);
                setTotal(res.data.total || 0);
            })
            .catch(() => !ignore && setError(true))
            .finally(() => !ignore && setLoading(false));
        return () => { ignore = true; };
    }, [axiosInstance, currentPage, retryKey]);

    const goTo = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setLoading(true);
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-base-200">
            <div className="container mx-auto pt-10 pb-16 px-4 lg:px-20 min-h-screen">
                <div className="text-center mb-4">
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-heading">
                        Pending <span className="text-primary">Blood</span> Donation <span className="text-accent">Requests</span>
                    </h3>
                    {!loading && !error && total > 0 && (
                        <p className=" text-base-content/80">
                            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{(currentPage - 1) * PAGE_SIZE + requests.length} of {total} requests
                        </p>
                    )}
                </div>

                {error ? (
                    <div className="text-center mt-16">
                        <p className="text-error font-semibold mb-4">Couldn’t load requests.</p>
                        <button className="btn btn-primary" onClick={() => { setError(false); setLoading(true); setRetryKey(k => k + 1); }}>Retry</button>
                    </div>
                ) : loading ? (
                    <div className="mt-6 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true">
                        {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : requests.length === 0 ? (
                    <p className="text-center mt-16 text-xl text-base-content/70">No pending requests right now.</p>
                ) : (
                    <div className="mt-6 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map((request, i) => (
                            <Reveal key={request?._id} delay={(i % 3) * 80} className="h-full">
                                <RequestCard request={request} />
                            </Reveal>
                        ))}
                    </div>
                )}

                {totalPages > 1 && !error && (
                    <nav className="flex justify-center mt-14" aria-label="Pagination">
                        <div className="join">
                            <button className="join-item btn" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1 || loading}>«</button>
                            {getPageList(currentPage, totalPages).map((p, i) =>
                                p === '…' ? (
                                    <button key={`gap-${i}`} className="join-item btn btn-disabled">…</button>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => goTo(p)}
                                        disabled={loading}
                                        aria-current={p === currentPage ? 'page' : undefined}
                                        className={`join-item btn ${p === currentPage ? 'btn-primary' : ''}`}
                                    >
                                        {p}
                                    </button>
                                )
                            )}
                            <button className="join-item btn" onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages || loading}>»</button>
                        </div>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;