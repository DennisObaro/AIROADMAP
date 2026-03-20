import { useSyncExternalStore } from 'react'

/** Matches Tailwind `md` breakpoint — viewports this wide or smaller get the desktop-only gate. */
const NARROW_QUERY = '(max-width: 767.98px)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(NARROW_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(NARROW_QUERY).matches
}

/** SSR / prerender: assume desktop so crawlers don’t only see the gate. */
function getServerSnapshot() {
  return false
}

export function useNarrowViewport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
