import React from 'react';

const AddProduct = () => {
    return (
        <div className="max-w-3xl mx-auto bg-base-100 py-10 px-10 lg:px-20 rounded-2xl shadow-xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                    Add <span className="text-primary">New Listing</span>
                </h1>

            </div>
            <form className="space-y-4">
                <div>
                    <label className="label text-secondary font-semibold text-xl">Product/Pet Name</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="Enter name"
                        required
                    />
                </div>
                <div>
                    <label className="label text-secondary font-semibold text-xl">Product/Pet Name</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="Enter name"
                        required
                    />
                </div>
                <div>
                    <label className="label text-secondary font-semibold text-xl">Product/Pet Name</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="Enter name"
                        required
                    />
                </div>

                

                <button className="btn btn-neutral mt-4 w-full">Login</button>
            </form>
        </div>
    );
};

export default AddProduct;