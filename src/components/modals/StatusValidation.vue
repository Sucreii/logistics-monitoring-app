<script setup lang="ts">
// import { defineProps } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useShipmentStore } from 'src/stores/ShipmentStore'
import type { ShipmentList } from 'src/utils/static/types.ts'
const { dialogRef, onDialogHide } = useDialogPluginComponent()
const shipmentStore = useShipmentStore()

const props = defineProps<{ shipmentData: ShipmentList; shipmentStatus: unknown }>()

console.log('propsValue', {
  shipmentData: props.shipmentData,
  shipmentStatus: props.shipmentStatus,
})

const yes = async () => {
  try {
    const filteredShipmentData = { ...props.shipmentData, status: props.shipmentStatus }
    delete filteredShipmentData.issuedBy
    delete filteredShipmentData.dateIssued
    delete filteredShipmentData.net

    const response = await shipmentStore.updateShipmentToApi(filteredShipmentData)
    console.log('response update', response)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="text-center q-pa-md status-card-dialog flex-center">
      <q-card-section>
        <q-icon name="cancel" size="xl" color="negative" />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Are you sure ?</div>
      </q-card-section>
      <q-card-section>
        <div class="text-caption text-grey-8 q-py-none">
          Do you really want to update these records? This process cannot be undone.
        </div>
      </q-card-section>
      <q-card-actions class="row q-col-gutter-x-md">
        <div class="col-6 q-pl-xl">
          <q-btn label="Yes" no-caps color="positive" class="action-buttons" @click="yes" />
        </div>
        <div class="col-6 q-pr-xl">
          <q-btn label="No" no-caps color="negative" class="action-buttons" @click="onDialogHide()" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.status-card-dialog {
  width: 500px;
  max-width: 80vw;
  border-radius: 24px;
  height: auto;
}

.action-buttons {
  width: 100%;
}
</style>
