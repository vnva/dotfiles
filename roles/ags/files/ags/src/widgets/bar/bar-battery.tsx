import { bind } from 'astal/binding';
import BatteryModule from 'gi://AstalBattery';

import { BarItem } from './bar-item';
import { NERD_ICON, NerdIconDirection } from '../../utils/constants';
import css from './bar.module.scss';
import { mergeBindings } from '../../utils/bindings';

const battery = BatteryModule.get_default();

function getBatteryIcon(percentage: number): NerdIconDirection {
  if (percentage < 0.15) return NERD_ICON.BAT0;
  if (percentage < 0.3) return NERD_ICON.BAT1;
  if (percentage < 0.5) return NERD_ICON.BAT2;
  if (percentage < 0.65) return NERD_ICON.BAT3;

  return NERD_ICON.BAT4;
}

function getBatteryClassName(percentage: number, state: BatteryModule.State): string | undefined {
  switch (state) {
    case BatteryModule.State.PENDING_CHARGE:
      return css.barBatteryPendingCharge;
    case BatteryModule.State.CHARGING:
      return css.barBatteryCharging;
    case BatteryModule.State.DISCHARGING:
      return css.barBatteryDischarging;
    default:
      if (percentage <= 0.15) return css.barBatteryLow;
      return;
  }
}

export function Battery(): JSX.Element {
  const batteryBinding = mergeBindings([bind(battery, 'percentage').as((p) => p), bind(battery, 'state').as((s) => s)]);
  const className = batteryBinding.as((v: [number, BatteryModule.State]) => getBatteryClassName(v[0], v[1]));

  const barItem = (
    <BarItem className={className}>
      {batteryBinding.as(([p]) => `${getBatteryIcon(p).L} ${Math.floor(p * 100)}%`)}
    </BarItem>
  );

  return barItem;
}
