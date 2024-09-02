import { t } from 'i18next';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';
import { PROFILE } from '@/Constants/profiles';
import ChatDisplay from '@/Features/ChatDisplay';
import LayoutSelection from '@/Layouts/LayoutSelection';
import { getCurrentUser, isSubscriptionExipred } from '@/utils/user';

import useLogic from './useLogic';

const ServicePage = ({ service }) => {
  const currentUser = getCurrentUser();

  if (
    currentUser?.role === PROFILE.ADMIN ||
    isSubscriptionExipred(currentUser)
  ) {
    return null;
  }

  const today = new Date();
  const {
    submitMessage,
    submitChanges,
    getMessage,
    setData,
    onReset,
    data,
    messages,
    disabled,
  } = useLogic({ service });
  return (
    <LayoutSelection
      head='Welcome'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('service.details')}: {service?.name}
        </h2>
      }
    >
      {currentUser?.role === 2 && (
        <div className='flex justify-center gap-2 mb-1'>
          <SimpleButton onClick={onReset}>
            {disabled ? t('common.modify') : t('common.back')}
          </SimpleButton>
          <SimpleButton
            type='submit'
            onClick={submitChanges}
            disabled={disabled}
          >
            {t('common.save')}
          </SimpleButton>
        </div>
      )}
      <div className='bg-black p-1 flex-col gap-4 shadow-sm sm:rounded-lg'>
        <div>
          <h3>{t('common.description')}</h3>
          {disabled ? (
            service?.description || 'Aucune description'
          ) : (
            <SimpleField
              id='description'
              className='flex-col'
              setdata={setData}
              value={data.description}
            />
          )}
        </div>
        {service?.dateStart && service?.dateEnd && (
          <div className='flex-col gap-1'>
            <h3>{t('service.plans')}</h3>
            <SimpleDate
              id='dateStart'
              setdata={setData}
              value={data?.dateStart}
              label={t('common.dateStart')}
              disabled={disabled}
              minDate={today}
            />
            <SimpleDate
              id='dateEnd'
              setdata={setData}
              value={data?.dateEnd}
              label={t('common.dateEnd')}
              disabled={disabled}
              minDate={data?.dateStart}
            />
          </div>
        )}

        <div className='chat'>
          <h3>{t('common.chat')}</h3>
          <ChatDisplay
            id='message'
            setData={setData}
            getMessage={getMessage}
            handleSubmit={submitMessage}
            data={data}
            messages={messages}
          />
        </div>
      </div>
    </LayoutSelection>
  );
};

export default ServicePage;
