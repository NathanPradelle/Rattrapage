import { useState, useEffect } from 'react';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useColumns from './useColumns';

const Index = ({ tickets, pagination, auth }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const columns = useColumns();

    // Extraire les données des tickets
    const allTickets = Array.isArray(tickets.data) ? tickets.data : [];

    // Filtrer les tickets en fonction du terme de recherche
    const filteredTickets = allTickets.filter((ticket) => {
        const ticketId = String(ticket.id); // Convertir l'ID en chaîne
        const ticketObjet = ticket.objet.toLowerCase(); // Convertir l'objet en minuscule

        return (
            ticketId.includes(searchTerm.toLowerCase()) ||
            ticketObjet.includes(searchTerm.toLowerCase())
        );
    });

    // Affichage des données des tickets pour le débogage
    useEffect(() => {
        console.log('Tickets data:', tickets.data); // Log les données des tickets
        console.log('Filtered Tickets:', filteredTickets); // Log les tickets filtrés
        console.log('Columns:', columns);      // Log les colonnes définies
    }, [tickets, filteredTickets, columns]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            headTitle='CustomerIndex'
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Historique des tickets</h2>}
        >
            <div className='h-screen'>
                <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                    <Table
                        searchInput={
                            <input
                                type='text'
                                placeholder='Recherche par ID ou par Titre...'
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className='block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            />
                        }
                        columns={columns}
                        data={filteredTickets} // Utilisez uniquement les tickets
                        pagination={pagination}
                        placeholder={<div className="p-4">Aucun ticket trouvé.</div>}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
