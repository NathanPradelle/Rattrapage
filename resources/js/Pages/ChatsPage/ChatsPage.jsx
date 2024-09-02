import { t } from 'i18next';
import { useState } from 'react';

import Table from '@/Components/Table';
import LayoutSelection from '@/Layouts/LayoutSelection';

import useColumns from './useColumns';

const ChatsPage = ({ users, pagination }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const columns = useColumns();
  // Fonction pour filtrer les utilisateurs par nom ou par e-mail
  const filteredUsers = users?.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // Gestionnaire de changement pour la recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <LayoutSelection
      headTitle='Chats'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('chat.list')}
        </h2>
      }
    >
      <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
        <Table
          seachInput={
            <input
              type='text'
              placeholder={t('user.search')}
              value={searchTerm}
              onChange={handleSearchChange}
              className='block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          }
          columns={columns}
          data={filteredUsers}
          pagination={pagination}
        />
      </div>
    </LayoutSelection>
  );
};

export default ChatsPage;
