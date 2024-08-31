import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';

import SimpleField from '@/Components/SimpleField';
import ChatDisplay from '@/Features/ChatDisplay';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ServicePage = ({ service }) => {
  const { data, setData } = useForm({ service: service?.id });
  const [messages, setMessages] = useState([]);

  const getMessage = useCallback(() => {
    axios.get(route('service.messages', service?.id)).then((res) => {
      setMessages(res?.data);
    });
  }, [service]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      axios.post(route('service.messages.create'), data);
    },
    [data]
  );

  return (
    <AuthenticatedLayout
      head='Welcome'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('service.details')}: {service?.name}
        </h2>
      }
    >
      <div className='bg-black p-1 flex-col gap-4 shadow-sm sm:rounded-lg'>
        <div>
          <h3>{t('common.description')}</h3>
          {service?.description || 'Aucune description'}
        </div>
        {service?.dateStart && service?.dateEnd && (
          <div className='flex-col gap-1'>
            <h3>{t('service.plans')}</h3>
            <SimpleField
              id='dateStart'
              value={service?.dateStart}
              label={t('common.dateStart')}
              disabled
            />
            <SimpleField
              id='dateEnd'
              value={service?.dateEnd}
              label={t('common.dateEnd')}
              disabled
            />
          </div>
        )}

        <div className='chat'>
          <h3>{t('common.chat')}</h3>
          <ChatDisplay
            id='message'
            setData={setData}
            getMessage={getMessage}
            handleSubmit={handleSubmit}
            data={data}
            messages={messages}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ServicePage;
