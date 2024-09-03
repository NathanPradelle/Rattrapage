import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from '@inertiajs/react';

export default function MyAssignedTours({ auth, harvestTours, distributionTours }) {
    const handleRecap = (tourId, type) => {
        Inertia.get(route('tours.recap.form', { id: tourId, type: type }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mes Tournées Assignées" />

            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Mes Tournées Assignées</h2>

                {/* Tournées de Récolte */}
                <h3 className="text-xl font-semibold mb-2">Tournées de Récolte</h3>
                <table className="min-w-full bg-white mb-6">
                    <thead>
                    <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Période</th>
                        <th className="py-3 px-6 text-left">Entrepôt</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {harvestTours.map(tour => (
                        <tr key={tour.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{tour.date}</td>
                            <td className="py-3 px-6 text-left">{tour.period}</td>
                            <td className="py-3 px-6 text-left">{tour.warehouse.name}</td>
                            <td className="py-3 px-6 text-left">{tour.status}</td>
                            <td className="py-3 px-6 text-center">
                                {tour.status === 'assigned' && (
                                    <button
                                        onClick={() => handleRecap(tour.id, 'harvest')}
                                        className="bg-blue-500 text-white py-1 px-3 rounded"
                                    >
                                        Faire le Récap
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Tournées de Distribution */}
                <h3 className="text-xl font-semibold mb-2">Tournées de Distribution</h3>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Période</th>
                        <th className="py-3 px-6 text-left">Adresse</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {distributionTours.map(tour => (
                        <tr key={tour.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{tour.date}</td>
                            <td className="py-3 px-6 text-left">{tour.period}</td>
                            <td className="py-3 px-6 text-left">{tour.address}</td>
                            <td className="py-3 px-6 text-left">{tour.status}</td>
                            <td className="py-3 px-6 text-center">
                                {tour.status === 'assigned' && (
                                    <button
                                        onClick={() => handleRecap(tour.id, 'distribution')}
                                        className="bg-blue-500 text-white py-1 px-3 rounded"
                                    >
                                        Faire le Récap
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
