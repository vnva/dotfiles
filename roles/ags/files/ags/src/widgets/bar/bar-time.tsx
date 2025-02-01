import Variable from 'astal/variable';
import GLib from 'gi://GLib?version=2.0';

import { BarItem } from './bar-item';
import { NERD_ICON } from '../../utils/constants';

interface DateTime {
  date: string;
  time: string;
}

function getFormattedTime(): DateTime {
  const nowLocal = GLib.DateTime.new_now_local();
  const nowLondon = GLib.DateTime.new_now(GLib.TimeZone.new('Europe/London')).format('%H:%M');

  return {
    date: `${NERD_ICON.CALENDAR.L} ${nowLocal.format('%d.%m.%Y')}`,
    time: `${NERD_ICON.TIME.L} ${nowLocal.format('%H:%M')} / ${nowLondon}`,
  };
}

export function Time(): JSX.Element {
  const dateTime = Variable<DateTime>({ date: '', time: '' }).poll(1000, getFormattedTime);

  const date = dateTime().as((t) => t.date);
  const time = dateTime().as((t) => t.time);

  return (
    <>
      <BarItem onDestroy={() => dateTime.drop()}>{date}</BarItem>
      <BarItem onDestroy={() => dateTime.drop()}>{time}</BarItem>
    </>
  );
}
