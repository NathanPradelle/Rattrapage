import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index({ products, warehouses, auth, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedWarehouse, setSelectedWarehouse] = useState(filters.warehouse_id || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('stock.index'), {
            search: search,
            warehouse_id: selectedWarehouse,
            date_from: dateFrom,
            date_to: dateTo,
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-6 text-gray-800">
                <h1 className="text-2xl mb-4 text-white">Stock Management</h1>

                <form onSubmit={handleSearch} className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by name or barcode"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                    />

                    <select
                        value={selectedWarehouse}
                        onChange={(e) => setSelectedWarehouse(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                    >
                        <option value="">All Warehouses</option>
                        {warehouses.map(warehouse => (
                            <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        placeholder="From"
                    />

                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        placeholder="To"
                    />

                    <button type="submit" className="btn btn-primary text-white">Filter</button>
                </form>

                <table className="table-auto w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Barcode</th>
                        <th className="px-4 py-2">Brand</th>
                        <th className="px-4 py-2">Weight (kg)</th>
                        <th className="px-4 py-2">Expiry Date</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.data.map(product => (
                        <tr key={product.id} className="bg-white">
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.barcode}</td>
                            <td className="border px-4 py-2">{product.brand}</td>
                            <td className="border px-4 py-2">{product.weight}</td>
                            <td className="border px-4 py-2">{product.expiry_date}</td>
                            <td className="border px-4 py-2">{product.warehouse ? product.warehouse.name : ''}</td>
                            <td className="border px-4 py-2">
                                <InertiaLink href={route('stock.edit', product.id)} className="btn btn-warning mr-2">Edit</InertiaLink>
                                <InertiaLink href={route('stock.destroy', product.id)} method="delete" className="btn btn-danger" as="button">Delete</InertiaLink>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    {/* Pagination Links */}
                    {products.links.map((link, index) => (
                        <InertiaLink
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 mx-1 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
