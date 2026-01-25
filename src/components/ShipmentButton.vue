<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDocumentDialog } from 'src/utils/composables/dialog'

const route = useRoute()
const { showDocumentDialog, showCreateShipmentDialog } = useDocumentDialog()

const openDialog = () => {
  if (route.name === 'home.order-list') {
    showDocumentDialog()
  } else {
    showCreateShipmentDialog()
  }
}

const btnVisibility = computed(
  () => route.name === 'home.order-list' || route.name === 'home.shipment-list',
)
</script>

<template>
  <div>
    <q-btn
      v-if="btnVisibility"
      color="white"
      text-color="primary"
      label="Create"
      :icon-right="route.name === 'home.order-list' ? 'inventory_2' : 'local_shipping'"
      no-caps
      push
      @click="openDialog"
    />
  </div>
</template>

<style lang="scss" scoped></style>
