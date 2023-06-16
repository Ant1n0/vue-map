<template>
  <div style="display: flex; gap: 1rem">
    <n-button @click="onGetCurrentLocation" @keydown.enter="onGetCurrentLocation" :loading="loading">
      <template #icon>
        <n-icon>
          <location />
        </n-icon>
      </template>
      Get current location
    </n-button>
    <n-input-group>
      <n-input v-model:value="input" @keydown.enter="onSearch" style="width: 300px;" />
      <n-button type="primary" ghost @click="onSearch">
        Search
      </n-button>
    </n-input-group>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { NInput, NButton, NIcon, NInputGroup } from 'naive-ui';
import { Location } from "@vicons/ionicons5"
import { placeSearchApi, timezoneApi } from '@/api';
import { ContextKeys } from '@/constants';
import type { Place } from '@/types';

const loading = ref(false)
const allPlacesRef = inject<Ref<Place[]>>(ContextKeys.allPlaces)

async function success(pos: GeolocationPosition) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  const { timeZoneId } = await timezoneApi(crd.latitude, crd.longitude)
  allPlacesRef?.value.push({
    name: "Current location",
    lat: crd.latitude,
    lng: crd.longitude,
    timezone: timeZoneId,
    searchedAt: new Date(),
  })

  loading.value = false
}

function error(err: GeolocationPositionError) {
  alert(`[${err.code}] Error getting current location: ${err.message}`);

  loading.value = false
}

const onGetCurrentLocation = () => {
  loading.value = true
  navigator.geolocation.getCurrentPosition(success, error);
}

const input = ref('')
const onSearch = async () => {
  const { results } = await placeSearchApi(input.value)
  // We assume that the first result is the most relevant
  const firstResult = results[0]
  const { timeZoneId } = await timezoneApi(firstResult.geometry.location.lat, firstResult.geometry.location.lng)

  allPlacesRef?.value.push({
    name: firstResult.formatted_address,
    lat: firstResult.geometry.location.lat,
    lng: firstResult.geometry.location.lng,
    timezone: timeZoneId,
    searchedAt: new Date(),
  })

  input.value = ''
}
</script>