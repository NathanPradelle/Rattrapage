import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ distributionTour, pdfAvailable, pdfLink, auth }) {
    return (
        <AdminLayout user={auth.user}>
            <div className="p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6">Détails de la Tournée de Distribution #{distributionTour.id}</h1>

                <div className="mb-6">
                    <p><strong>Date:</strong> {distributionTour.date}</p>
                    <p><strong>Entrepôt:</strong> {distributionTour.warehouse.name}</p>
                    <p><strong>Période:</strong> {distributionTour.period}</p>
                    <p><strong>Adresse de Distribution:</strong> {distributionTour.address}</p>
                    <p><strong>Status:</strong> {distributionTour.status}</p>
                </div>

                {pdfAvailable && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Récapitulatif PDF</h3>
                        <a href={pdfLink} target="_blank" className="text-blue-500 hover:underline">
                            Voir le PDF du Récapitulatif
                        </a>
                    </div>
                )}

                <h2 className="text-xl font-semibold mb-4">Bénévoles Assistants :</h2>
                <ul className="list-disc pl-6 mb-6">
                    {distributionTour.volunteers.map(volunteer => (
                        <li key={volunteer.id}>{volunteer.name}</li>
                    ))}
                </ul>

                <h2 className="text-xl font-semibold mb-4">Produits à Distribuer :</h2>
                <ul className="list-disc pl-6">
                    {distributionTour.products.map(product => (
                        <li key={product.id}>{product.name} - {product.quantity} unités</li>
                    ))}
                </ul>
            </div>
        </AdminLayout>
    );
}
