type Callback = (payload?: any) => void

const listeners: Record<string, Set<Callback>> = {}

export function on(event: string, cb: Callback) {
  listeners[event] ||= new Set()
  listeners[event].add(cb)
  return () => off(event, cb)
}

export function off(event: string, cb: Callback) {
  listeners[event]?.delete(cb)
}

export function emit(event: string, payload?: any) {
  listeners[event]?.forEach(cb => cb(payload))
}
