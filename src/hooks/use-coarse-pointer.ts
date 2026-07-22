"use client"

import { useSyncExternalStore } from "react"

// Detecta dispositivos táctiles (sin hover real). SSR asume escritorio para
// no alterar el HTML servido; en el cliente se corrige antes del primer paint.
const QUERY = "(hover: none), (pointer: coarse)"

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

const getSnapshot = () => window.matchMedia(QUERY).matches
const getServerSnapshot = () => false

export function useCoarsePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
