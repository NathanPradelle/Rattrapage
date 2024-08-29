import './Chat.less';

import { useForm } from '@inertiajs/react';
import axios from 'axios';
import clsx from 'clsx';
import { t } from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getCurrentUser } from '@/utils/user';

const ChatPage = ({ interlocutor }) => {
  const currentUser = getCurrentUser();
  const { data, setData } = useForm();
  const [messages, setMessages] = useState([]);

  const getMessage = useCallback(() => {
    axios.get(route('chat.messages', interlocutor)).then((res) => {
      setMessages(res?.data);
    });
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      data.userSecond = interlocutor?.id;

      axios.post(route('chat.messages.create'), data);
    },
    [data]
  );

  useEffect(() => {
    getMessage();
    setInterval(getMessage, 5000);
  }, []);

  return (
    <AuthenticatedLayout
      headTitle='Chat'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('chat.label')} : {t('chat.with', { name: interlocutor?.name })}
        </h2>
      }
      className='chat'
    >
      <div className='messages-list'>
        {messages?.map((message, index) => {
          const isCurrentUserMessage =
            currentUser?.id === message?.userFirst?.id;
          const speaker = isCurrentUserMessage
            ? message?.userFirst
            : message?.userSecond;
          return (
            <div
              className={clsx(
                'p-1 w-fit rounded-lg bg-grey',
                isCurrentUserMessage && 'my-message'
              )}
              key={index}
            >
              <strong>{speaker?.name}:</strong> {message.message}
            </div>
          );
        })}
      </div>
      <div className='flex'>
        <SimpleField
          id='message'
          setdata={setData}
          value={data?.message}
          placeholder='Type your message'
          className='message-input'
        />
        <SimpleButton onClick={handleSubmit}>{t('common.send')}</SimpleButton>
      </div>
    </AuthenticatedLayout>
  );
};

export default ChatPage;
