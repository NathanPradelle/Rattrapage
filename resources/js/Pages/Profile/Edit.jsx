import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, candidature, abonnement }) {
    const getStatusStyle = (validation) => {
        switch (validation) {
            case 1:
                return "bg-green-100 border border-green-400 text-green-700";
            case 2:
                return "bg-red-100 border border-red-400 text-red-700";
            case 3:
                return "bg-blue-100 border border-blue-400 text-blue-700";
            default:
                return "bg-gray-100 border border-gray-400 text-gray-700";
        }
    };

    const getStatusText = (validation) => {
        switch (validation) {
            case 1:
                return "Validée";
            case 2:
                return "Refusée";
            case 3:
                return "En cours d'Examen";
            default:
                return "En attente";
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        {abonnement ? (
                            <p className="text-gray-800 text-2xl font-bold text-center">Particulier+</p>
                        ) : (
                            <p className="text-gray-800 text-2xl font-bold text-center">Particulier</p>
                        )}


                    </div>

                    {/* Affichage des informations de candidature uniquement si elles existent */}
                    {candidature && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div>
                                <p className={`p-2 rounded ${getStatusStyle(candidature.validation)}`}>
                                    <strong>Validation :</strong> {getStatusText(candidature.validation)}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Service(s) demandé(s) :</strong> {[
                                    candidature.service_1,
                                    candidature.service_2,
                                    candidature.service_3
                                ].filter(Boolean).join(', ')}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Date de candidature :</strong> {candidature.date_derniere_candidature}
                                </p>
                                {candidature.refus && (
                                    <p className="text-red-600"><strong>Motif du refus :</strong> {candidature.refus}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
