import { BoxProps } from 'astal/gtk3/widget';

import css from './bar.module.scss';
import { cn } from '../../utils/cn';

export function BarItem(properties: BoxProps): JSX.Element {
  const { children, className, ...rest } = properties;

  return (
    <box className={cn(css.barItem, className)} {...rest}>
      {children}
    </box>
  );
}
