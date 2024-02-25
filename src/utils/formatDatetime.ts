import moment from 'moment';

export const formatDatetime = (date: string) => {
  return `${moment(date).format('dddd')}, ${moment(date).format('DD/MM/YYYY')}, ${moment(date).format('LT')}`;
};

export const formatDatetimeByMonthYear = (date: string | Date | null) => {
  if (!date) {
    return;
  }
  return moment(date).format('ll');
};

export const formatDatetimePostCreated = (date: string) => {
  return `${moment(date).format('DD/MM/YYYY')}`;
};