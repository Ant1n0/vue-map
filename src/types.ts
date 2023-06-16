export type Coordinates = {
  lat: number
  lng: number
}

export type Place = Coordinates & {
  name: string
  timezone: string
  searchedAt: Date
}
