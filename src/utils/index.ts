import type { ShipmentFieldTypes } from 'src/utils/static/types'

interface dummy {
  title: string
  content: string
  date: string
}

export const NavigationItems = [
  {
    label: 'Dashboard',
    separator: true,
    name: 'home.dashboard',
    icon: 'dashboard',
  },
  // {
  //   label: 'Shipments',
  //   separator: true,
  //   name: 'home.shipment-list',
  //   icon: 'local_shipping',
  // },
  // {
  //   label: 'Reports',
  //   separator: true,
  //   name: 'home.reports',
  //   icon: 'query_stats',
  // },
  // {
  //   label: 'Users',
  //   separator: true,
  //   icon: 'group_add',
  //   children: [
  //     { label: 'Add User', name: 'home.add-user', icon: 'person_add' },
  //     { label: 'Modify User', name: 'home.modify-user', icon: 'edit' },
  //   ],
  // },
]

export const dummyNotificationContent: dummy[] = [
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'hahaa',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'huhuhuhuhuhuhu',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 1212, 2024',
  },
]

export const CreateNewShipmentFields: ShipmentFieldTypes[] = [
  {
    label: 'Contract No.',
    model: 'contractNo',
    icon: 'description',
    type: 'text',
    col: '6',
    variant: 'information',
  },

  {
    label: 'Customer Name',
    model: 'customer',
    icon: 'people',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Ref No.',
    model: 'reference',
    icon: '123',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Bill of Landing No.',
    model: 'blno',
    icon: 'receipt_long',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Volume X',
    model: 'volumeX',
    icon: 'equalizer',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Volume Y',
    model: 'volumeY',
    icon: 'equalizer',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Shipping Line',
    model: 'shippingLine',
    icon: 'horizontal_rule',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Port',
    model: 'port',
    icon: 'flag',
    type: 'select',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Estimated Time of Arrival',
    model: 'estimatedTimeArrival',
    icon: 'flight_land',
    type: 'date',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Actual Time of Arrival',
    model: 'actualTimeArrival',
    icon: 'flight_takeoff',
    type: 'date',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Entry No.',
    model: 'entryNo',
    icon: 'description',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Registered No.',
    model: 'registryNo',
    icon: 'app_registration',
    col: '6',
    variant: 'information',
    type: 'text',
  },
  {
    label: 'Container No.',
    model: 'container',
    icon: 'pin',
    type: 'select',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Warehouse',
    model: 'warehouse',
    icon: 'warehouse',
    type: 'select',
    col: '6',
    variant: 'information',
  },

  {
    label: 'Shipment Expenses',
    model: 'expense',
    icon: 'savings',
    type: 'select',
    col: '6',
    variant: 'money',
  },
  {
    label: 'Shipment Revenue',
    model: 'revenue',
    icon: 'savings',
    type: 'select',
    col: '6',
    variant: 'money',
  },
]
