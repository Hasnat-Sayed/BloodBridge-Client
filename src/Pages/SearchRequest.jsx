import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaEye, FaMapMarkerAlt, FaSearch, FaTint } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';

const SearchRequest = () => {

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])

    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    const axiosInstance = useAxios();
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas)
            })
        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts)
            })
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.blood.value;
        // console.log(bloodGroup);
        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                // console.log(res.data);
                setSearchResults(res.data)
            })
    }


    return (
        <div className="container bg-base-200 mx-auto pt-10 pb-16 px-4 lg:px-20 min-h-screen">
            <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">Search <span className='text-primary'>Blood</span> Donation <span className='text-accent'>Requests </span></h3>
            </div>



            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSearch}>
                    <div className="bg-base-100 rounded-2xl shadow-2xl p-6 border border-secondary/20">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="w-full">


                                <label className="label text-secondary font-semibold">BLOOD GROUP</label>
                                <select name="blood" defaultValue="Choose Blood Group" className="select w-full bg-base-200 rounded-xl">

                                    <option disabled={true}>Choose Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>

                            <div className="w-full">

                                <label className="label text-secondary font-semibold">DISTRICT</label>
                                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="select w-full bg-base-200 rounded-xl">
                                    <option disabled value=''>Select District</option>
                                    {
                                        districts.map(d => <option value={d?.name} key={d.id} > {d?.name}</option>)
                                    }
                                </select>
                            </div>

                            <div className="w-full">
                                <label className="label text-secondary font-semibold">UPAZILLA</label>
                                <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select w-full bg-base-200 rounded-xl">
                                    <option disabled value=''>Select Upazila</option>
                                    {
                                        upazilas.map(u => <option value={u?.name} key={u.id} >{u?.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>

                        <button type='submit' className="btn btn-primary w-full mt-5 text-lg gap-2 rounded-xl">
                            <FaSearch />
                            Search
                        </button>
                    </div>
                </form>

            </div>

            <div className=" py-12">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-secondary">
                        Search Results
                        <span className="text-primary ml-3">
                            {searchResults.length >= 0 && `(${searchResults.length})`}
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {searchResults.map(request => (
                        <div key={request?._id}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl hover:border-primary hover:-translate-y-2 transition-all duration-300 border border-secondary/20">
                            <div className="card-body">

                                <div className="flex justify-between items-start pb-3 border-b border-secondary/30">
                                    <h3 className="font-bold text-2xl  text-secondary">{request.recipient_name}</h3>
                                    <div className="badge badge-primary badge-lg font-bold text-lg px-4 py-4">
                                        {request?.blood_group}
                                    </div>
                                </div>

                                <div className="space-y-3 mt-2 pb-2 border-b border-secondary/30">
                                    <div className="flex items-center gap-2 text-base-content/80">
                                        <FaMapMarkerAlt className="text-error text-xl" />
                                        <span className="font-medium text-lg">
                                            {request?.recipient_upazila}, {request?.recipient_district}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-base-content/80">
                                        <FaCalendarAlt className="text-primary text-xl" />
                                        <span className="font-medium text-lg">{request?.donation_date}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-base-content/80">
                                        <FaClock className="text-accent text-xl" />
                                        <span className="font-medium text-lg">{request?.donation_time}</span>
                                    </div>
                                </div>

                                <div className="card-actions mt-2">
                                    <button className="btn btn-primary w-full gap-2">
                                        <FaEye />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchRequest;