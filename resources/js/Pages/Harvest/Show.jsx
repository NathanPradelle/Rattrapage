import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ harvestTour, pdfAvailable, pdfLink, auth }) {
    return (
        <AdminLayout user={auth.user}>
            <div className="p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6">Détails de la Tournée de Récolte #{harvestTour.id}</h1>

                <div className="mb-6">
                    <p><strong>Date:</strong> {harvestTour.date}</p>
                    <p><strong>Entrepôt:</strong> {harvestTour.warehouse.name}</p>
                    <p><strong>Période:</strong> {harvestTour.period}</p>
                    <p><strong>Status:</strong> {harvestTour.status}</p>
                </div>

                {pdfAvailable && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Récapitulatif PDF</h3>
                        <a href={pdfLink} target="_blank" className="text-blue-500 hover:underline">
                            Voir le PDF du Récapitulatif
                        </a>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
