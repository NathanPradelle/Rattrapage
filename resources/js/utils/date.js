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

export const toSimpleFormat = (date) => {
  if (!(date instanceof Date)) {
    return date;
  }

  const year = date?.getFullYear();
  const month = (date?.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });
  const day = date?.getDate();

  return date && `${year}-${month}-${day}`;
};
