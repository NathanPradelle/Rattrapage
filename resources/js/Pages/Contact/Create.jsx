import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

const TicketCreationPage = ({ auth }) => {
    const [category, setCategory] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(
            route('ticket.store'),
            {
                category,
                subject,
                description,
            },
            {
                onError: (errors) => {
                    setErrors(errors);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Créer un ticket</h2>}>
            <Head title='TicketCreate'/>
            <div className='flex flex-col items-center justify-center h-screen'>
                <form
                    onSubmit={handleSubmit}
                    className='w-full max-w-lg bg-white p-8 border border-gray-300 rounded-lg shadow-md'
                >
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='category'
                        >
                            Catégorie
                        </label>
                        <select
                            id='category'
                            name='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'
                        >
                            <option value=''>Sélectionnez une catégorie</option>
                            <option value='1'>Réservation</option>
                            <option value='2'>Prestation</option>
                            <option value='3'>Bug</option>
                            <option value='4'>Autre</option>
                        </select>
                        {errors.category && (
                            <div className='text-red-500 text-xs mt-1'>{errors.category}</div>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='subject'
                        >
                            Objet
                        </label>
                        <input
                            type='text'
                            id='subject'
                            name='subject'
                            placeholder='Objet'
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        {errors.subject && (
                            <div className='text-red-500 text-xs mt-1'>{errors.subject}</div>
                        )}
                    </div>

                    <div className='mb-6'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='description'
                        >
                            Description
                        </label>
                        <textarea
                            id='description'
                            name='description'
                            rows='6'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        {errors.description && (
                            <div className='text-red-500 text-xs mt-1'>
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div className='flex items-center justify-between'>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Envoyer le ticket
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default TicketCreationPage;
