import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useState } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import Table2 from '@/Components/Table2';
import { PROFILE } from '@/Constants/profiles';
import LayoutSelection from '@/Layouts/LayoutSelection';
import { getCurrentUser, isSubscriptionExipred } from '@/utils/user';

import useColumns from './useColumns';

const ServicesPage = ({ services, pagination }) => {
  const currentUser = getCurrentUser();

  if (
    currentUser?.role !== PROFILE.ADMIN &&
    isSubscriptionExipred(currentUser)
  ) {
    return null;
  }

  const [servicesList, setServicesList] = useState(services);
  const { data, setData } = useForm();

  const columns = useColumns();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(route('services'), data)
        .then((res) => setServicesList(res?.data?.services));
    },
    [setServicesList, data]
  );

  return (
    <LayoutSelection
      headTitle='Services'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('service.list')}
        </h2>
      }
    >
      {currentUser?.role === 2 && (
        <div className='flex justify-end mb-1'>
          <SimpleButton to={route('page.service.creation')}>
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
    </LayoutSelection>
  );
};

export default ServicesPage;
