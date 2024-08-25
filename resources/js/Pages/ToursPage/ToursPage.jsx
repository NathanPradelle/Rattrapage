import './ToursPage.less';

import { t } from 'i18next';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import SimpleList from '@/Components/SimpleList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import EventHeight from './EventHeight';
import useLogic from './useLogic';

const ToursPage = ({ tours }) => {
  const {
    setData,
    previousWeek,
    nextWeek,
    data,
    contryList,
    filteredTours,
    cellHours,
    cellDays,
  } = useLogic(tours);

  return (
    <AuthenticatedLayout
      headTitle='Tours'
      className='calendar'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('tours.label')}
        </h2>
      }
    >
      <div className='flex justify-end'>
        <SimpleButton to={route('page.tour.creation')}>
          {t('tours.toCreate')}
        </SimpleButton>
      </div>

      <div className='flex-center'>
        <SimpleList
          id='country'
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
          setdata={setData}
          value={data?.city}
          label={t('common.city')}
          required
        />
      </div>
      <div className='flex-center-between'>
        <SimpleButton onClick={previousWeek}>{'<'}</SimpleButton>
        <div className='flex-center gap-2'>
          <SimpleField
            id='year'
            type='number'
            setdata={setData}
            value={data.year}
            label={t('date.year')}
            min={0}
            max={9999}
          />
          <SimpleField
            id='month'
            type='number'
            setdata={setData}
            value={data.month}
            label={t('date.month.label')}
            min={1}
            max={12}
          />
        </div>
        <SimpleButton onClick={nextWeek}>{'>'}</SimpleButton>
      </div>
      <div className='p-4 sm:p-8 bg-black shadow sm:rounded-lg'>
        <div className='wrapper'>
          <div />
          {cellDays.map((day, index) => (
            <div key={index} className='day-cell'>
              {day}
            </div>
          ))}
          {cellHours.map((hour, index) => (
            <div key={index} className='hour-cell'>
              {hour}
            </div>
          ))}
          {filteredTours?.map((tour, index) => (
            <EventHeight data={data} event={tour} key={index} />
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ToursPage;
