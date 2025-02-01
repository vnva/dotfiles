import { Binding } from 'astal';
import { mergeBindings } from './bindings';

type ClassName = string | Binding<any> | null | undefined | false;

export function cn(...args: ClassName[]): string | Binding<any> {
  let hasBinding = false;
  const classes: string[] = [];
  const bindings: Binding<string>[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (arg instanceof Binding) {
      hasBinding = true;
      bindings.push(arg);
    }
  });

  if (!hasBinding) return classes.join(' ');

  return (mergeBindings(bindings) as Binding<string[]>).as((v) => v.concat(classes).join(' '));
}
