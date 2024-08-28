import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { format } from 'date-fns'; // Utilisation de date-fns pour le formatage

export default function Edit({ product, warehouses, auth }) {
    const formatExpirationDate = (date) => {
        return date ? format(new Date(date), 'yyyy-MM-dd') : '';
    };

    const { data, setData, put, errors } = useForm({
        name: product.name || '',
        barcode: product.barcode || '',
        weight: product.weight || '',
        brand: product.brand || '',
        expiration_date: formatExpirationDate(product.expiry_date), // Utilisation de la fonction utilitaire
        warehouse_id: product.warehouse_id || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('stock.update', product.id));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="h-screen p-6">
                <h1 className="text-2xl mb-4">Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Barcode</label>
                        <input
                            type="text"
                            value={data.barcode}
                            onChange={(e) => setData('barcode', e.target.value)}
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
                            onChange={(e) => setData('weight', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.weight && <div className="text-danger">{errors.weight}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Brand</label>
                        <input
                            type="text"
                            value={data.brand}
                            onChange={(e) => setData('brand', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        />
                        {errors.brand && <div className="text-danger">{errors.brand}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                            type="date"
                            value={data.expiration_date}
                            onChange={(e) => setData('expiration_date', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                            min={new Date().toISOString().split('T')[0]} // Bloque les dates passées
                        />
                        {errors.expiration_date && <div className="text-danger">{errors.expiration_date}</div>}
                    </div>


                    <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-white">Warehouse Location</label>
                        <select
                            value={data.warehouse_id}
                            onChange={(e) => setData('warehouse_id', e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2"
                        >
                            <option value="">Select a warehouse</option>
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.name} - {warehouse.fullAddress}
                                </option>
                            ))}
                        </select>
                        {errors.warehouse_id && <div className="text-danger">{errors.warehouse_id}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

