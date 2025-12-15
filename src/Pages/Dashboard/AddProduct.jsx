import axios from 'axios';
import React, { useContext, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const AddProduct = () => {
    const [showOnHome, setShowOnHome] = useState(false);
    const axiosInstance = useAxios();
    const {user} = useContext(AuthContext)

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value
        const description = form.description.value
        const category = form.category.value
        const price = form.price.value
        const quantity = form.quantity.value
        const moq = form.moq.value
        const productImage = form.productImage
        const paymentOption = form.paymentOption.value
        const file = productImage.files[0]


        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbURL}`, { image: file },
            {
                headers: {

                    'Content-Type': 'multipart/form-data'
                }
            })
        const mainPhotoUrl = res.data.data.display_url

        const formData = {
            productName,
            description,
            category,
            price: parseInt(price),
            quantity: parseInt(quantity),
            moq: parseInt(moq),
            productImage: mainPhotoUrl,
            paymentOption,
            showOnHome,
            managerEmail:user?.email 
        }


        if (res.data.success == true) {
            axiosInstance.post('/products', formData)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <div className="max-w-3xl mx-auto py-10 px-10 lg:px-20 bg-base-100 border border-gray-400 rounded-2xl shadow-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                    Add <span className="text-primary">New Listing</span>
                </h1>

            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                    <label className="label text-secondary font-semibold text-xl">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        className="input input-bordered w-full rounded-xl bg-base-200 "
                        placeholder="Enter Product name"
                        required
                    />
                </div>
                <div>
                    <label className="label text-secondary font-semibold text-xl">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        className="textarea textarea-bordered w-full rounded-xl bg-base-200"
                        placeholder="Write details..."
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Category</label>
                    <select
                        name="category"
                        className="select select-bordered w-full rounded-xl bg-base-200"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value='Shirt'>Shirt</option>
                        <option value='Pant'>Pant</option>
                        <option value='Jacket'>Jacket</option>
                        <option value='Accessories' >Accessories</option>
                    </select>
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="Price"
                    />
                </div>
                <div>
                    <label className="label text-secondary font-semibold text-xl">Qunatity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="quantity"
                    />
                </div>
                <div>
                    <label className="label text-secondary font-semibold text-xl">MOQ</label>
                    <input
                        type="number"
                        name="moq"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="MOQ"
                    />
                </div>
                <div>
                    <label className="label text-secondary font-semibold text-xl">image</label>
                    <input
                        type="file"
                        name="productImage"
                        className="input input-bordered w-full rounded-xl bg-base-200"
                        placeholder="MOQ"
                    />
                </div>

                <div>
                    <label className="label text-secondary font-semibold text-xl">payment Option</label>
                    <select
                        name="paymentOption"
                        className="select select-bordered w-full rounded-xl bg-base-200"
                        required
                    >
                        <option value="">Select Payment Option</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="payfirst">PayFirst</option>
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={showOnHome}
                        onChange={() => setShowOnHome(!showOnHome)}
                        className="h-5 w-5"
                    />
                    <label className="font-semibold">Show on Home Page (default false) </label>
                </div>





                <button type='submit' className="btn btn-neutral mt-4 w-full">add</button>
            </form>
        </div>
    );
};

export default AddProduct;