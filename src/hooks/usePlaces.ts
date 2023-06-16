import { ContextKeys } from '@/constants'
import type { Place } from '@/types'
import { inject, ref, type Ref } from 'vue'

export const usePlaces = () => {
  const allPlacesRef = inject<Ref<Place[]>>(ContextKeys.allPlaces)

  return { allPlacesRef: allPlacesRef ?? ref([]) }
}
