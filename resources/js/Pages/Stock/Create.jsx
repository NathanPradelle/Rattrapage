import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Create({auth}) {
    const { data, setData, post, errors } = useForm({
        name: '',
        barcode: '',
        quantity: 0,
        expiry_date: '',
        location: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('stock.store'));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}>
            <div className="h-screen">
                <h1>Add New Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="form-control text-gray-800" />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label>Barcode</label>
                        <input type="text" value={data.barcode} onChange={e => setData('barcode', e.target.value)} className="form-control text-gray-800" />
                        {errors.barcode && <div className="text-danger">{errors.barcode}</div>}
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" value={data.quantity} onChange={e => setData('quantity', e.target.value)} className="form-control text-gray-800" />
                        {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="date" value={data.expiry_date} onChange={e => setData('expiry_date', e.target.value)} className="form-control text-gray-800" />
                        {errors.expiry_date && <div className="text-danger">{errors.expiry_date}</div>}
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" value={data.location} onChange={e => setData('location', e.target.value)} className="form-control text-gray-800" />
                        {errors.location && <div className="text-danger">{errors.location}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );

}
