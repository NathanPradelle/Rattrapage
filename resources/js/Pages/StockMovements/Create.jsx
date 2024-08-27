import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';

export default function Create({ auth, products }) {
    const { data, setData, post, errors } = useForm({
        product_id: products[0]?.id || '',
        movement_type: 'incoming',
        quantity: '',
        note: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('stock-movements.store'));
    }

    return (
        <AdminLayout
            user={auth.user}>
            <div>
                <h1>Record Stock Movement</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label>Product</label>
                        <select
                            value={data.product_id}
                            onChange={(e) => setData('product_id', e.target.value)}
                            className="form-control"
                        >
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        {errors.product_id && <div className="text-danger">{errors.product_id}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Movement Type</label>
                        <select
                            value={data.movement_type}
                            onChange={(e) => setData('movement_type', e.target.value)}
                            className="form-control"
                        >
                            <option value="incoming">Incoming</option>
                            <option value="outgoing">Outgoing</option>
                            <option value="adjustment">Adjustment</option>
                        </select>
                        {errors.movement_type && <div className="text-danger">{errors.movement_type}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="form-control"
                        />
                        {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label>Note</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            className="form-control"
                        />
                        {errors.note && <div className="text-danger">{errors.note}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Record Movement</button>
                </form>
            </div>
        </AdminLayout>
    );
}
