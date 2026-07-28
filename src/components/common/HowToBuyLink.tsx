"use client"

import { useOnboardingStore } from "@/stores/onboarding-store"

// Reabre el tour de Bluet desde el footer, para quien lo salto en su primera
// visita o quiere repasar como funciona la preventa / el apartado.
export function HowToBuyLink({ className }: { className?: string }) {
  const openTour = useOnboardingStore((state) => state.openTour)

  return (
    <button type="button" onClick={openTour} className={className}>
      ¿Como comprar?
    </button>
  )
}
