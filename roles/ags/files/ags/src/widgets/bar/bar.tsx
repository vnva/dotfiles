import { Astal, Gtk } from 'astal/gtk3';

import { SPACING } from '../../utils/constants';

import css from './bar.module.scss';
import { BarItem } from './bar-item';
import { Time } from './bar-time';
import { Battery } from './bar-battery';
import { BarWorkspaces } from './bar-workspaces';

interface BarLeftProps {
  monitor: number;
}

function BarLeft(props: BarLeftProps): JSX.Element {
  const { monitor } = props;

  return (
    <box halign={Gtk.Align.START}>
      <BarWorkspaces monitor={monitor} />
    </box>
  );
}

function BarCenter(): JSX.Element {
  return <box halign={Gtk.Align.CENTER}>{/* <BarItem>center</BarItem> */}</box>;
}

function BarRight(): JSX.Element {
  return (
    <box halign={Gtk.Align.END} spacing={SPACING.MD}>
      <Time />
      <Battery />
    </box>
  );
}

interface BarProps {
  monitor: number;
}

export function Bar(props: BarProps) {
  return (
    <window
      monitor={props.monitor}
      className={css.bar}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      marginLeft={10}
      marginRight={10}
      marginTop={10}
    >
      <centerbox hexpand>
        <BarLeft monitor={props.monitor} />
        <BarCenter />
        <BarRight />
      </centerbox>
    </window>
  );
}
