import { TuiDay } from '@taiga-ui/cdk';

export const convertTuiDate = (date: TuiDay) => {
  return date.toUtcNativeDate().toISOString();
};

export const convertDateToTui = (date: Date) => {
  return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
};
