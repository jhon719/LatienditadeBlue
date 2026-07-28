import { create } from "zustand"
import { persist } from "zustand/middleware"

// Tour de bienvenida de Bluet. `seen` persiste en localStorage para que solo
// se abra solo en la primera visita; `open` es transitorio porque el footer
// ("¿Como comprar?") puede reabrirlo cuando el usuario quiera repasarlo.
interface OnboardingState {
  seen: boolean
  open: boolean
  openTour: () => void
  closeTour: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      seen: false,
      open: false,

      openTour: () => set({ open: true }),
      closeTour: () => set({ open: false, seen: true }),
    }),
    {
      name: "latiendita-onboarding",
      // `open` no se persiste: al recargar, el tour no debe quedar abierto
      partialize: (state) => ({ seen: state.seen }),
    }
  )
)
