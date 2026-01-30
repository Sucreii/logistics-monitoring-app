<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { getAllUsers } from 'src/stores/ShipmentStore';
import { tableUsersConstants } from 'src/utils/index';
import type { QTableColumn } from 'quasar';
import filterForm from '../layouts/trips/FilterForm.vue';

onMounted(async () => {
  await graphUsers.fetchUsers();
  console.log('Users fetched: ', graphUsers.user);
});

const graphUsers = getAllUsers();
const tableRows = computed(() => {
  return graphUsers.user.length > 0 ? graphUsers.user : tableUsersConstants;
});

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'username', label: 'Username', field: 'username', align: 'left' },
  { name: 'first_name', label: 'First Name', field: 'first_name', align: 'left' },
  { name: 'middle_name', label: 'Middle Name', field: 'middle_name', align: 'left' },
  { name: 'last_name', label: 'Last Name', field: 'last_name', align: 'left' },
  { name: 'password', label: 'Password', field: 'password', align: 'left' },
  { name: 'last_logged_in', label: 'Last logged In', field: 'last_logged_in', align: 'left' },
];
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-px-md text-caption">
          A unified view of user profiles with real-time controls for management, permissions, and
          status.
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
                  :loading="graphUsers.loading"
                  :rows-per-page-options="[10, 20, 50, 100]"
                  row-key="id"
                  bordered
                  flat
                >
                  <template v-slot:loading>
                    <q-inner-loading秀 showing color="primary" />
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
