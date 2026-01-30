<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { getAllShipment } from 'src/stores/ShipmentStore';
import { tableShipmentConstant } from 'src/utils/index';
import type { QTableColumn } from 'quasar';
import filterForm from '../layouts/trips/FilterForm.vue';

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

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-px-md text-caption">
          Comprehensive overview of logistics status with real-time tools to manage, track, and
          update shipment outcomes.
        </div>

        <div class="row q-pa-md q-gutter-y-md">
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <filterForm />
              </q-card-section>

              <q-card-section class="q-pt-none">
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
                    <q-td :props="props" class="q-gutter-x-sm">
                      <!-- <q-btn
                        flat
                        round
                        dense
                        color="primary"
                        icon="edit"
                        @click="editRow(props.row)"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="negative"
                        icon="delete"
                        @click="deleteRow(props.row)"
                      /> -->
                    </q-td>
                  </template>

                  <template v-slot:loading>
                    <q-inner-loading秀 showing color="primary" />
                  </template>
                </q-table>
              </q-card-section>

              <!-- <q-card-section class="q-pt-none flex flex-center">
                <q-pagination
                  v-model="current"
                  direction-links
                  flat
                  max="5"
                  color="grey"
                  active-color="primary"
                />
              </q-card-section> -->
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
