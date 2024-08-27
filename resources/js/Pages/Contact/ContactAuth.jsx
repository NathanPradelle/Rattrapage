import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';

export default function ContactAuth({ user }) {
    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contact</h2>}
        >
            <Head title='Contact' />
            <div className='flex h-screen items-center justify-center p-8'>
                <div className='flex flex-col w-1/2 space-y-4'>
                    <div className='border border-gray-300 p-6 text-xl font-bold'>
                        Nous Contacter
                    </div>
                    <div className='border border-gray-300 p-4'>
                        Nathan (chef de projet réseau)
                        <br />
                        - nathan@GPCS.reseau
                        <br />- 02 02 02 02 02
                    </div>
                    <div className='border border-gray-300 p-4'>
                        Ahmad (développeur)
                        <br />
                        - ahmad@GPCS.dev
                        <br />- 04 04 04 04 04
                    </div>
                </div>
                <div className='border-l border-gray-300 h-full mx-4'></div>
                <div className='flex-col gap-2 items-center justify-center w-1/2'>
                    <Link href={route('ticket.create')}>
                        Envoyer un ticket à GPCS
                    </Link>
                    {user && (
                    <Link href={route('tickets.index', user.id)}>
                        Voir ses tickets
                    </Link>
                        )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
