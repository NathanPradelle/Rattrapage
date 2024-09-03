import { Link } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import BanUserForm from '@/Features/Users/ModalBan';
import BanUserList from '@/Features/Users/ModalBanList';

const useColumns = () => {
  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        valueGetter: (row) => row?.id,
        renderCell: (row) => row?.id,
      },
      {
        field: 'name',
        headerName: t('common.name'),
        valueGetter: (row) => row?.name,
        renderCell: (row) => row?.name,
      },
      {
        field: 'email',
        headerName: t('common.email'),
        valueGetter: (row) => row?.email,
        renderCell: (row) => row?.email,
      },
      {
        renderCell: (row) => (
          <Link href={route('page.user', row?.id)}>{t('common.details')}</Link>
        ),
      },
      {
        renderCell: (row) => (
          <BanUserForm userId={row?.id} className='max-w-xl' />
        ),
      },
      {
        renderCell: (row) => <BanUserList userId={row?.id} />,
      },
      {
        renderCell: (row) => (
          <SimpleButton
            className='text-red-600 hover:text-red-900'
            onClick={() => axios.post(route('user.exclude', row?.id))}
          >
            RGPD
          </SimpleButton>
        ),
      },
    ],
    []
  );

  return columns;
};

export default useColumns;
