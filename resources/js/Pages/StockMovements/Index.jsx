import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';

export default function Index({ movements, auth }) {
    return (
        <AdminLayout
        user={auth.user}>
            <div>
                <h1>Stock Movements</h1>
                <InertiaLink href={route('stock-movements.create')} className="btn btn-primary mb-4">Record New Movement</InertiaLink>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Note</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movements.map(movement => (
                        <tr key={movement.id}>
                            <td>{movement.product.name}</td>
                            <td>{movement.movement_type}</td>
                            <td>{movement.quantity}</td>
                            <td>{movement.user.name}</td>
                            <td>{movement.created_at}</td>
                            <td>{movement.note}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
