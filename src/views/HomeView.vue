<template>
  <div style="margin: 3rem auto; max-width: 1024px; display: flex; flex-direction: column; gap: 2rem;">
    <SearchBar />
    <GoogleMap />
    <LocationsTable />
  </div>
</template>

<script setup lang="ts">
import LocationsTable from '@/components/LocationsTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import GoogleMap from '@/components/GoogleMap.vue';
import { provide, ref } from 'vue';
import { ContextKeys } from '@/constants';

const lastSearchedPlace = ref("");
const allPlaces = ref<Location[]>([]);
provide(ContextKeys.lastSearchedPlace, lastSearchedPlace);
provide(ContextKeys.allPlaces, allPlaces);
</script>