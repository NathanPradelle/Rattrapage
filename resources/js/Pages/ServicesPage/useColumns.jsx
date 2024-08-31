import { Link } from '@inertiajs/react';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';

const useColumns = () => {
  const today = new Date();

  const serviceStatus = useCallback(
    (service) => {
      const startDate = service?.dateStart && new Date(service?.dateStart);
      const endDate = service?.dateEnd && new Date(service?.dateEnd);

      if (today < startDate) {
        return 'A Venir';
      }

      if (today < endDate) {
        return 'En cours';
      }

      return 'A Planifier';
    },
    [today]
  );

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('service.name'),
        valueGetter: (row) => row?.name,
        renderCell: (row) => row?.name,
      },
      {
        field: 'status',
        headerName: t('common.status'),
        valueGetter: (row) => row?.email,
        renderCell: (row) => serviceStatus(row),
      },
      {
        renderCell: (row) => (
          <Link href={route('page.service', row?.id)}>
            {t('common.details')}
          </Link>
        ),
      },
    ],
    [serviceStatus]
  );

  return columns;
};

export default useColumns;
