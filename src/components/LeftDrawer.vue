<script lang="ts" setup>
import { ref, provide, computed } from 'vue';
import { NavigationItems } from 'src/utils';
import { useRoute } from 'vue-router';
import { dummyNotificationContent } from 'src/utils';
import { useAuthStore } from 'src/stores/LoginAuth';
import { date } from 'quasar';
// import { useDocumentDialog } from 'src/utils/composables/dialog'
import notificationMenu from './NotifButton.vue';
import AddButtonComponent from 'src/components/ShipmentButton.vue';

// const { showNotificationDialog } = useDocumentDialog()
const route = useRoute();
const authStore = useAuthStore();
const leftDrawerOpen = ref(true);
const getDate = Date.now();
const formattedDate = date.formatDate(getDate, 'MMMM DD, YYYY');

const currentLabel = computed(() => {
  const currentItem = NavigationItems.find((item) => item.name === route.name);
  return currentItem ? currentItem.label : 'Users';
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

provide('dummyNotificationItems', dummyNotificationContent);
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
                Hi {{ authStore.username?.username || 'Username' }}
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

        <div class="col-6 text-right q-pt-sm q-pr-md" v-if="authStore.roleLabel !== 'Viewer'">
          <AddButtonComponent />
          <button style="background: red; color: white">I AM A TEST</button>
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
            <q-item-label>{{ authStore.username?.first_name }}</q-item-label>
            <q-item-label caption>{{ authStore.roleLabel }}</q-item-label>
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
          <q-item
            v-if="item.label !== 'Users' || authStore.roleLabel === 'Super Admin'"
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
