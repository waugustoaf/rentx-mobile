import { eachDayOfInterval, format } from 'date-fns';
import { DayProps, MarkedDateProps } from '.';
import { theme } from '../../styles/theme';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface Props {
  start: DayProps;
  end: DayProps;
}

export const generateInterval = ({ start, end }: Props) => {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach(item => {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.shape
            : theme.colors.main,
      },
    };
  });

  return interval;
};
