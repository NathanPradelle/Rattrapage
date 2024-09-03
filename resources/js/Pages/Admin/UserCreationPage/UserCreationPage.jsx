import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import AdminLayout from '@/Layouts/AdminLayout';
import { getProfileLabel } from '@/utils/user';

const UserPage = ({ user, profile }) => {
  const { data, setData, errors } = useForm(user);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      axios
        .post(route('user.create', profile), data)
        ?.then(() => route('admin'));
    },
    [data]
  );

  return (
    <AdminLayout
      headTitle='User'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('user.create')}: {getProfileLabel(profile)}
        </h2>
      }
    >
      <form className='flex-col gap-1 my-6' onSubmit={onSubmit}>
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

        <SimpleField
          id='password'
          type='password'
          setdata={setData}
          value={data.password}
          label={t('common.password')}
          errorMessage={errors.password}
          required
        />
        <div className='flex'>
          <SimpleButton type='submit'>{t('common.create')}</SimpleButton>
        </div>
      </form>
    </AdminLayout>
  );
};

export default UserPage;
