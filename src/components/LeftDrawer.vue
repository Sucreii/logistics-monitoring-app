<script lang="ts" setup>
import { ref, provide, onMounted, computed } from 'vue'
import { NavigationItems } from 'src/utils'
import { useRoute } from 'vue-router'
import { dummyNotificationContent } from 'src/utils'
import { useAuthStore } from 'src/stores/LoginAuth'
import { useShipmentStore } from '../stores/ShipmentStore'
import { date } from 'quasar'
// import { useDocumentDialog } from 'src/utils/composables/dialog'
import notificationMenu from './NotifButton.vue'
import AddButtonComponent from 'src/components/ShipmentButton.vue'

// const { showNotificationDialog } = useDocumentDialog()
const route = useRoute()
const authStore = useAuthStore()
const shipmentStore = useShipmentStore()
const leftDrawerOpen = ref(true)
const getDate = Date.now()
const formattedDate = date.formatDate(getDate, 'MMMM DD, YYYY')

const currentLabel = computed(() => {
  const currentItem = NavigationItems.find((item) => item.name === route.name)
  return currentItem ? currentItem.label : 'Users'
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(async () => {
  await shipmentStore.getShipmentToApi()
  await shipmentStore.getFinanceData()
  await shipmentStore.getContainerTypeFromApi()
})

provide('dummyNotificationItems', dummyNotificationContent)
</script>

<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="bg-white text-white">
      <q-toolbar>
        <q-btn
          class="text-primary"
          dense
          flat
          round
          :icon="leftDrawerOpen === true ? 'menu_open' : 'menu'"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-item v-if="leftDrawerOpen === false">
            <q-item-section>
              <q-item-label class="text-primary text-caption">
                {{ currentLabel }} / {{ formattedDate }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-toolbar-title>

        <div>
          <q-item>
            <q-item-section>
              <q-item-label class="text-primary text-caption">
                Hi {{ authStore.user?.role || 'User Type' }},
                {{ authStore.user?.firstName || 'User' }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <q-btn flat round icon="notifications" class="text-primary">
          <notificationMenu />
        </q-btn>
      </q-toolbar>

      <div class="row">
        <div class="col-6">
          <div class="q-px-md text-h4 text-weight-bold text-primary">{{ currentLabel }}</div>
        </div>
        <div
          class="col-6 text-right q-pt-sm q-pr-md"
          v-if="authStore.user?.role === 'ADMIN' || authStore.user?.role === 'SUPER_ADMIN'"
        >
          <AddButtonComponent />
        </div>
      </div>
    </q-header>

    <!-- - - - - - - - - - - LEFT DRAWER - - - - - - - - - -  -->
    <q-drawer class="bg-drawerBg" v-model="leftDrawerOpen" show-if-aboveelevated>
      <q-list padding>
        <q-item class="q-my-md">
          <q-item-section side>
            <q-avatar rounded size="48px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ authStore.user?.firstName || 'User' }}</q-item-label>
            <q-item-label caption>{{ authStore.user?.role || 'User Type' }}</q-item-label>
          </q-item-section>
          <q-btn
            icon="exit_to_app"
            flat
            class="q-p-2 bg-white text-negative"
            @click="authStore.logout"
          />
        </q-item>

        <q-separator inset />
      </q-list>
      <q-list padding class="q-pt-lg">
        <template v-for="item in NavigationItems" :key="item.label">
          <!-- <q-expansion-item
            v-if="item.children && authStore.user?.role === 'SUPER_ADMIN'"
            expand-separator
            class="q-pa-none"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
            </template>

            <q-list dense class="q-pl-lg">
              <q-item
                v-for="subItem in item.children"
                :key="subItem.label"
                :to="{ name: subItem.name }"
                clickable
                v-ripple
                class="q-pl-md"
                :class="{
                  'text-primary': $route.name === subItem.name,
                  'text-grey-7': $route.name !== subItem.name,
                }"
              >
                <q-item-section avatar>
                  <q-icon :name="subItem.icon" />
                </q-item-section>
                <q-item-section>{{ subItem.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item> -->

          <q-item
            v-if="item.label !== 'Users' || authStore.user?.role === 'SUPER_ADMIN'"
            clickable
            v-ripple
            :to="{ name: item.name }"
            class="q-py-md"
            :class="{
              'text-primary': $route.name === item.name,
              'text-grey-7': $route.name !== item.name,
            }"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
