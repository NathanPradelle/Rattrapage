import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useLogic = () => {
  const { data, setData, errors } = useForm();
  const [contryList, setCountryList] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=name').then((res) => {
      setCountryList(
        res?.data?.map((e) => {
          return {
            value: e?.name?.common,
            label: e?.name?.common,
          };
        })
      );
    });
  }, [setCountryList]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      Inertia.post(route('tour.create'), data);
    },
    [data]
  );

  return { handleSubmit, setData, data, errors, contryList };
};

export default useLogic;
