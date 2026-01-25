<script lang="ts" setup>
import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Dummy {
  title: string
  content: string
  date: string
}
const router = useRouter()
const itemsToShow = ref(6)
const visibleNotifications = computed(() => notifications?.slice(0, itemsToShow.value) || [])
const handleSeeAll = async () => {
  await router.push({ name: 'home.notifications' })
}
const notifications = inject<Dummy[]>('dummyNotificationItems', [])
</script>

<template>
  <q-menu fit class="notification-menu">
    <q-card class="notification-card">
      <q-card-section class="row items-center justify-between">
        <div class="h6 text-bold">Notifications</div>
        <q-btn flat round color="primary" icon="more_horiz" />
      </q-card-section>
      <q-separator />
      <q-card-section
        horizontal
        class="notification-card-body"
        v-for="(notif, index) in visibleNotifications"
        :key="index"
      >
        <q-card-section class="flex flex-center">
          <q-badge color="primary" />
        </q-card-section>
        <q-card-section horizontal>
          <q-card-section>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-bold text-caption">{{ notif.title }}</div>
            <div class="text-caption text-grey-8">{{ notif.content }}</div>
          </q-card-section>
        </q-card-section>
        <q-space />
        <q-card-actions>
          <q-btn flat no-caps color="positive" label="Confirm" />
          <q-btn flat no-caps color="negative" label="Delete" />
        </q-card-actions>
      </q-card-section>

      <q-separator />

      <q-card-section class="flex flex-center q-pa-xs">
        <q-btn dense flat text no-caps color="primary" label="See all" @click="handleSeeAll()" />
      </q-card-section>
    </q-card>
  </q-menu>
</template>

<style lang="scss" scoped>
.notification-menu {
  .notification-card {
    .notification-card-body {
      border-bottom: 1px grey solid;
      margin-bottom: 1px;
    }
  }
}
</style>
