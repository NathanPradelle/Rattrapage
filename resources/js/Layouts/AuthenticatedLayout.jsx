import { Head } from '@inertiajs/react';
import clsx from 'clsx';

import NavBar from '@/Components/NavBar';

import ApiLayout from './ApiLayout';

const AuthenticatedLayout = ({ headTitle, header, className, children }) => {
  ApiLayout();
  return (
    <div className='bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white/100 h-full flex flex-col'>
      <Head title={headTitle} />
      <nav className='bg-white border-b border-gray-100'>
        <NavBar />
      </nav>

      {header && (
        <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
            {header}
          </div>
        </header>
      )}

      <main id='content' className={clsx('py-6', className)}>
        {children}
      </main>

      <footer className='w-full py-16 text-center text-sm text-black dark:text-white/70'>
        Nathan Pradelle
      </footer>
    </div>
  );
};

export default AuthenticatedLayout;
