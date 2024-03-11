import { TuiDay } from '@taiga-ui/cdk';

export const convertTuiDate = (date: TuiDay) => {
  return new Date(date.year, date.month, date.day).toISOString();
};

export const convertDateToTui = (date: Date) => {
  return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
};
