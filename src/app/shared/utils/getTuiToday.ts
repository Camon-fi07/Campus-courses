import { TuiDay } from '@taiga-ui/cdk';

export const getTuiToday = () => {
  const dateNow = new Date();

  return new TuiDay(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
};
