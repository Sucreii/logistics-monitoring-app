<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { CreateNewShipmentFields } from 'src/utils'
import { useShipmentStore } from 'src/stores/ShipmentStore'

const shipmentStore = useShipmentStore()
const { expenseData, revenueData, warehouseItems, containerItems, portItems } = storeToRefs(shipmentStore)
const inputValue = ref<string>('')

interface MyForm {
    [key: string]: string | number | string[] | null | undefined
}
const formDataField = ref<MyForm>({ })
const bindTime = (model: string) => {
  return formDataField.value[model] as string | null | undefined
}

const formData = ref(
  CreateNewShipmentFields.reduce(
    (acc, field) => {
      acc[field.model] = field.type === 'select' ? (field.model === 'port' ? '' : []) : ''
      return acc
    },
    {} as Record<
      string,
      string | string[] | { name: string; value: string }[] | { name: string; value: string }
    >,
  ),
)
defineExpose({ formData })

const filterFn = (val: string, update: (callback: () => void) => void) => {
  update(() => {
    inputValue.value = val
  })
}

const createValue = async (
  val: string,
  done: (item?: string, mode?: 'add' | 'add-unique' | 'toggle') => void,
  fieldModel: string,
) => {
  console.log('model:', fieldModel) 
  console.log('val:', val) 

  if (val.trim().length > 0) {
    let targetList: Ref<string[]> | null = null

    if (fieldModel === 'warehouse') {
      targetList = warehouseItems
    } else if (fieldModel === 'container') {
      targetList = containerItems
    } else if (fieldModel === 'port') {
      targetList = portItems
    }

    // Only store the value in options, not in the input field
    if (targetList && !targetList.value.includes(val)) {
      targetList.value = [...targetList.value, val]
    }

    done()
  }

  try {
    const response = await shipmentStore.createNewStorableToApi(fieldModel, val)
    console.log('response responsessss', response)
  } catch (err) {
    console.error(err)
  }
}

const loadingStates = ref<Record<string, boolean>>({})
const deleteStorableItems = async (opt: string, fieldModel: string) => {
  try {
    loadingStates.value[fieldModel] = true // Start loading

    const response = await shipmentStore.deleteStorableItemToApi(opt, fieldModel)
    console.log('response', response)

    if (response?.code === 200) {
      await shipmentStore.getContainerTypeFromApi()
    }
  } catch (err) {
    console.error(err)
  } finally {
    loadingStates.value[fieldModel] = false
  }
}
</script>

<template>
    <div class="row q-col-gutter-md">
        <div v-for="field in CreateNewShipmentFields" :class="['col-' + field.col, field.label]" :key="field.model" dense >
            <div class="row" v-if="field.type === 'text'">
                <div class="col-12">
                    <div class="text-subtitle2 q-ml-xs text-grey-8"> {{ field.label }} </div>
                </div>
                
                <div class="col-12">
                <!-- <q-input
                    outlined
                    v-model="formData[field.model] as string | null"
                    :placeholder="field.label"
                /> -->
                    <q-input
                        outlined
                        v-model="(formDataField[field.model] as any)"
                        :placeholder="field.label"
                    />
            </div>
        </div>

        <div class="row" v-else-if="field.type === 'date'">
            <div class="col-12 text-subtitle2 q-ml-xs text-grey-8"> {{ field.label }} </div>
            <div class="col-12">
                <!-- <q-input 
                    filled 
                    v-model="formData[field.model] as string | number | null"
                > -->
                <q-input 
                    filled 
                    v-model="(formDataField[field.model] as any)"
                >
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="formDataField[field.model]" mask="YYYY-MM-DD HH:mm:00">
                                    <div class="row items-center justify-end">
                                        <q-btn 
                                            v-close-popup 
                                            label="Close" 
                                            color="primary" 
                                            flat 
                                        />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>

                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <!-- <q-time
                                v-model="formData[field.model] as string | null | undefined"
                                mask="YYYY-MM-DD HH:mm:00"
                                format24h
                            > -->
                            <q-time
                                :model-value="bindTime(field.model)"
                                @update:model-value="val => formDataField[field.model] = val"
                                mask="YYYY-MM-DD HH:mm:00"
                                format24h
                            >
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
        </div>

        <div class="row" v-else-if="field.type === 'select' && field.variant !== 'money'">
            <div class="col-12 text-subtitle2 q-ml-xs text-grey-8"> {{ field.label }} </div>
            <div class="col-12">
                <q-select
                    v-model="formDataField[field.model]"
                    :placeholder="field.label"
                    outlined
                    :multiple="field.model !== 'port'"
                    :options="
                    field.model === 'warehouse'
                        ? warehouseItems
                        : field.model === 'container'
                        ? containerItems
                        : portItems
                    "
                    use-input
                    @filter="filterFn"
                    use-chips
                    behavior="dialog"
                    input-debounce="0"
                    @new-value="(val, done) => createValue(val, done, field.model)"
                >
                    <template v-slot:option="{ opt, itemProps }">
                        <q-item v-bind="itemProps">
                            <q-item-section>
                            <q-item-label>{{ opt }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                            <q-btn
                                dense
                                flat
                                icon="delete"
                                color="grey-7"
                                size="sm"
                                @click.stop="deleteStorableItems(opt, field.model)"
                            />
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>
        </div>

            <div class="row" v-else-if="field.type === 'select' && field.variant === 'money'">
                <div class="col-12 text-subtitle2 q-ml-xs text-grey-8"> {{ field.label }} </div>
                <div class="col-12">
                    <q-select
                        outlined
                        v-model="formDataField[field.model]"
                        :placeholder="field.label"
                        :options="field.model === 'expense' ? expenseData : revenueData"
                        behavior="menu"
                        map-options
                        multiple
                        use-chips
                        option-label="name"
                        option-value="value"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
