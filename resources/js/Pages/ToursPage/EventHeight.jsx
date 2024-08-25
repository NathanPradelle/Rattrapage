import { useMemo } from 'react';

import { dateDiffInDays } from '@/utils/date';

const EventHeight = ({ data, event }) => {
  const displayedWeek = new Date(data.year, data.month - 1, data.day);
  const startDate = new Date(event?.dateStart);
  const endDate = new Date(event?.dateEnd);

  const dayOfWeek = startDate.getDay() === 0 ? 7 : startDate.getDay();
  // const startHour = startDate.getHours();
  const endHour = endDate.getHours();

  const cols = [];

  const isStartDateInWeek =
    startDate.getFullYear() === displayedWeek.getFullYear() &&
    startDate.getMonth() === displayedWeek.getMonth() &&
    startDate.getDate() >= displayedWeek.getDate() &&
    startDate.getDate() < displayedWeek.getDate() + 7;

  const isEndDateInWeek =
    endDate.getFullYear() === displayedWeek.getFullYear() &&
    endDate.getMonth() === displayedWeek.getMonth() &&
    endDate.getDate() >= displayedWeek.getDate() &&
    endDate.getDate() < displayedWeek.getDate() + 7;

  const dateDiffInWeek = useMemo(() => {
    if (isStartDateInWeek && isEndDateInWeek) {
      return dateDiffInDays(startDate, endDate);
    }

    const week = new Date(displayedWeek);
    if (isStartDateInWeek) {
      week.setDate(week.getDate() + 6); // diff with the end of the week
      return dateDiffInDays(week, startDate);
    }
    if (isEndDateInWeek) {
      return dateDiffInDays(week, endDate);
    }
    return 0;
  }, [isStartDateInWeek, isEndDateInWeek, startDate, endDate, displayedWeek]);

  if (isStartDateInWeek || isEndDateInWeek) {
    for (let i = 0; dateDiffInWeek >= i; i++) {
      const gridColumnStart = isStartDateInWeek ? dayOfWeek + i + 1 : i + 2;
      let gridRowStart = 2;
      let gridRowEnd = 26;

      if (i === dateDiffInWeek) {
        gridRowEnd = isEndDateInWeek ? endHour + 2 : gridRowEnd;
      }

      cols.push({ gridColumnStart, gridRowStart, gridRowEnd });
    }
  }

  return cols.map((col, index) => (
    <div
      key={index}
      className='flex-center text-center event'
      style={{
        gridColumnStart: col?.gridColumnStart,
        gridRowStart: col?.gridRowStart,
        gridRowEnd: col?.gridRowEnd,
      }}
    >
      {event?.name}
    </div>
  ));
};

export default EventHeight;
