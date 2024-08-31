import './ChatDisplay.less';

import clsx from 'clsx';
import { t } from 'i18next';
import React, { useEffect } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import { getCurrentUser } from '@/utils/user';

const ChatDisplay = ({
  id,
  setData,
  getMessage,
  handleSubmit,
  data,
  messages = [],
}) => {
  const currentUser = getCurrentUser();

  useEffect(() => {
    getMessage();
    const messageInterval = setInterval(getMessage, 5000);

    return () => {
      clearInterval(messageInterval);
    };
  }, [getMessage]);

  return (
    <>
      <div className='messages-list'>
        {messages?.map((message, index) => {
          const isCurrentUserMessage =
            currentUser?.id === message?.userFirst?.id ||
            currentUser?.id === message?.user?.id;

          let speaker;
          if (message?.user) {
            speaker = message?.user;
          } else {
            speaker = isCurrentUserMessage
              ? message?.userFirst
              : message?.userSecond;
          }

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
          id={id}
          setdata={setData}
          value={data?.message}
          placeholder='Type your message'
          className='message-input'
        />
        <SimpleButton onClick={handleSubmit}>{t('common.send')}</SimpleButton>
      </div>
    </>
  );
};

export default ChatDisplay;
