import { Link } from '@inertiajs/react';
import React from 'react';

import Dropdown from '@/Components/Dropdown';
import LanguageSelector from '@/translation/LanguageSelector';
import { getCurrentUser, isSubscriptionExipred } from '@/utils/user';

const Navbar = () => {
  const user = getCurrentUser();
  console.log(user);
  return (
    <nav className='flex w-full justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800'>
      {/* Conteneur pour les liens alignés à gauche */}
      <div className='flex space-x-4'>
        <Link
          href={route('welcome')}
          className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
        >
          Accueil
        </Link>

        {user?.role === 0 && (
          <>
            <Link
              href={route('benevolat')}
              className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
            >
              Devenir bénévole !
            </Link>
            <Link
              href={route('harvest-requests.create')}
              className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
            >
              Demande de récolte
            </Link>
          </>
        )}

        {user?.role === 1 && (
          <>
            <Link
              href={route('stock.index')}
              className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
            >
              Stocks
            </Link>

            <Link
              href={route('benevole.schedule')}
              className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
            >
              Mon planning
            </Link>

            <Link
              href={route('volunteer.assigned-tours')}
              className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
            >
              Récap
            </Link>
          </>
        )}

        <Link
          href={route('contact.show')}
          className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
        >
          Nous Contacter !
        </Link>

        <Link
          href={route('abonnement')}
          className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
        >
          Abonnement
        </Link>

        {!isSubscriptionExipred(user) && (
          <Link
            href={route('page.services')}
            className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
          >
            Services
          </Link>
        )}
      </div>

      {/* Conteneur pour le dropdown aligné à droite */}
      <div className='flex items-center'>
        <LanguageSelector />

        {user ? (
          <Dropdown>
            <Dropdown.Trigger>
              <span className='inline-flex rounded-md'>
                <button
                  type='button'
                  className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150'
                >
                  {user.name}

                  <svg
                    className='ms-2 -me-0.5 h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Link href={route('profile.edit')}>
                Profile
              </Dropdown.Link>
              <Dropdown.Link href={route('page.chats')}>Messages</Dropdown.Link>
              <Dropdown.Link href={route('logout')} method='post' as='button'>
                Log Out
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
        ) : (
          <>
            <Link
              href={route('login')}
              className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
            >
              Log in
            </Link>
            <Link
              href={route('register')}
              className='rounded-md px-3 py-2 self-center ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white'
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
