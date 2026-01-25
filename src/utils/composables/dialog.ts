import { useQuasar } from 'quasar'
import type { ShipmentList } from '../static/types'
import CreateOrdersComponent from 'src/components/modals/AddOrders.vue'
import CreateShipmentComponent from 'src/components/modals/AddShipment.vue'
import statusValidationModal from 'src/components/modals/StatusValidation.vue'
import createValidationModal from 'src/components/modals/AddValidation.vue'

export function useDocumentDialog() {
  const $q = useQuasar()

  const showDocumentDialog = () => {
    $q.dialog({
      component: CreateOrdersComponent,
    }).onOk((data) => {
      console.log('DINE', data)
    })
  }

  const showCreateShipmentDialog = () => {
    $q.dialog({
      component: CreateShipmentComponent,
    }).onOk((data) => {
      console.log('DINE shipment', data)
    })
  }

  const showStatusValidationDialog = (props: ShipmentList, status: unknown) => {
    $q.dialog({
      component: statusValidationModal,
      componentProps: {
        shipmentData: props,
        shipmentStatus: status,
      },
    }).onOk((data) => {
      console.log('DINE', data)
    })
    console.log('status', status)
  }

  const showCreateValidationDialog = () => {
    // console.log('PROPS', props)
    $q.dialog({
      component: createValidationModal,
    }).onOk((data) => {
      console.log('DINE', data)
    })
  }

  return {
    showDocumentDialog,
    showCreateShipmentDialog,
    showStatusValidationDialog,
    showCreateValidationDialog,
  }
}
