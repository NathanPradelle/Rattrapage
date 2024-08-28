import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";


export default function CompleteHarvest({ request }) {
    const { data, setData, post, errors } = useForm({
        final_quantity: request.quantity,
        note: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('harvest-requests.complete', request.id));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        >
            <div>
                <h1>Complete Harvest for {request.product_type}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label>Final Quantity</label>
                        <input
                            type="number"
                            value={data.final_quantity}
                            onChange={(e) => setData('final_quantity', e.target.value)}
                            className="form-control"
                        />
                        {errors.final_quantity && <div className="text-danger">{errors.final_quantity}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Notes</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="form-control"
                        />
                        {errors.note && <div className="text-danger">{errors.note}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Complete Harvest</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
