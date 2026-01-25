<script setup lang="ts"></script>

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

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="text-center q-pa-md status-card-dialog flex-center">
      <q-card-section>
        <q-icon name="help_outline" size="xl" color="primary" />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Are you sure you want to update this status?</div>
      </q-card-section>
      <q-card-actions class="row q-col-gutter-x-md">
        <div class="col-6">
          <q-btn label="Yes" no-caps color="primary" class="action-buttons" />
        </div>
        <div class="col-6">
          <q-btn label="No" no-caps color="negative" class="action-buttons" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>