import './Chat.less';

import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';

import ChatDisplay from '@/Features/ChatDisplay';
import LayoutSelection from '@/Layouts/LayoutSelection';

const ChatPage = ({ interlocutor }) => {
  const { data, setData } = useForm();
  const [messages, setMessages] = useState([]);

  const getMessage = useCallback(() => {
    axios.get(route('chat.messages', interlocutor)).then((res) => {
      setMessages(res?.data);
    });
  }, [interlocutor]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      data.userSecond = interlocutor?.id;

      axios.post(route('chat.messages.create'), data);
    },
    [data, interlocutor]
  );

  return (
    <LayoutSelection
      headTitle='Chat'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {t('chat.label')} : {t('chat.with', { name: interlocutor?.name })}
        </h2>
      }
      className='chat'
    >
      <ChatDisplay
        id='message'
        setData={setData}
        getMessage={getMessage}
        handleSubmit={handleSubmit}
        data={data}
        messages={messages}
      />
    </LayoutSelection>
  );
};

export default ChatPage;
