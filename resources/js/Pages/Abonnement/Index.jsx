import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Index"/>
            <div className="flex flex-col min-h-screen">
                {/* Contenu principal */}
                <div className="flex-grow flex justify-around items-center space-x-8">
                    {/* Section Particulier */}
                    <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 max-h-96 flex flex-col justify-between">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Particulier</h2>
                            <ul className="list-disc pl-6 text-gray-800">
                                <li className="text-lg">Récolte de produit directement chez vous</li>
                            </ul>
                        </div>
                        <p className="mt-6 text-center text-green-600 text-xl font-semibold">
                            Gratuit
                        </p>
                    </div>

                    {/* Section Particulier+ */}
                    <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 max-h-96 flex flex-col justify-between">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Particulier+</h2>
                            <ul className="list-disc pl-6 text-gray-800">
                                <li className="text-lg">Même avantage que le profil particulier</li>
                                <li className="text-lg mt-2">Accès à tous les services de l'association</li>
                            </ul>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <Link
                                href={route('abonnement.payment.page')}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-xl font-semibold"
                            >
                                5.99 euros / an
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
