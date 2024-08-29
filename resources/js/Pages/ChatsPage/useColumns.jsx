import { Link } from '@inertiajs/react';
import { t } from 'i18next';
import { useMemo } from 'react';

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
        renderCell: (row) => (
          <Link href={route('page.chat', row?.id)}>Chat</Link>
        ),
      },
    ],
    []
  );

  return columns;
};

export default useColumns;
