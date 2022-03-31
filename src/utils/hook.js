import { writable } from 'svelte/store'

export const useState = function (init) {
  const _a = writable(init); const subscribe = _a.subscribe; const set = _a.set
  return [{ subscribe: subscribe }, set]
}
