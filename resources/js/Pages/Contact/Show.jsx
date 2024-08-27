import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const TicketShow = ({ ticket, auth }) => {
    const [note, setNote] = useState('');
    console.log(ticket);
    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('ticket.update', { id: ticket.id }), { note: note, user_id: ticket.user.id},{
            onSuccess: () => setNote(''), // Clear the note input on success
            onError: (errors) => console.error("There was an error updating the ticket!", errors)
        });
    };

    const isStatusValid = ["new", "In process"].includes(ticket.status);

    return (
        <AuthenticatedLayout
            user={auth.user}
            headTitle='CustomerIndex'
            header={
                <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
                    Détail du ticket {ticket.id}
                </h2>
            }
        >
            <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-800'>
                <div className='mb-4'>
                    <strong>ID:</strong> {ticket.id}
                </div>
                <div className='mb-4'>
                    <strong>Category:</strong> {ticket.ticket_category.name}
                </div>
                <div className='mb-4'>
                    <strong>Objet:</strong> {ticket.objet}
                </div>
                <div className='mb-4'>
                    <strong>Description:</strong> {ticket.description}
                </div>
                <div className='mb-4'>
                    <strong>Status:</strong> {ticket.status}
                </div>
                <div className='mb-4'>
                    <strong>Notes:</strong>
                    <ul>
                        {ticket.ticket_notes.map((noteObj) => (
                            <li key={noteObj.id}>
                                {noteObj.note} [{noteObj.user.name} {new Date(noteObj.created_at).toLocaleString()}]
                            </li>
                        ))}
                    </ul>
                </div>
                {isStatusValid && (
                    <form onSubmit={handleNoteSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='note' className='block text-sm font-medium text-gray-700'>
                                Add Note
                            </label>
                            <input
                                type='text'
                                id='note'
                                name='note'
                                value={note}
                                onChange={handleNoteChange}
                                className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                        </div>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Submit Note
                        </button>
                    </form>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default TicketShow;
