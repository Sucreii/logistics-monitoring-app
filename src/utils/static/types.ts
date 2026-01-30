export type InputType =
  | 'number'
  | 'text'
  | 'textarea'
  | 'time'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'select'
  | 'selects';

export type FieldTypes = {
  label: string;
  model: string;
  icon: string;
  type: InputType;
  // col: number
};

export type ShipmentFieldTypes = {
  label: string;
  model: string;
  icon: string;
  type: InputType;
  col: string;
  variant: string;
  rules?: ((v: string | number | boolean | null | undefined) => boolean | string)[]; // Added rules
};

export type ShipmentExpensesFieldTypes = {
  label: string;
  model: string;
  icon: string;
  type: InputType;
  col: number;
  variant: string;
};

export type FormFilterTypes = {
  label: string;
  model: string;
  type: InputType;
};

export type ContainerType = [];

export type WarehouseType = [];

export type expensesType = {
  id: number;
  name: string;
  value: string;
}[];

export type revenueType = {
  id: number;
  name: string;
  value: string;
}[];

export type ShipmentListTypes = {
  contractNo?: string;
  reference?: string;
  blno?: string;
  volumeX?: number;
  volumeY?: number;
  shipping_line?: string;
  port?: string;
  estimatedTimeArrival?: string;
  actualTimeArrival?: string;
  entryNo?: string;
  registryNo?: string;
  container?: ContainerType[];
  warehouse?: WarehouseType;
  expenses?: expensesType;
  revenue?: revenueType;
};

export type ShipmentList = {
  id: string;
  contractNo?: string;
  reference?: string;
  customer?: string;
  blno?: string;
  volumeX?: number;
  volumeY?: number;
  shippingLine?: string;
  port?: string;
  estimatedTimeArrival?: string;
  actualTimeArrival?: string;
  entryNo?: string;
  registryNo?: string;
  container?: ContainerType[];
  warehouse?: WarehouseType;
  expenses?: expensesType;
  revenue?: revenueType;
  net?: number;
  issuedBy?: string;
  dateIssued?: string;
};

export type TableShipmentConstants = {
  id: string;
  blno?: string;
  contract_no?: string;
  entry_no?: string;
  reference?: string;
  registry_no?: string;
};

export type TableUsersConstants = {
  id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  last_logged_in?: string;
};

interface ShipmentExpense {
  id: number;
  name: string;
  value: number;
}

interface ShipmentRevenue {
  id: number;
  name: string;
  value: number;
}

export type FinanceListTypes = {
  shipmentExpense?: ShipmentExpense[];
  shipmentRevenue?: ShipmentRevenue[];
};

export type StorableFieldModel = 'warehouse' | 'container' | 'port' | 'expense' | 'revenue';

export type StorableValue = string;
