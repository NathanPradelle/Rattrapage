import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import { useCallback } from 'react';

const useLogic = () => {
  const { data, setData, errors } = useForm();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      Inertia.post(route('service.create'), data);
    },
    [data]
  );

  return { handleSubmit, setData, data, errors };
};

export default useLogic;
