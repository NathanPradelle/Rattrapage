import AdminLayout from '@/Layouts/AdminLayout.jsx';
import NavBar from "@/Pages/Candidature/NavBar.jsx";
import {Link} from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";

export default function CandidatureR({ auth, candidatures }) {
    const handleExamineClick = (id) => {
        Inertia.patch(route('candidatures.update.enattente', id));
    };
    return (
        <AdminLayout user={auth.user}>
            <NavBar />

            <div className="mt-8">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nom</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Date de dernière candidature</th>
                        <th className="py-2 px-4 border-b">Services demandés</th>
                        <th className="py-2 px-4 border-b">Statut</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {candidatures.data.map(candidature => (
                        <tr key={candidature.id}>
                            <td className="py-2 px-4 border-b text-center">{candidature.name}</td>
                            <td className="py-2 px-4 border-b text-center">{candidature.email}</td>
                            <td className="py-2 px-4 border-b text-center">{candidature.date_derniere_candidature}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {[candidature.service_1, candidature.service_2, candidature.service_3].filter(Boolean).join(', ')}
                            </td>
                            <td className="py-2 px-4 border-b text-center">Refusé</td>
                            <td className="py-2 px-4 border-b text-center">
                                <button
                                    onClick={() => handleExamineClick(candidature.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Révoquer le refus
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    {candidatures.links && (
                        <div className="flex justify-center">
                            {candidatures.links.map(link => (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    className={`px-4 py-2 border ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-gray-200'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
