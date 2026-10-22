import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaTint, FaEraser, FaUserSlash, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';
import SectionTitle from '../components/home/SectionTitle';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const SkeletonRows = () => (
	Array.from({ length: 5 }).map((_, i) => (
		<tr key={i}>
			<td><div className="flex items-center gap-3"><div className="skeleton h-12 w-12 rounded-full shrink-0"></div><div className="skeleton h-4 w-32"></div></div></td>
			<td><div className="skeleton h-6 w-12 rounded-full"></div></td>
			<td className=""><div className="skeleton h-4 w-40"></div></td>
			<td className=""><div className="skeleton h-4 w-44"></div></td>
			<td className=""><div className="skeleton h-6 w-16 rounded-full"></div></td>
			<td><div className="skeleton h-8 w-20"></div></td>
		</tr>
	))
);

const SearchRequest = () => {
	const axiosInstance = useAxios();

	const [districts, setDistricts] = useState([]);
	const [upazilas, setUpazilas] = useState([]);

	const [bloodGroup, setBloodGroup] = useState('');
	const [district, setDistrict] = useState('');
	const [upazila, setUpazila] = useState('');

	const [results, setResults] = useState([]);
	const [status, setStatus] = useState('idle');
	const [searched, setSearched] = useState({ bloodGroup: '', district: '', upazila: '' });
	const latestRequest = useRef(0);

	useEffect(() => {
		axios.get('/district.json').then(res => setDistricts(res.data.districts)).catch(() => { });
		axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas)).catch(() => { });
	}, []);

	const selectedDistrict = districts.find(d => d.name === district);
	const upazilaOptions = selectedDistrict
		? upazilas.filter(u => u.district_id === selectedDistrict.id)
		: upazilas;

	const hasFilters = Boolean(bloodGroup || district || upazila);

	const runSearch = (filters) => {
		const id = ++latestRequest.current;
		setStatus('loading');
		setSearched(filters);
		axiosInstance.get('/search-requests', {
			params: {
				bloodGroup: filters.bloodGroup || undefined,
				district: filters.district || undefined,
				upazila: filters.upazila || undefined,
			},
		})
			.then(res => {
				if (id !== latestRequest.current) return;
				setResults(Array.isArray(res.data) ? res.data : []);
				setStatus('success');
			})
			.catch(() => {
				if (id !== latestRequest.current) return;
				setResults([]);
				setStatus('error');
			});
	};

	const handleSearch = (e) => {
		e.preventDefault();
		runSearch({ bloodGroup, district, upazila });
	};

	const clearFilters = () => {
		latestRequest.current++;
		setBloodGroup('');
		setDistrict('');
		setUpazila('');
		setResults([]);
		setStatus('idle');
	};

	const locationText = (d) => [d?.upazila, d?.district].filter(Boolean).join(', ') || '—';

	return (
		<div className="bg-base-200">
			<div className="container mx-auto pt-10 pb-16 px-4 lg:px-20 min-h-screen">
				
				<SectionTitle title="	Search Blood" highlight="Donors" subtitle="Pick a blood group, then narrow down by district and upazila." />

				<form onSubmit={handleSearch} className="max-w-4xl mx-auto">
					<div className="bg-base-100 rounded-2xl shadow-xl p-6 border border-base-300">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<label className="w-full">
								<span className="label text-heading font-semibold">BLOOD GROUP</span>
								<select
									required
									value={bloodGroup}
									onChange={(e) => setBloodGroup(e.target.value)}
									className="select w-full bg-base-200 rounded-xl"
								>
									<option value="" disabled>Choose blood group</option>
									{BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
								</select>
							</label>

							<label className="w-full">
								<span className="label text-heading font-semibold">DISTRICT</span>
								<select
									value={district}
									onChange={(e) => { setDistrict(e.target.value); setUpazila(''); }}
									className="select w-full bg-base-200 rounded-xl"
								>
									<option value="">Any district</option>
									{districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
								</select>
							</label>

							<label className="w-full">
								<span className="label text-heading font-semibold">UPAZILA</span>
								<select
									value={upazila}
									onChange={(e) => setUpazila(e.target.value)}
									className="select w-full bg-base-200 rounded-xl"
								>
									<option value="">Any upazila</option>
									{upazilaOptions.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
								</select>
							</label>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 mt-5">
							<button type="submit" disabled={status === 'loading'} className="btn btn-primary flex-1 text-lg gap-2 rounded-xl">
								<FaSearch /> Search Donors
							</button>
							<button type="button" onClick={clearFilters} disabled={!hasFilters && status === 'idle'} className="btn btn-outline sm:w-44 gap-2 rounded-xl">
								<FaEraser /> Clear Filters
							</button>
						</div>
					</div>
				</form>

				<div className="pt-12" aria-live="polite">
					{status === 'idle' && (
						<div className="text-center py-16 max-w-md mx-auto">
							<div className="w-20 h-20 mx-auto rounded-full bg-primary/15 text-primary text-3xl flex items-center justify-center mb-5">
								<FaTint />
							</div>
							<h4 className="text-2xl font-bold text-heading mb-2">Find a donor near you</h4>
							<p className="text-base-content/80">Choose a blood group above and press <b>Search Donors</b> to see who is available.</p>
						</div>
					)}

					{status === 'error' && (
						<div className="text-center py-16">
							<p className="text-error font-semibold mb-4">Something went wrong while searching.</p>
							<button className="btn btn-primary" onClick={() => runSearch(searched)}>Try again</button>
						</div>
					)}

					{(status === 'loading' || (status === 'success' && results.length > 0)) && (
						<>
							<div className="mb-5 flex flex-wrap items-center gap-3">
								<h2 className="text-2xl md:text-3xl font-bold text-heading">
									Search Results
									{status === 'success' && <span className="text-primary ml-3">({results.length})</span>}
								</h2>
								<div className="flex flex-wrap gap-2">
									{[searched.bloodGroup, searched.district, searched.upazila].filter(Boolean).map(f => (
										<span key={f} className="badge badge-outline badge-primary">{f}</span>
									))}
								</div>
							</div>

							<div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-300 shadow-md">
								<table className="table min-w-200 whitespace-nowrap">
									<thead className="bg-base-300/50 text-heading">
										<tr>
											<th>Donor</th>
											<th>Blood</th>
											<th className="">Location</th>
											<th className="">Email</th>
											<th className="">Status</th>
											<th>Contact</th>
										</tr>
									</thead>
									<tbody>
										{status === 'loading' ? <SkeletonRows /> : results.map(donor => (
											<tr key={donor?._id} className="hover:bg-base-200 transition-colors">
												<td>
													<div className="flex items-center gap-3">
														<div className="avatar avatar-placeholder">
															{donor?.mainPhotoUrl ? (
																<div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
																	<img src={donor.mainPhotoUrl} alt={donor?.name} referrerPolicy="no-referrer" loading="lazy" />
																</div>
															) : (
																<div className="w-12 rounded-full bg-primary text-primary-content font-bold">
																	{donor?.name?.charAt(0)?.toUpperCase() || '?'}
																</div>
															)}
														</div>
														<div className="min-w-0">
															<p className="font-bold text-heading">{donor?.name}</p>
														</div>
													</div>
												</td>
												<td><span className="badge badge-primary font-bold">{donor?.blood}</span></td>
												<td className=" text-base-content/80">
													<span className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary shrink-0" />{locationText(donor)}</span>
												</td>
												<td className=" text-base-content/80">{donor?.email}</td>
												<td className="">
													<span className={`badge badge-soft ${donor?.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
														{donor?.status?.toUpperCase()}
													</span>
												</td>
												<td>
													<a href={`mailto:${donor?.email}`} className="btn btn-sm btn-primary btn-outline gap-2">
														<FaEnvelope /> Email
													</a>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</>
					)}

					{status === 'success' && results.length === 0 && (
						<div className="text-center py-16 max-w-lg mx-auto">
							<div className="w-20 h-20 mx-auto rounded-full bg-warning/20 text-warning text-3xl flex items-center justify-center mb-5">
								<FaUserSlash />
							</div>
							<h4 className="text-2xl font-bold text-heading mb-2">No donors found</h4>
							<p className="text-base-content/80 mb-6">
								We couldn’t find any <b>{searched.bloodGroup}</b> donor
								{(searched.upazila || searched.district) && <> in <b>{[searched.upazila, searched.district].filter(Boolean).join(', ')}</b></>}.
								<br></br>Try a wider area, or a different blood group.
							</p>
							<div className="flex flex-wrap justify-center gap-3">
								{searched.upazila && (
									<button className="btn btn-primary btn-outline" onClick={() => { setUpazila(''); runSearch({ ...searched, upazila: '' }); }}>
										Search whole {searched.district || 'country'}
									</button>
								)}
								<button className="btn btn-primary" onClick={clearFilters}><FaEraser /> Clear Filters</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchRequest;