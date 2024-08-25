import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { firstDayOfWeek } from '@/utils/date';

const useLogic = (tours) => {
  const today = new Date();

  const { data, setData } = useForm({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: firstDayOfWeek(today),
  });
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

  const filteredTours = useMemo(
    () =>
      tours?.filter(
        (tour) =>
          tour?.country?.includes(data?.country) &&
          tour?.city?.includes(data?.city)
      ),
    [data.country, data.city]
  );

  useEffect(() => {
    const newDate = new Date(data.year, data.month - 1, data.day);
    setData('day', firstDayOfWeek(newDate));
  }, [data.year, data.month]);

  const cellHours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const cellDays = useMemo(() => {
    const year = data.year;
    const month = data.month - 1;
    const day = data.day;

    const displayedWeek = new Date(year, month, day);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(displayedWeek);
      currentDate.setDate(currentDate.getDate() + i);
      const dayName = `${t(`date.day.${i}`)} ${currentDate.getDate()}`;
      days.push(dayName);
    }

    return days;
  }, [data]);

  const previousWeek = useCallback(() => {
    const newDate = new Date(data.year, data.month - 1, data.day);
    newDate.setDate(newDate.getDate() - 7);

    setData({
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
    });
  }, [data, setData]);

  const nextWeek = useCallback(() => {
    const newDate = new Date(data.year, data.month - 1, data.day);
    newDate.setDate(newDate.getDate() + 7);

    setData({
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
    });
  }, [data, setData]);

  return {
    setData,
    previousWeek,
    nextWeek,
    data,
    contryList,
    filteredTours,
    cellHours,
    cellDays,
  };
};

export default useLogic;
