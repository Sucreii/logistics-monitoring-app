import type {
  ShipmentFieldTypes,
  TableShipmentConstants,
  TableUsersConstants,
} from 'src/utils/static/types';

interface dummy {
  title: string;
  content: string;
  date: string;
}

export const NavigationItems = [
  {
    label: 'Dashboard',
    separator: true,
    name: 'home.dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Shipments',
    separator: true,
    name: 'home.shipments',
    icon: 'directions_boat',
  },
  {
    label: 'Trips',
    separator: true,
    name: 'home.trips',
    icon: 'local_shipping',
  },
  // {
  //   label: 'Reports',
  //   separator: true,
  //   name: 'home.reports',
  //   icon: 'query_stats',
  // },
  {
    label: 'Users',
    separator: true,
    name: 'home.users',
    icon: 'manage_accounts',
  },
];

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
];

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
];

export const tableShipmentConstant: TableShipmentConstants[] = [
  {
    id: '007',
    blno: 'BL123456',
    contract_no: 'CN789012',
    entry_no: 'EN345678',
    reference: 'REF901234',
    registry_no: 'REG567890',
  },
  {
    id: '008',
    blno: 'BL234567',
    contract_no: 'CN890123',
    entry_no: 'EN456789',
    reference: 'REF012345',
    registry_no: 'REG678901',
  },
  {
    id: '009',
    blno: 'BL345678',
    contract_no: 'CN901234',
    entry_no: 'EN567890',
    reference: 'REF123456',
    registry_no: 'REG789012',
  },
];

export const tableUsersConstants: TableUsersConstants[] = [
  {
    id: '1',
    username: 'jdoe',
    first_name: 'John',
    last_name: 'Doe',
    password: '********',
    last_logged_in: '2024-12-01 10:00 AM',
  },
  {
    id: '2',
    username: 'asmith',
    first_name: 'Alice',
    last_name: 'Smith',
    password: '********',
    last_logged_in: '2024-12-02 11:30 AM',
  },
  {
    id: '3',
    username: 'bwilliams',
    first_name: 'Bob',
    last_name: 'Williams',
    password: '********',
    last_logged_in: '2024-12-03 09:15 AM',
  },
];
