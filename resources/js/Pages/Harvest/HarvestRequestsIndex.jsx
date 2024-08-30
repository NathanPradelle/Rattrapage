import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';
import NavLink from "@/Components/NavLink.jsx";
import {Link} from "@inertiajs/react";

export default function HarvestRequestsIndex({ requests, warehouses, auth, filters }) {
    // Utiliser des valeurs par défaut si `filters` ou ses propriétés sont undefined
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedWarehouse, setSelectedWarehouse] = useState(filters?.warehouse_id || '');
    const [selectedPeriod, setSelectedPeriod] = useState(filters?.period || '');
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('harvest-requests.index'), {
            search: search,
            warehouse_id: selectedWarehouse,
            period: selectedPeriod,
            status: selectedStatus,
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6">Harvest Requests</h1>
                <Link href={route('harvest.create')} className="text-blue-600 hover:text-blue-800">
                    Création de tournée de récolte
                </Link>
                <form onSubmit={handleSearch} className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by user or city"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                    />

                    <select
                        value={selectedWarehouse}
                        onChange={(e) => setSelectedWarehouse(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                    >
                        <option value="">All Sectors</option>
                        {warehouses.map(warehouse => (
                            <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.city}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                    >
                        <option value="">All Periods</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="form-control text-black bg-white border border-gray-300 rounded p-2"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="assigned">Assigned</option>
                        <option value="completed">Completed</option>
                        <option value="refused">Refused</option>
                    </select>

                    <button type="submit" className="btn btn-primary">Filter</button>
                </form>

                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">User</th>
                        <th className="py-3 px-6 text-left">Address</th>
                        <th className="py-3 px-6 text-left">Quantity</th>
                        <th className="py-3 px-6 text-left">Preferred Date</th>
                        <th className="py-3 px-6 text-left">Period</th>
                        <th className="py-3 px-6 text-left">Sector (City)</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {requests.data.map(request => (
                        <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{request.user.name}</td>
                            <td className="py-3 px-6 text-left">
                                {request.building_number}, {request.street}, {request.city}, {request.postal_code}, {request.country}
                            </td>
                            <td className="py-3 px-6 text-left">{request.quantity}</td>
                            <td className="py-3 px-6 text-left">{request.preferred_date}</td>
                            <td className="py-3 px-6 text-left capitalize">{request.period}</td>
                            <td className="py-3 px-6 text-left">{request.warehouse.city}</td>
                            <td className="py-3 px-6 text-left">{request.status}</td>
                            <td className="py-3 px-6 text-center">
                                <button
                                    onClick={() => handleRefuse(request.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Refuse
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    {requests.links.map((link, index) => (
                        <InertiaLink
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 mx-1 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );

    function handleRefuse(requestId) {
        Inertia.post(route('harvest-requests.refuse', requestId));
    }
}
