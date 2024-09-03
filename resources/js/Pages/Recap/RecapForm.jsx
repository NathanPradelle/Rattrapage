import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Inertia } from '@inertiajs/inertia';

export default function RecapForm({ tour, tourType, auth }) {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = tourType === 'harvest' ? 'harvest-tours.completeRecap' : 'distribution-tours.completeRecap';
        Inertia.post(route(routeName, tour.id), { description });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">
                    Récapitulatif de la Tournée de {tourType === 'harvest' ? 'Récolte' : 'Distribution'} #{tour.id}
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description de la Tournée</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control text-black bg-white border border-gray-300 rounded p-2 w-full h-40"
                            placeholder={`Entrez les détails de la tournée de ${tourType === 'harvest' ? 'récolte' : 'distribution'}, les observations, etc.`}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary text-gray-700">Valider le récapitulatif</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
