import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Create({ auth, warehouses }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        barcode: '',
        weight: '',
        brand: '',
        expiry_date: '',
        warehouse_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('stock.store'));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="h-screen p-6">
                <h1 className="text-2xl mb-4">Add New Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Barcode</label>
                        <input
                            type="text"
                            value={data.barcode}
                            onChange={e => setData('barcode', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.barcode && <div className="text-danger">{errors.barcode}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Weight (kg)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.weight}
                            onChange={e => setData('weight', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.weight && <div className="text-danger">{errors.weight}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Brand</label>
                        <input
                            type="text"
                            value={data.brand}
                            onChange={e => setData('brand', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.brand && <div className="text-danger">{errors.brand}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Expiry Date</label>
                        <input
                            type="date"
                            value={data.expiry_date}
                            onChange={e => setData('expiry_date', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                            min={new Date().toISOString().split('T')[0]} // Bloquer les dates passées
                        />
                        {errors.expiry_date && <div className="text-danger">{errors.expiry_date}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Warehouse Location</label>
                        <select
                            value={data.warehouse_id}
                            onChange={e => setData('warehouse_id', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        >
                            <option value="">Select a warehouse</option>
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.name} - {warehouse.building_number} {warehouse.street}, {warehouse.city}, {warehouse.postal_code}
                                </option>
                            ))}
                        </select>
                        {errors.warehouse_id && <div className="text-danger">{errors.warehouse_id}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
