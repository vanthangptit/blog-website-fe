import moment from 'moment';

export const formatDatetime = (date: string) => {
  return `${moment(date).format('dddd')}, ${moment(date).format('DD/MM/YYYY')}, ${moment(date).format('LT')}`;
};

export const formatDatetimeByMonthYear = (date: string) => {
  return `${moment(date).format('MMM YY')}`;
};
