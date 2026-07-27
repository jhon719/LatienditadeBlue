import { create } from "zustand"

// Pila de rutas visitadas dentro de la sesión de la app (no persiste: un
// refresh la vacía, y BackButton cae al mapa de rutas padre en ese caso).
// Existe porque mucho tráfico llega desde navegadores embebidos de
// Instagram/TikTok/WhatsApp sin chrome de navegación visible, así que no
// podemos depender de que el usuario tenga un botón "atrás" a la mano.
interface NavigationState {
  stack: string[]
  visit: (pathname: string) => void
  popPrevious: () => string | undefined
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  stack: [],

  visit: (pathname) => {
    set((state) => {
      const last = state.stack[state.stack.length - 1]
      if (last === pathname) return state
      return { stack: [...state.stack, pathname] }
    })
  },

  popPrevious: () => {
    const { stack } = get()
    if (stack.length <= 1) return undefined
    const withoutCurrent = stack.slice(0, -1)
    set({ stack: withoutCurrent })
    return withoutCurrent[withoutCurrent.length - 1]
  },
}))
