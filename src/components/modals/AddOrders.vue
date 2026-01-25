<script lang="ts" setup>
// import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
// import { CreateNewOrderFields } from 'src/utils/fields/create-new-orders'
const { dialogRef } = useDialogPluginComponent()

// const formData = ref(
//   CreateNewOrderFields.reduce(
//     (acc, field) => {
//       acc[field.model] = ''
//       return acc
//     },
//     {} as Record<string, string>,
//   ),
// )

// const onOKClick = () => {
//   onDialogOK(formData.value)
// }

// const onCancelClick = () => {
//   onDialogCancel()
// }
</script>

<template>
  <q-dialog ref="dialogRef">
    <q-card class="create-shipment-card">
      <q-card-section class="row items-center">
        <div class="text-h6 text-primary">Create New Orders</div>
        <q-space />
        <!-- <q-btn icon="close" color="primary" flat round dense @click="onCancelClick" /> -->
      </q-card-section>

      <q-separator inset />

      <q-card-section class="q-my-sm">
        <div class="row q-col-gutter-md">
          <!-- <div class="col-12" v-for="field in CreateNewOrderFields" :key="field.model" dense>
            <div class="row">
              <div class="col-12">
                <div class="text-subtitle2 q-ml-xs text-grey-8">{{ field.label }}</div>
              </div>
              <div class="col-12">
                <q-input v-model="formData[field.model]" :placeholder="field.label" outlined />
              </div>
            </div>
          </div> -->
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-mx-sm q-pt-none q-pb-md">
        <!-- <q-btn flat no-caps label="Cancel" color="primary" @click="onCancelClick" />
        <q-btn no-caps label="Submit" color="primary" @click="onOKClick" /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.create-shipment-card {
  width: 700px;
  max-width: 80vw;
  border-radius: 24px;
}
</style>
