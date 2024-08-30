import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useState } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import Table2 from '@/Components/Table2';
import { PROFILE } from '@/Constants/profiles';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import useColumns from './useColumns';

const VolunteersPage = ({ users, pagination }) => {
  const [userList, setUserList] = useState(users);
  const { data, setData } = useForm();

  const columns = useColumns();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(route('users', PROFILE.VOLUNTEER), data)
        .then((res) => setUserList(res?.data?.users));
    },
    [setUserList, data]
  );

  return (
    <AuthenticatedLayout
      headTitle='Customers'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('customer.list')}
        </h2>
      }
    >
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
          data={userList}
          pagination={pagination}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default VolunteersPage;
