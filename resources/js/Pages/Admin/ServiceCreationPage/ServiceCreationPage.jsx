import { t } from 'i18next';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import useLogic from './useLogic';

const ServiceCreationPage = () => {
  const { handleSubmit, setData, data, errors } = useLogic();
  const today = new Date();
  return (
    <AuthenticatedLayout
      headTitle='Tour'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('tours.create')}
        </h2>
      }
    >
      <form onSubmit={handleSubmit} className='flex-col gap-1'>
        <SimpleField
          id='name'
          className='flex-col'
          setdata={setData}
          value={data?.name}
          label={t('common.title')}
          errorMessage={errors?.name}
          required
        />

        <SimpleField
          id='description'
          className='flex-col'
          setdata={setData}
          value={data.description}
          label={t('common.description')}
          errorMessage={errors?.description}
        />

        <div className='flex'>
          <SimpleDate
            id='dateStart'
            className='flex-col'
            setdata={setData}
            value={data?.dateStart}
            label={t('common.dateStart')}
            errorMessage={errors?.dateStart}
            minDate={today}
            required
          />
          <SimpleDate
            id='dateEnd'
            className='flex-col'
            setdata={setData}
            value={data?.dateEnd}
            label={t('common.dateEnd')}
            errorMessage={errors?.dateEnd}
            minDate={data?.dateStart}
            required
          />
        </div>
        <SimpleButton className='self-center' type='submit'>
          {t('common.validate')}
        </SimpleButton>
      </form>
    </AuthenticatedLayout>
  );
};

export default ServiceCreationPage;
