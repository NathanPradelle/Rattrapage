import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';
import { Head } from '@inertiajs/react';
import {Inertia} from "@inertiajs/inertia";
import Modal from "@/Pages/Candidature/Modal.jsx";


export default function Show({ auth, candidature }) {
    const handleVerifiedClick = (id) => {
        Inertia.patch(route('candidatures.update.validees', id));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Détails de la Candidature" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Détails de la Candidature</h2>

                    <div className="space-y-4">
                        <div>
                            <strong>Nom:</strong> {candidature.name}
                        </div>
                        <div>
                            <strong>Email:</strong> {candidature.email}
                        </div>
                        <div>
                            <strong>Téléphone:</strong> {candidature.phone}
                        </div>
                        <div>
                            <strong>Date de dernière candidature:</strong> {candidature.date_derniere_candidature}
                        </div>
                        <div>
                            <strong>Motif de candidature:</strong> {candidature.motif}
                        </div>
                        <div>
                            <strong>Services
                                demandés:</strong> {[candidature.service_1, candidature.service_2, candidature.service_3].filter(Boolean).join(', ')}
                        </div>
                        <div>
                            <strong>Statut de
                                validation:</strong> {candidature.validation === 1 ? 'Validée' : (candidature.validation === 2 ? 'Refusée' : (candidature.validation === 3 ? 'En cours d\'Examen' : 'En attente'))}
                        </div>
                        {candidature.refus && (
                            <div>
                                <strong>Motif du refus:</strong> {candidature.refus}
                            </div>
                        )}
                        <button
                            onClick={() => handleVerifiedClick(candidature.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Valider la candidature
                        </button>
                        <div className="mt-6">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Refuser
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour refuser la candidature */}
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} candidatureId={candidature.id} />

        </AdminLayout>
    );
}
