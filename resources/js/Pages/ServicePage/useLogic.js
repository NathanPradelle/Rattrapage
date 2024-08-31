import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useCallback, useState } from 'react';

const useLogic = ({ service }) => {
  const { data, setData, reset } = useForm(service);
  const [messages, setMessages] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const getMessage = useCallback(() => {
    axios.get(route('service.messages', service?.id)).then((res) => {
      setMessages(res?.data);
    });
  }, [service]);

  const submitMessage = useCallback(
    (e) => {
      e.preventDefault();

      axios.post(route('service.messages.create'), data?.id);
    },
    [data]
  );

  const submitChanges = useCallback(
    (e) => {
      e.preventDefault();
      Inertia.post(route('service.update'), data);
    },
    [data]
  );

  const onReset = useCallback(() => {
    setDisabled(!disabled);
    reset();
  }, [disabled]);

  return {
    submitMessage,
    submitChanges,
    getMessage,
    setData,
    onReset,
    data,
    messages,
    disabled,
  };
};

export default useLogic;
