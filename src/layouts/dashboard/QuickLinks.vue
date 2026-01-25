<script lang="ts" setup>
import chart from '../GraphTable.vue'
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-8 column">
      <q-card flat bordered class="col">
        <q-card-section>
          <chart />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-4 column">
      <q-card flat bordered class="col">
        <q-card-section>
          <div class="text-overline text-weight-bolder text-primary">QUICK LINKS</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
