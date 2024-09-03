import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function CreateDistributionTour({ warehouses, auth }) {
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]); // Ajouter un état pour les produits
    const [volunteerDriver, setVolunteerDriver] = useState('');
    const [volunteerAssistants, setVolunteerAssistants] = useState([]);
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [availableAssistants, setAvailableAssistants] = useState([]);
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (selectedWarehouse) {
            // Appel API pour récupérer les produits du bâtiment sélectionné
            axios.get(route('api.products.filter'), {
                params: { warehouse: selectedWarehouse }
            })
                .then(response => setProducts(response.data))
                .catch(error => console.error(error));
        }

        if (selectedWarehouse && selectedDate && selectedPeriod) {
            axios.get(route('api.volunteers.filter'), {
                params: {
                    warehouse: selectedWarehouse,
                    date: selectedDate,
                    period: selectedPeriod
                }
            })
                .then(response => {
                    setAvailableDrivers(response.data.drivers);
                    setAvailableAssistants(response.data.assistants);
                })
                .catch(error => console.error(error));
        }
    }, [selectedWarehouse, selectedDate, selectedPeriod]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (volunteerAssistants.length !== 2) {
            alert('Vous devez sélectionner exactement 2 bénévoles assistants.');
            return;
        }

        const formData = {
            warehouse_id: selectedWarehouse,
            date: selectedDate,
            period: selectedPeriod,
            volunteer_driver_id: volunteerDriver,
            volunteer_assistants_ids: volunteerAssistants,
            product_ids: selectedProducts,
            address,
        };
        Inertia.post(route('distribution-tours.store'), formData);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Créer une Tournée de Distribution" />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Créer une Tournée de Distribution</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Entrepôt</label>
                        <select
                            value={selectedWarehouse}
                            onChange={e => setSelectedWarehouse(e.target.value)}
                            className="form-select mt-1 block w-full p-2 border rounded"
                        >
                            <option value="">Sélectionner un entrepôt</option>
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.city}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Date de la tournée</label>
                        <input
                            type="date"
                            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="form-input mt-1 block w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Période</label>
                        <select
                            value={selectedPeriod}
                            onChange={e => setSelectedPeriod(e.target.value)}
                            className="form-select mt-1 block w-full p-2 border rounded"
                        >
                            <option value="">Sélectionner une période</option>
                            <option value="morning">Matin</option>
                            <option value="afternoon">Après-midi</option>
                            <option value="evening">Soir</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Adresse de Distribution</label>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="form-input mt-1 block w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Produits à Distribuer</label>
                        <table className="table-auto w-full mt-2 border border-gray-700">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-700">Nom du Produit</th>
                                <th className="px-4 py-2 border border-gray-700">Sélectionner</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="border border-gray-700 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-700 px-4 py-2">
                                        <input
                                            type="checkbox"
                                            value={product.id}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setSelectedProducts([...selectedProducts, product.id]);
                                                } else {
                                                    setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Routier</label>
                        <select
                            value={volunteerDriver}
                            onChange={e => setVolunteerDriver(e.target.value)}
                            className="form-select mt-1 block w-full p-2 border rounded"
                        >
                            <option value="">Sélectionner un routier</option>
                            {availableDrivers.map(volunteer => (
                                <option key={volunteer.id} value={volunteer.id}>{volunteer.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3 className="font-semibold">Bénévoles Assistants</h3>
                        <table className="table-auto w-full mt-2 border border-gray-700">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-700">Nom</th>
                                <th className="px-4 py-2 border border-gray-700">Sélectionner</th>
                            </tr>
                            </thead>
                            <tbody>
                            {availableAssistants.map(volunteer => (
                                <tr key={volunteer.id}>
                                    <td className="border border-gray-700 px-4 py-2">{volunteer.name}</td>
                                    <td className="border border-gray-700 px-4 py-2">
                                        <input
                                            type="checkbox"
                                            value={volunteer.id}
                                            onChange={(e) => {
                                                if (e.target.checked && volunteerAssistants.length < 2) {
                                                    setVolunteerAssistants([...volunteerAssistants, volunteer.id]);
                                                } else if (!e.target.checked) {
                                                    setVolunteerAssistants(volunteerAssistants.filter(id => id !== volunteer.id));
                                                }
                                            }}
                                            disabled={!volunteerAssistants.includes(volunteer.id) && volunteerAssistants.length >= 2}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <button type="submit" className="btn btn-primary">Créer la Tournée</button>
                </form>
            </div>
        </AdminLayout>
    );
}
