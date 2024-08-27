import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";


export default function CreateHarvestRequest({ auth }) {
    const { data, setData, post, errors } = useForm({
        address: '',
        product_type: '',
        quantity: '',
        preferred_date: '',
        note: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('harvest-requests.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Demande de récolte</h2>}>
            <div className='h-screen'>
                <h1>Request a Harvest</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label>Address</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="form-control text-gray-800"
                        />
                        {errors.address && <div className="text-danger">{errors.address}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Product Type</label>
                        <input
                            type="text"
                            value={data.product_type}
                            onChange={(e) => setData('product_type', e.target.value)}
                            className="form-control text-gray-800"
                        />
                        {errors.product_type && <div className="text-danger">{errors.product_type}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="form-control text-gray-800"
                        />
                        {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Preferred Date</label>
                        <input
                            type="date"
                            value={data.preferred_date}
                            onChange={(e) => setData('preferred_date', e.target.value)}
                            className="form-control text-gray-800"
                        />
                        {errors.preferred_date && <div className="text-danger">{errors.preferred_date}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Note</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="form-control text-gray-800"
                        />
                        {errors.note && <div className="text-danger">{errors.note}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit Request</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
