import { t } from 'i18next';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';
import SimpleList from '@/Components/SimpleList';
import LayoutSelection from '@/Layouts/LayoutSelection';

import useLogic from './useLogic';

const TourCreationPage = () => {
  const { handleSubmit, setData, data, errors, contryList } = useLogic();
  const today = new Date();
  return (
    <LayoutSelection
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

        <SimpleList
          id='country'
          className='flex-col'
          setdata={setData}
          value={data?.country}
          label={t('common.country')}
          options={contryList?.sort((a, b) =>
            a?.value?.localeCompare(b?.value)
          )}
          autocomplete
        />

        <SimpleField
          id='city'
          className='flex-col'
          setdata={setData}
          value={data?.city}
          label={t('common.city')}
          errorMessage={errors?.city}
          required
        />

        <SimpleField
          id='street'
          className='flex-col'
          setdata={setData}
          value={data?.street}
          label={t('common.street')}
          errorMessage={errors?.street}
          required
        />

        <SimpleField
          id='postalCode'
          className='flex-col'
          setdata={setData}
          value={data?.postalCode}
          label={t('common.postalCode')}
          errorMessage={errors?.postalCode}
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
    </LayoutSelection>
  );
};

export default TourCreationPage;
