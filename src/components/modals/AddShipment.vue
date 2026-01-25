<script lang="ts" setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useShipmentStore } from 'src/stores/ShipmentStore'
import shipInformationForm from 'src/components/stepper/ShipInformation.vue'
import expensesInformationForm from 'src/components/stepper/ExpensesInfo.vue'

const { dialogRef, onDialogHide } = useDialogPluginComponent()
const shipmentStore = useShipmentStore()
const step = ref(1)
const loading = ref(false)

const nextStep = async () => {
  if (step.value === 1) {
    if (!shipFormRef.value || !shipFormRef.value.formData) {
      console.error('shipFormRef or formData is undefined.')
      return
    }

    const formData = {
      ...shipFormRef.value.formData,
      volumeX: Number(shipFormRef.value.formData.volumeX),
      volumeY: Number(shipFormRef.value.formData.volumeY),
    }

    try {
      loading.value = true
      const response = await shipmentStore.createShipmentToApi(formData)
      if (response.code === 201) {
        step.value++
      }
    } catch (error) {
      console.error('Error during API calls:', error)
    } finally {
      loading.value = false
    }
  } else if (step.value === 2) {
    if (!shipFinanceFormRef.value || !shipFinanceFormRef.value.shipmentData) {
      console.error('shipFinanceFormRef or formData is undefined.')
      return
    }

    console.log('shipFinanceFormRef.value.formData', shipFinanceFormRef.value.shipmentData)

    try {
      loading.value = true
      const response = await shipmentStore.createFinanceToApi(
        shipFinanceFormRef.value.shipmentData,
        String(shipFinanceFormRef.value.shipmentData?.shipmentId),
      )

      const allSuccess = Array.isArray(response) && response.every((res) => res?.status === 200)

      if (allSuccess) {
        console.log('success')
      }
    } catch (error) {
      console.error('Error during Finance API call:', error)
    } finally {
      loading.value = false
    }
  }
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const shipFormRef = ref<InstanceType<typeof shipInformationForm> | null>(null)

const shipFinanceFormRef = ref<InstanceType<typeof expensesInformationForm> | null>(null)
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="create-shipment-card">
      <q-card-section class="row items-center">
        <div class="text-h6 text-primary">Create New Shipment <q-icon name="inventory_2" /></div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense @click="onDialogHide()" />
      </q-card-section>
      <q-separator inset />

      <div class="q-pa-md">
        <q-stepper v-model="step" ref="stepper" color="primary" contracted animated dense flat>
          <q-step 
            :name="1" 
            title="Information" 
            icon="settings" 
            :done="step > 1"
          >
            <q-form @submit.prevent="nextStep">
              <shipInformationForm ref="shipFormRef" />
            </q-form>
          </q-step>

          <q-step
            :name="2"
            title="Finance"
            caption="Optional"
            icon="create_new_folder"
            :done="step > 2"
          >
            <q-form @submit.prevent="nextStep">
              <expensesInformationForm ref="shipFinanceFormRef" />
            </q-form>
          </q-step>

          <template v-slot:navigation v-if="step < 2">
            <q-stepper-navigation>
              <q-btn
                @click="nextStep"
                color="primary"
                :label="step === 3 ? 'Finish' : 'Continue'"
                :loading="loading"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="prevStep"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.create-shipment-card {
  width: 1000px;
  max-width: 80vw;
  border-radius: 24px;

  .scroll-area {
    height: 600px;
    max-width: 100%;
  }
}
</style>
