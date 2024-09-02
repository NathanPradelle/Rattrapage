export const dateDiffInMillis = (dateA, dateB) => {
  const dateAInMillis = dateA.getTime();
  const dateBInMillis = dateB.getTime();

  return Math.abs(dateBInMillis - dateAInMillis);
};

export const dateDiffInDays = (dateA, dateB) => {
  const diffInMillis = dateDiffInMillis(dateA, dateB);
  const differenceInDays = diffInMillis / (1000 * 60 * 60 * 24);

  return differenceInDays;
};

export const firstDayOfWeek = (date) => {
  if (!(date instanceof Date)) {
    return null;
  }

  const firstDay = date;
  while (firstDay.getDay() != 1) {
    firstDay.setDate(firstDay.getDate() - 1);
  }
  return firstDay.getDate();
};

export const toSimpleFormat = (date, type) => {
  if (!(date instanceof Date)) {
    return date;
  }

  const year = date?.getUTCFullYear().toLocaleString('en-US', {
    minimumIntegerDigits: 4,
  });
  const month = (date?.getUTCMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });
  const day = date?.getUTCDate().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });
  const hours = date?.getUTCHours().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });
  const minutes = date?.getUTCMinutes().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });

  const formatDate = `${year}-${month}-${day}`;
  const formatHours = `${hours}:${minutes}`;

  if (type === 'time') {
    return formatHours;
  }

  if (type === 'date') {
    return formatDate;
  }

  return date && `${formatDate}T${formatHours}`;
};
