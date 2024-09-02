import { t } from 'i18next';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';
import LayoutSelection from '@/Layouts/LayoutSelection';

import useLogic from './useLogic';

const ServiceCreationPage = () => {
  const { handleSubmit, setData, data, errors } = useLogic();
  const today = new Date();

  return (
    <LayoutSelection
      headTitle='Service'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('service.create')}
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

        <div className='flex gap-2'>
          <SimpleDate
            id='date'
            type='date'
            setdata={setData}
            value={data?.date}
            label={t('common.date')}
            errorMessage={errors?.date}
            minDate={today}
            required
          />
          <SimpleDate
            id='timeStart'
            type='time'
            setdata={setData}
            value={data?.timeStart}
            label={t('common.timeStart')}
            errorMessage={errors?.timeStart}
            required
          />
          <SimpleDate
            id='timeEnd'
            type='time'
            setdata={setData}
            value={data?.timeEnd}
            label={t('common.timeEnd')}
            errorMessage={errors?.timeEnd}
            minDate={data?.timeStart}
            required
          />
        </div>
        <SimpleButton className='self-center' type='submit'>
          {t('common.validate')}
        </SimpleButton>
      </form>
    </LayoutSelection>
  );
};

export default ServiceCreationPage;
