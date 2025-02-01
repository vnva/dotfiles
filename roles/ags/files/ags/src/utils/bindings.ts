import { Binding, Variable } from 'astal';

export function mergeBindings(array: Binding<any>[]): Binding<any> {
  function getValues(...args: any[]) {
    let i = 0;
    return array.map((value) => (value instanceof Binding ? args[i++] : value));
  }

  const bindings = array.filter((i) => i instanceof Binding);

  if (bindings.length === 0) throw Error('No bindings');

  if (bindings.length === 1) return bindings[0].as(getValues);

  return Variable.derive(bindings, getValues)();
}
