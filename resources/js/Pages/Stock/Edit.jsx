import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Edit({ product, auth }) {
    const { data, setData, put, errors } = useForm({
        name: product.name || '',
        barcode: product.barcode || '',
        quantity: product.quantity || 0,
        expiry_date: product.expiry_date || '',
        location: product.location || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('stock.update', product.id));
    }
    console.log(product);

    return (
        <AuthenticatedLayout
            user={auth.user}>
            <div className="h-screen">
                <h1>Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Barcode</label>
                        <input
                            type="text"
                            value={data.barcode}
                            onChange={(e) => setData('barcode', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.barcode && <div className="text-danger">{errors.barcode}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Expiry Date</label>
                        <input
                            type="date"
                            value={data.expiry_date}
                            onChange={(e) => setData('expiry_date', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.expiry_date && <div className="text-danger">{errors.expiry_date}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Location</label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.location && <div className="text-danger">{errors.location}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
