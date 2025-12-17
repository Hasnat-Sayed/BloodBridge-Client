import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaSearch, FaTint } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';
import { Link } from 'react-router';

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
                console.log(res.data);
                setSearchResults(res.data)
            })
    }


    return (
        <div className="container bg-base-200 mx-auto pt-10 pb-16 px-4 lg:px-20 min-h-screen">
            <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">Search <span className='text-primary'>Blood</span> Donors</h3>
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
                            Search Donors
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
                    {searchResults.map(donor => (
                        <div
                            key={donor?._id}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl border border-primary hover:-translate-y-2 hover:shadow-primary/60 transition-all duration-300 "
                        >
                            <div className="card-body">
                                <div className="flex items-center gap-4 pb-4 border-b border-secondary/30">
                                    <div className="avatar">
                                        <div className="w-20 rounded-full ring ring-primary ring-offset-2">
                                            <img
                                                src={donor?.mainPhotoUrl}
                                                alt={donor?.name}
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-2xl text-secondary">{donor?.name}</h3>
                                        <div className="badge badge-primary badge-lg font-bold text-lg mt-1 px-3 py-3">
                                            <FaTint className="mr-1" />
                                            {donor?.blood}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-3 ">
                                    <div className="flex items-center gap-2 text-base-content/80">
                                        <FaEnvelope className="text-accent text-xl" />
                                        <span className="font-medium text-lg">{donor?.email}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-base-content/80">
                                        <FaMapMarkerAlt className="text-error text-xl" />
                                        <span className="font-medium text-lg">
                                            Upazilla: {donor?.upazila}
                                        </span>

                                    </div>
                                    <div className="flex items-center gap-2 text-base-content/80 border-b border-secondary/30 pb-2">
                                        <FaMapMarkerAlt className="text-secondary text-xl" />
                                        <span className="font-medium text-lg">
                                            District: {donor?.district}
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between ">
                                        <div className={`badge badge-lg badge-soft badge-outline ${donor?.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                                            {donor?.status?.toUpperCase()}
                                        </div>
                                        <div className="badge badge-soft badge-accent badge-lg badge-outline">
                                            {donor?.role?.toUpperCase()}
                                        </div>
                                    </div>
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