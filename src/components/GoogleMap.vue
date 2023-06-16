<template>
  <GoogleMap :api-key="GOOGLE_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="10"
    :key="center.lat + '_' + center.lng">
    <GMarker v-for="place in allPlacesRef" :key="place.name" :options="{ position: place }" />
  </GoogleMap>
  <div>
    <h2>Last searched</h2>
    <template v-if="lastSearchedPlace.name">
      <p>Name: {{ lastSearchedPlace.name }}</p>
      <p>Lat: {{ lastSearchedPlace.lat }}</p>
      <p>Lng: {{ lastSearchedPlace.lng }}</p>
      <p>Timezone: {{ lastSearchedPlace.timezone }}</p>
      <p>Local time: {{ lastSearchedPlace.localTime }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_LAT, DEFAULT_LNG, GOOGLE_API_KEY } from "@/constants";
import { usePlaces } from "@/hooks/usePlaces";
import { reactive, watch, computed } from "vue";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
// @ts-ignore
import { GoogleMap, Marker as GMarker } from "vue3-google-map";

dayjs.extend(utc)
dayjs.extend(timezone)

const { allPlacesRef } = usePlaces()

const center = reactive({ lat: DEFAULT_LAT, lng: DEFAULT_LNG })
const lastSearchedPlace = computed(() => ({
  ...allPlacesRef.value[allPlacesRef.value.length - 1],
  localTime: dayjs().tz(allPlacesRef.value[allPlacesRef.value.length - 1]?.timezone).format("YYYY-MM-DD HH:mm:ss")
}) ?? {})

watch(allPlacesRef, (newValue) => {
  const lastPoint = newValue[newValue.length - 1]
  center.lat = lastPoint?.lat ?? DEFAULT_LAT
  center.lng = lastPoint?.lng ?? DEFAULT_LNG
}, { deep: true })


</script>