<script lang="ts" setup>
import { ref } from 'vue';
import filterForm from '../layouts/trips/FilterForm.vue';

const hidePagination = ref(true);
const current = ref(3);
const isEditing = ref(false);
const statusOptions = [
  { label: 'Completed', value: 'completed' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Pending', value: 'pending' },
];

interface Row {
  name: string;
  customer_name: string;
  consignee_name: string;
  pickup_port: string;
  delivery_location: string;
  date_delivered: string;
  calcium: string;
  Status: string;
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Shipment ID',
    align: 'left' as const,
    field: (row: Row) => row.name,
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: 'customer_name',
    align: 'left' as const,
    label: 'Customer Name',
    field: 'customer_name',
    sortable: true,
  },
  {
    name: 'consignee_name',
    align: 'left' as const,
    label: 'Consignee Name',
    field: 'consignee_name',
    sortable: true,
  },
  { name: 'pickup_port', align: 'left' as const, label: 'Pickup Port', field: 'pickup_port' },
  {
    name: 'delivery_location',
    align: 'left' as const,
    label: 'Delivery Location',
    field: 'delivery_location',
  },
  {
    name: 'date_delivered',
    align: 'left' as const,
    label: 'Date Delivered',
    field: 'date_delivered',
  },
  {
    name: 'Status',
    align: 'left' as const,
    label: 'Status',
    field: 'Status',
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'actions',
    align: 'left' as const,
    label: 'Actions',
    field: 'actions',
    sortable: false,
  },
];

const rows: Row[] = [
  {
    name: 'Alisa',
    customer_name: 'test',
    consignee_name: 'Test',
    pickup_port: 'test',
    delivery_location: 'test',
    date_delivered: 'test',
    calcium: '14%',
    Status: 'Completed',
  },
  {
    name: 'Eka',
    customer_name: 'test',
    consignee_name: 'Test',
    pickup_port: 'test',
    delivery_location: 'test',
    date_delivered: 'test',
    calcium: '14%',
    Status: 'Pending',
  },
];

const editRow = (row: Row) => {
  console.log('Edit:', row);
  isEditing.value = true;
};

const saveRow = (row: Row) => {
  console.log('saveRow', row);
  isEditing.value = false;
};

const deleteRow = (row: Row) => {
  console.log('Delete:', row);
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return { icon: 'check_circle', color: 'positive' };
    case 'Rejected':
      return { icon: 'cancel', color: 'negative' };
    case 'Pending':
      return { icon: 'hourglass_empty', color: 'warning' };
    default:
      return { icon: 'help', color: 'grey' };
  }
};
</script>

<template>
  <q-page>
    <div class="row q-pa-md q-gutter-y-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="q-pb-none">
            <div class="text-h6">I AM FOR TRIPS</div>
          </q-card-section>

          <q-card-section>
            <filterForm />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="name"
              flat
              bordered
              :hide-pagination="hidePagination"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="row">
                  <div v-if="!isEditing">
                    <q-btn
                      flat
                      dense
                      round
                      color="primary"
                      icon="edit"
                      @click="editRow(props.row)"
                    />
                  </div>
                  <div v-else>
                    <q-btn
                      flat
                      dense
                      round
                      color="primary"
                      icon="check"
                      @click="saveRow(props.row)"
                    />
                  </div>
                  <div>
                    <q-btn
                      flat
                      dense
                      round
                      color="negative"
                      icon="delete"
                      @click="deleteRow(props.row)"
                    />
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-Status="props">
                <q-td :props="props">
                  <div v-if="isEditing">
                    <q-select v-model="props.row.Status" :options="statusOptions" filled dense />
                  </div>
                  <div v-else>
                    <!-- Dynamic icon based on status -->
                    <q-icon
                      class="q-mb-xs q-mr-xs"
                      :name="getStatusIcon(props.row.Status).icon"
                      size="xs"
                      :color="getStatusIcon(props.row.Status).color"
                    />
                    {{ props.row.Status }}
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
          <q-card-section class="q-pt-none flex flex-center">
            <q-pagination
              v-model="current"
              max="5"
              direction-links
              flat
              color="grey"
              active-color="primary"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
