<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { getAllShipment } from 'src/stores/ShipmentStore';
import { tableShipmentConstant } from 'src/utils/index';
import type { QTableColumn } from 'quasar';

onMounted(async () => {
  await graphShipment.fetchShipments();
  console.log('Shipments fetched: ', graphShipment.shipments);
});

const graphShipment = getAllShipment();
const tableRows = computed(() => {
  return graphShipment.shipments.length > 0 ? graphShipment.shipments : tableShipmentConstant;
});

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'blno', label: 'B/L No', field: 'blno', align: 'left' },
  { name: 'contract_no', label: 'Contract No', field: 'contract_no', align: 'left' },
  { name: 'entry_no', label: 'Entry No', field: 'entry_no', align: 'left' },
  { name: 'reference', label: 'Reference', field: 'reference', align: 'left' },
  { name: 'registry_no', label: 'Registry No', field: 'registry_no', align: 'left' },
];
</script>

<style lang="scss" scoped></style>

<template>
  <q-card flat bordered>
    <q-card-section>
      <filterForm />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-overline text-weight-bolder text-primary">RECENT ACCEPTED ORDERS</div>
      <q-table
        :rows="tableRows"
        :columns="columns"
        :loading="graphShipment.loading"
        :rows-per-page-options="[10, 20, 50, 100]"
        row-key="id"
        bordered
        flat
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm"> </q-td>
        </template>

        <template v-slot:loading>
          <q-inner-loading秀 showing color="primary" />
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
