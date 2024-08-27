import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Form({ auth }) {
    const { data, setData, post, errors } = useForm({
        user_id: auth.user.id,
        phone: '',
        validation: 0,
        motif: '',
        service_1: '',
        service_2: '',
        service_3: '',
        nationalite: '',
        age: '',
    });

    const services = [
        { id: 1, name: 'Routier' },
        { id: 2, name: 'Cuisinier' },
        { id: 3, name: 'Prof' },
    ];

    const [filteredService2, setFilteredService2] = useState(services);
    const [filteredService3, setFilteredService3] = useState(services);

    useEffect(() => {
        setFilteredService2(services.filter(service => service.id !== parseInt(data.service_1)));
        setFilteredService3(services.filter(service => service.id !== parseInt(data.service_1) && service.id !== parseInt(data.service_2)));
    }, [data.service_1, data.service_2]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('candidature.store'));
    };

    const { props } = usePage();
    const validationErrors = props.errors;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Form" />

            {/* Affichage des erreurs globales de candidature */}
            {validationErrors.candidature && (
                <div className="mb-4 p-4 text-white bg-red-500 rounded" dangerouslySetInnerHTML={{ __html: validationErrors.candidature }}></div>
            )}

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl mx-auto mt-8 p-5 bg-white rounded-lg shadow-lg space-y-4 border border-gray-300"
            >
                {/* Champ caché pour l'ID de l'utilisateur */}
                <input
                    type="hidden"
                    value={data.user_id}
                    name="user_id"
                />

                <div>
                    <label className="block text-lg font-medium text-gray-700">Numéro de téléphone</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Motif de la candidature</label>
                    <textarea
                        value={data.motif}
                        onChange={e => setData('motif', e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.motif && <div className="text-red-600 text-sm mt-1">{errors.motif}</div>}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Service 1 (obligatoire)</label>
                    <select
                        value={data.service_1}
                        onChange={e => setData('service_1', e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Sélectionner un service</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    {errors.service_1 && <div className="text-red-600 text-sm mt-1">{errors.service_1}</div>}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Service 2 (optionnel)</label>
                    <select
                        value={data.service_2}
                        onChange={e => setData('service_2', e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Aucun</option>
                        {filteredService2.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    {errors.service_2 && <div className="text-red-600 text-sm mt-1">{errors.service_2}</div>}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Service 3 (optionnel)</label>
                    <select
                        value={data.service_3}
                        onChange={e => setData('service_3', e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Aucun</option>
                        {filteredService3.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    {errors.service_3 && <div className="text-red-600 text-sm mt-1">{errors.service_3}</div>}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Nationalité</label>
                    <select
                        value={data.nationalite}
                        onChange={e => setData('nationalite', e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Sélectionner une nationalité</option>
                        <option value="fr">Français</option>
                        <option value="us">Américain</option>
                        <option value="uk">Britannique</option>
                    </select>
                    {errors.nationalite && <div className="text-red-600 text-sm mt-1">{errors.nationalite}</div>}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Âge</label>
                    <input
                        type="number"
                        value={data.age}
                        onChange={e => setData('age', e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.age && <div className="text-red-600 text-sm mt-1">{errors.age}</div>}
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
                    >
                        Soumettre la candidature
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
