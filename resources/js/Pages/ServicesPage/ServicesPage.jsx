import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useState } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import Table2 from '@/Components/Table2';
import { PROFILE } from '@/Constants/profiles';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getCurrentUser } from '@/utils/user';

import useColumns from './useColumns';

const ServicesPage = ({ services, pagination }) => {
  const user = getCurrentUser();

  const [servicesList, setUserList] = useState(services);
  const { data, setData } = useForm();

  const columns = useColumns();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(route('users', PROFILE.ADMIN), data)
        .then((res) => setUserList(res?.data?.users));
    },
    [setUserList, data]
  );

  return (
    <AuthenticatedLayout
      headTitle='Services'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('service.list')}
        </h2>
      }
    >
      {user?.role === 2 && (
        <div className='flex justify-end mb-1'>
          <SimpleButton to={route('page.tour.creation')}>
            {t('service.create')}
          </SimpleButton>
        </div>
      )}
      <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
        <Table2
          seachInput={
            <div className='flex'>
              <SimpleField
                id='params'
                className='flex-1'
                setdata={setData}
                value={data?.params}
                placeholder={t('user.search')}
              />
              <SimpleButton onClick={handleSubmit}>
                {t('common.send')}
              </SimpleButton>
            </div>
          }
          columns={columns}
          data={servicesList}
          pagination={pagination}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default ServicesPage;
