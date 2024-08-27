import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';

export default function HarvestRequestsIndex({ requests, auth }) {
    return (
        <AdminLayout user={auth.user}>
            <div>
                <h1>Harvest Requests</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Address</th>
                        <th>Product Type</th>
                        <th>Quantity</th>
                        <th>Preferred Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map(request => (
                        <tr key={request.id}>
                            <td>{request.user.name}</td>
                            <td>{request.address}</td>
                            <td>{request.product_type}</td>
                            <td>{request.quantity}</td>
                            <td>{request.preferred_date}</td>
                            <td>{request.status}</td>
                            <td>
                                <InertiaLink href={route('harvest-requests.assign', request.id)} className="btn btn-warning">Assign Volunteers</InertiaLink>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
