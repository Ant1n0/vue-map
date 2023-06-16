<template>
  <n-button @click="onDeleteAllSelected" :disabled="!checkedRowNamesRef.length" style="width: 160px">
    <template #icon>
      <n-icon>
        <Trash />
      </n-icon>
    </template>
    Delete Selected
  </n-button>
  <n-data-table :columns="columns" :data="allPlacesRef" :pagination="pagination" :bordered="false"
    :row-key="row => row.name" @update:checked-row-keys="handleCheck" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { h, ref } from 'vue'
import { NButton, NDataTable, NIcon, type DataTableColumns, type DataTableRowKey } from 'naive-ui'
import type { Place } from '@/types';
import { Trash } from "@vicons/ionicons5"
import { usePlaces } from '@/hooks/usePlaces';

dayjs.extend(utc)
dayjs.extend(timezone)

const columns: DataTableColumns<Place> = [
  {
    type: 'selection',
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Latitude',
    key: 'lat'
  },
  {
    title: 'Longitude',
    key: 'lng'
  },
  {
    title: 'Timezone',
    key: 'timezone'
  },
  {
    title: "Local time",
    key: "localTime",
    render(row: Place) {
      return dayjs().tz(row.timezone).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  {
    title: 'Action',
    key: 'actions',
    render(row: Place, index: number) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => onDelete(index)
        },
        { default: () => 'Delete' }
      )
    }
  }
]
const pagination = {
  pageSize: 10
}

const { allPlacesRef } = usePlaces()
const checkedRowNamesRef = ref<DataTableRowKey[]>([])

const onDelete = (index: number) => {
  allPlacesRef.value.splice(index, 1)
}
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowNamesRef.value = rowKeys
  console.log(rowKeys)
}
const onDeleteAllSelected = () => {
  allPlacesRef.value = allPlacesRef.value.filter((place) => !checkedRowNamesRef.value.includes(place.name))
}
</script>