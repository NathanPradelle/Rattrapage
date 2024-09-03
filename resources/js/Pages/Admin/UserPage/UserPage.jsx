import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import LazyPagination from '@/Components/LazyPagination';
import SimpleField from '@/Components/SimpleField';
import SimpleList from '@/Components/SimpleList';
import AdminLayout from '@/Layouts/AdminLayout';

const UserPage = ({ user }) => {
  const { data, setData, errors } = useForm({
    ...user,
    ...user?.benevole,
  });

  const [servicesP, setServicesP] = useState([]);

  const getServices = useCallback((page) => {
    axios
      .post(route('services', page))
      .then((res) => setServicesP(res.data))
      .catch((err) => {
        console.error('Error fetching profiles:', err);
      });
  }, []);

  useEffect(() => {
    getServices();
  }, [getServices]);

  const servicesOptions = useMemo(
    () =>
      servicesP?.services?.map((service) => {
        return {
          value: service?.id,
          label: service?.name,
        };
      }),
    [servicesP]
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      axios
        .post(route('volunteer.update', user?.id), data)
        ?.then(() => route('admin'));
    },
    [data]
  );
  return (
    <AdminLayout
      headTitle='User'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('common.user')}: {user?.name}
        </h2>
      }
    >
      <form className='flex-col gap-1 my-6' onSubmit={onSubmit}>
        {user?.benevole && (
          <div className='flex'>
            <SimpleButton type='submit'>{t('common.save')}</SimpleButton>
          </div>
        )}
        <SimpleField
          id='name'
          setdata={setData}
          value={data.name}
          label={t('common.name')}
          errorMessage={errors.name}
          required
        />

        <SimpleField
          id='email'
          type='email'
          setdata={setData}
          value={data.email}
          label={t('common.email')}
          errorMessage={errors.email}
          required
        />

        {user?.benevole && (
          <>
            <SimpleField
              id='phone'
              type='tel'
              setdata={setData}
              value={data.phone || user?.benevole?.phone}
              label={t('common.phone')}
              errorMessage={errors.phone}
              required
            />

            <SimpleField
              id='age'
              type='number'
              setdata={setData}
              value={data.age || user?.benevole?.age}
              label={t('common.age')}
              errorMessage={errors.age}
              required
            />

            <SimpleField
              id='nationalite'
              setdata={setData}
              value={data.nationalite || user?.benevole?.nationalite}
              label={t('common.nationality')}
              errorMessage={errors.nationalite}
              required
            />

            <SimpleList
              id='service_id'
              setdata={setData}
              value={data.service_id || user?.benevole?.service_id}
              label={t('service.list')}
              options={servicesOptions}
            />
            <LazyPagination
              onChangePage={getServices}
              pagination={servicesP?.pagination}
            />
          </>
        )}
      </form>
    </AdminLayout>
  );
};

export default UserPage;
