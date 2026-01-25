import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HTTP_API } from 'src/boot/axios'
import type { ShipmentListTypes, FinanceListTypes, ShipmentList } from 'src/utils/static/types'

export const useShipmentStore = defineStore('shipmentStore', () => {
  interface ContainerItem {
    id: number
    name: string
  }

  interface shipmentDataTypes {
    id: number
    name: string
    value: number
  }

  interface shipmentIdType {
    id: number
  }

  const expenseData = ref<string[]>([])
  const revenueData = ref<string[]>([])
  const portItems = ref<string[]>([])
  const warehouseItems = ref<string[]>([])
  const containerItems = ref<string[]>([])
  const containerData = ref<ContainerItem[]>([])
  const shipmentExpense = ref<shipmentDataTypes[]>([])
  const shipmentRevenue = ref<shipmentDataTypes[]>([])
  const shipmentId = ref<shipmentDataTypes[]>([])
  const shipmentData = ref<{
    shipmentExpense: shipmentDataTypes[]
    shipmentRevenue: shipmentDataTypes[]
    shipmentId: shipmentIdType[]
  } | null>(null)
  const shipmentItemList = ref<ShipmentList[]>([])

  const createShipmentToApi = async (payload: ShipmentListTypes) => {
    console.log(payload)
    try {
      const { data } = await HTTP_API().post('/api/shipment', payload)
      console.log('data sa store', data)
      shipmentExpense.value = data.results.expenses
      shipmentRevenue.value = data.results.revenue
      shipmentId.value = data.results.id

      shipmentData.value = {
        shipmentExpense: shipmentExpense.value,
        shipmentRevenue: shipmentRevenue.value,
        shipmentId: shipmentId.value,
      }

      return data
    } catch (err) {
      console.error(err)
    }
  }

  const createFinanceToApi = async (payload: FinanceListTypes, shipId: string) => {
    const payloadExpenses = {
      finance: payload.shipmentExpense?.map((expense) => ({
        id: expense.id,
        name: expense.name,
        value: expense.value,
      })),
    }

    const payloadRevenue = {
      finance: payload.shipmentRevenue?.map((rev) => ({
        id: rev.id,
        name: rev.name,
        value: rev.value,
      })),
    }

    console.log('payloadExpenses', payloadExpenses)
    console.log('payloadRevenue', payloadRevenue)
    console.log('shipId', shipId)

    try {
      const response = await Promise.all([
        HTTP_API().put(`/api/shipment/${shipId}/expense`, payloadExpenses),
        HTTP_API().put(`/api/shipment/${shipId}/revenue`, payloadRevenue),
      ])
      return response // Return the response
    } catch (err) {
      console.error(err)
      throw err // Re-throw for proper async handling
    }
  }

  const createNewStorableToApi = async (fieldModel: string, val: string) => {
    try {
      const payload = {
        id: val,
        description: `${val} To ${fieldModel}`,
      }

      const { data } = await HTTP_API().post(`/api/storable/${fieldModel}`, payload)
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const updateShipmentToApi = async (payload: ShipmentList) => {
    console.log('payload-update', payload)
    try {
      const { data } = await HTTP_API().put(`/api/shipment/${payload.id}`, payload)
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const getShipmentToApi = async () => {
    try {
      const response = await HTTP_API().get('/api/shipment')
      console.log('responseDataListShipment', response)
      shipmentItemList.value = response?.data.results
    } catch (err) {
      console.error(err)
    }
  }

  const getFinanceData = async () => {
    try {
      const [expenseResponse, revenueResponse] = await Promise.all([
        HTTP_API().get(`/api/finance/expense`),
        HTTP_API().get(`/api/finance/revenue`),
      ])

      expenseData.value = expenseResponse?.data.results
      revenueData.value = revenueResponse?.data.results

      console.log('Revenue Data:', revenueResponse)
    } catch (err) {
      console.error('Error fetching finance data:', err)
    }
  }

  const getContainerTypeFromApi = async () => {
    try {
      const [portResponse, warehouseResponse, containerResponse] = await Promise.all([
        HTTP_API().get(`/api/storable/port`),
        HTTP_API().get(`/api/storable/warehouse`),
        HTTP_API().get(`/api/storable/container`),
      ])

      portItems.value = portResponse?.data.results
      warehouseItems.value = warehouseResponse?.data.results
      containerItems.value = containerResponse?.data.results
    } catch (err) {
      console.error(err)
    }
  }

  const deleteStorableItemToApi = async (opt: string, fieldModel: string) => {
    try {
      const payload = {
        id: opt,
        description: `The ${fieldModel} has been deleted from ${opt}`,
      }

      console.log('payload', payload)

      const { data } = await HTTP_API().delete(`/api/storable/${opt}`, {
        data: payload,
      })

      return data
    } catch (err) {
      console.error(err)
    }
  }

  return {
    expenseData,
    revenueData,
    containerData,
    warehouseItems,
    containerItems,
    portItems,
    shipmentData,
    shipmentItemList,
    updateShipmentToApi,
    getContainerTypeFromApi,
    createShipmentToApi,
    getShipmentToApi,
    getFinanceData,
    createFinanceToApi,
    createNewStorableToApi,
    deleteStorableItemToApi,
  }
})
