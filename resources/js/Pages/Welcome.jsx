import { Head, Link } from '@inertiajs/react';

import Navbar from '@/Components/Navbar';

const Welcome = ({ auth }) => {
  const handleImageError = () => {
    document.getElementById('screenshot-container')?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document.getElementById('docs-card-content')?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
  };

  return (
    <>
      <Head title='Welcome' />
      <div className='bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white/100 min-h-screen flex flex-col'>
        <Navbar user={auth.user} />

        <main className='flex-1 w-full max-w-2xl px-6 lg:max-w-7xl mx-auto flex'>
          <div className='w-full h-full bg-light flex items-center'></div>
        </main>
        <footer className='w-full py-16 text-center text-sm text-black dark:text-white/70'>
          Ahmad Maxime Nathan
        </footer>
      </div>
    </>
  );
};

export default Welcome;
