import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../provider/AuthProvider';

const ManageProduct = () => {


    const [products, setProducts] = useState([])
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosInstance.get(`/manager/products/${user?.email}`)
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [axiosInstance, user?.email])
    console.log(products);
    return (
        <div>
            <div className='container bg-base-200 mx-auto pt-10 pb-16 px-4 lg:px-20 min-h-screen'>
                <div className="text-center mb-10">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">Manage <span className='text-primary'>Products</span> </h3>
                </div>



                <div className="overflow-x-auto border border-neutral-300 rounded-2xl shadow-2xl">
                    <table className="table">
                        <thead className='text-primary text-xl bg-base-300'>
                            <tr>
                                <th>Name & Description</th>
                                <th>Category</th>
                                <th>Pick Up Date</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(service =>
                                    <tr key={service?._id} className='bg-base-100 '>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={service?.productImage}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{service?.name}</div>
                                                    <p className='text-base-content/60'>{service?.description}</p>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-outline text-base-content/70 badge-neutral font-semibold">{service?.category}</span>
                                        </td>
                                        <td><p>{service?.date}</p></td>
                                        <td><p className='font-bold'>৳{service?.price}</p></td>
                                        <td>
                                            <div className='flex gap-3'>
                                                <button className="btn btn-error btn-sm rounded-lg">Delete</button>

                                                <Link to={`/update-services/${service?._id}`}><button className="btn btn-accent btn-sm rounded-lg">Update</button></Link>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>





            </div>
        </div>
    );
};

export default ManageProduct;