import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index({ products, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stock Management</h2>}>
            <div className="h-screen">
                <InertiaLink href={route('stock.create')} className="btn btn-primary">Add New Product</InertiaLink>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Barcode</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.barcode}</td>
                            <td>{product.quantity}</td>
                            <td>{product.expiry_date}</td>
                            <td>{product.location}</td>
                            <td>
                                <InertiaLink href={route('stock.edit', product.id)} className="btn btn-warning">Edit</InertiaLink>
                                <InertiaLink href={route('stock.destroy', product.id)} method="delete" className="btn btn-danger" as="button">Delete</InertiaLink>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
