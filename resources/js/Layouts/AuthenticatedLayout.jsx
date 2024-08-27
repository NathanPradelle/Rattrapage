import Navbar from '@/Components/Navbar';

export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white/100 h-full flex flex-col">

            <Navbar user={user}/>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="flex-1 w-full max-w-2xl px-6 py-10 lg:max-w-7xl mx-auto flex">
                <div className="w-full h-full bg-light flex-col items-center">
                    {children}
                </div>
            </main>

            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Nathan Pradelle
            </footer>
        </div>
    );
}
