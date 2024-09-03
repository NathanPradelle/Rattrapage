import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function CreateHarvestRequest({ auth, warehouses }) {
    const { data, setData, post, errors } = useForm({
        building_number: '',
        street: '',
        city: '',
        postal_code: '',
        country: '',
        quantity: '',
        preferred_date: '',
        period: '',
        warehouse_id: '', // Utiliser l'ID de l'entrepôt
        note: '',
        phone_number: '', // Ajout du champ pour le numéro de téléphone
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('harvest-requests.store'));
    }

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateString = minDate.toISOString().split('T')[0];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Demande de récolte</h2>}
        >

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Building Number</label>
                        <input
                            type="text"
                            value={data.building_number}
                            onChange={(e) => setData('building_number', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.building_number &&
                            <div className="text-red-500 text-xs mt-2">{errors.building_number}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Street</label>
                        <input
                            type="text"
                            value={data.street}
                            onChange={(e) => setData('street', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.street && <div className="text-red-500 text-xs mt-2">{errors.street}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                        <input
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.city && <div className="text-red-500 text-xs mt-2">{errors.city}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                        <input
                            type="text"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.postal_code && <div className="text-red-500 text-xs mt-2">{errors.postal_code}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                        <input
                            type="text"
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.country && <div className="text-red-500 text-xs mt-2">{errors.country}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="+1234567890"
                        />
                        {errors.phone_number && (
                            <div className="text-red-500 text-xs mt-2">{errors.phone_number}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.quantity && <div className="text-red-500 text-xs mt-2">{errors.quantity}</div>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Preferred Date</label>
                    <input
                        type="date"
                        value={data.preferred_date}
                        onChange={(e) => setData('preferred_date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.preferred_date && <div className="text-red-500 text-xs mt-2">{errors.preferred_date}</div>}
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Preferred Period</label>
                    <select
                        value={data.period}
                        onChange={(e) => setData('period', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a period</option>
                        <option value="morning">Morning (8h-12h)</option>
                        <option value="afternoon">Afternoon (14h-18h)</option>
                        <option value="evening">Evening (19h-23h)</option>
                    </select>
                    {errors.period && <div className="text-red-500 text-xs mt-2">{errors.period}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Sector (City)</label>
                    <select
                        value={data.warehouse_id}
                        onChange={(e) => setData('warehouse_id', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a sector</option>
                        {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.city}
                            </option>
                        ))}
                    </select>
                    {errors.warehouse_id && <div className="text-red-500 text-xs mt-2">{errors.warehouse_id}</div>}
                </div>


                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Note</label>
                    <textarea
                        value={data.note}
                        onChange={(e) => setData('note', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="3"
                    />
                    {errors.note && <div className="text-red-500 text-xs mt-2">{errors.note}</div>}
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit Request
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
