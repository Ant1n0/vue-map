import { GOOGLE_API_KEY } from './constants'
import type { Coordinates } from './types'

type PlaceSearchApiResponse = {
  results: {
    formatted_address: string
    geometry: {
      location: Coordinates
    }
    place_id: String
  }[]
}
export const placeSearchApi = async (address: string): Promise<PlaceSearchApiResponse> => {
  const res = await fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?' +
      new URLSearchParams({
        address,
        key: GOOGLE_API_KEY
      })
  )
  return await res.json()
}

type TimezoneApiResponse = {
  dstOffset: number
  rawOffset: number
  status: 'OK' | 'ZERO_RESULTS'
  timeZoneId: string
  timeZoneName: string
}
export const timezoneApi = async (lat: number, lng: number): Promise<TimezoneApiResponse> => {
  const res = await fetch(
    'https://maps.googleapis.com/maps/api/timezone/json?' +
      new URLSearchParams({
        location: `${lat},${lng}`,
        timestamp: Math.floor(Date.now() / 1000).toString(),
        key: GOOGLE_API_KEY
      })
  )
  return await res.json()
}
