import { ref } from 'vue';
import { defineStore } from 'pinia';
import { HTTP_API } from 'src/boot/axios';
import { apolloClient } from 'src/boot/apollo';
import type { ShipmentListTypes, FinanceListTypes, ShipmentList } from 'src/utils/static/types';
import gql from 'graphql-tag';

interface Shipment {
  id: string;
  blno: string;
  contract_no: string;
  entry_no: string;
  reference: string;
  registry_no: string;
}

interface Users {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  last_logged_in: string;
}

const GET_PAGINATED_SHIPMENTS = gql`
  query GetPaginated($skip: Int!, $take: Int!) {
    shipments(skip: $skip, take: $take) {
      totalCount
      hasMore
      items {
        id
        blno
        contract_no
        entry_no
        reference
        registry_no
      }
    }
  }
`;

const GET_PAGINATED_USERS = gql`
  query GetPaginated($skip: Int!, $take: Int!) {
    user(skip: $skip, take: $take) {
      totalCount
      hasMore
      items {
        id
        username
        password
        first_name
        middle_name
        last_name
        last_logged_in
      }
    }
  }
`;

export const useShipmentStore = defineStore('shipmentStore', () => {
  interface ContainerItem {
    id: number;
    name: string;
  }

  interface shipmentDataTypes {
    id: number;
    name: string;
    value: number;
  }

  interface shipmentIdType {
    id: number;
  }

  const expenseData = ref<string[]>([]);
  const revenueData = ref<string[]>([]);
  const portItems = ref<string[]>([]);
  const warehouseItems = ref<string[]>([]);
  const containerItems = ref<string[]>([]);
  const containerData = ref<ContainerItem[]>([]);
  const shipmentExpense = ref<shipmentDataTypes[]>([]);
  const shipmentRevenue = ref<shipmentDataTypes[]>([]);
  const shipmentId = ref<shipmentDataTypes[]>([]);
  const shipmentData = ref<{
    shipmentExpense: shipmentDataTypes[];
    shipmentRevenue: shipmentDataTypes[];
    shipmentId: shipmentIdType[];
  } | null>(null);
  const shipmentItemList = ref<ShipmentList[]>([]);

  const createShipmentToApi = async (payload: ShipmentListTypes) => {
    console.log(payload);
    try {
      const { data } = await HTTP_API().post('/api/shipment', payload);
      console.log('data sa store', data);
      shipmentExpense.value = data.results.expenses;
      shipmentRevenue.value = data.results.revenue;
      shipmentId.value = data.results.id;

      shipmentData.value = {
        shipmentExpense: shipmentExpense.value,
        shipmentRevenue: shipmentRevenue.value,
        shipmentId: shipmentId.value,
      };

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const createFinanceToApi = async (payload: FinanceListTypes, shipId: string) => {
    const payloadExpenses = {
      finance: payload.shipmentExpense?.map((expense) => ({
        id: expense.id,
        name: expense.name,
        value: expense.value,
      })),
    };

    const payloadRevenue = {
      finance: payload.shipmentRevenue?.map((rev) => ({
        id: rev.id,
        name: rev.name,
        value: rev.value,
      })),
    };

    console.log('payloadExpenses', payloadExpenses);
    console.log('payloadRevenue', payloadRevenue);
    console.log('shipId', shipId);

    try {
      const response = await Promise.all([
        HTTP_API().put(`/api/shipment/${shipId}/expense`, payloadExpenses),
        HTTP_API().put(`/api/shipment/${shipId}/revenue`, payloadRevenue),
      ]);
      return response; // Return the response
    } catch (err) {
      console.error(err);
      throw err; // Re-throw for proper async handling
    }
  };

  const createNewStorableToApi = async (fieldModel: string, val: string) => {
    try {
      const payload = {
        id: val,
        description: `${val} To ${fieldModel}`,
      };

      const { data } = await HTTP_API().post(`/api/storable/${fieldModel}`, payload);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const updateShipmentToApi = async (payload: ShipmentList) => {
    console.log('payload-update', payload);
    try {
      const { data } = await HTTP_API().put(`/api/shipment/${payload.id}`, payload);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // const getShipmentToApi = async () => {
  //   try {
  //     const response = await HTTP_API().get('/api/shipment')
  //     console.log('responseDataListShipment', response)
  //     shipmentItemList.value = response?.data.results
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const getFinanceData = async () => {
    try {
      const [expenseResponse, revenueResponse] = await Promise.all([
        HTTP_API().get(`/api/finance/expense`),
        HTTP_API().get(`/api/finance/revenue`),
      ]);

      expenseData.value = expenseResponse?.data.results;
      revenueData.value = revenueResponse?.data.results;

      console.log('Revenue Data:', revenueResponse);
    } catch (err) {
      console.error('Error fetching finance data:', err);
    }
  };

  const getContainerTypeFromApi = async () => {
    try {
      const [portResponse, warehouseResponse, containerResponse] = await Promise.all([
        HTTP_API().get(`/api/storable/port`),
        HTTP_API().get(`/api/storable/warehouse`),
        HTTP_API().get(`/api/storable/container`),
      ]);

      portItems.value = portResponse?.data.results;
      warehouseItems.value = warehouseResponse?.data.results;
      containerItems.value = containerResponse?.data.results;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStorableItemToApi = async (opt: string, fieldModel: string) => {
    try {
      const payload = {
        id: opt,
        description: `The ${fieldModel} has been deleted from ${opt}`,
      };

      console.log('payload', payload);

      const { data } = await HTTP_API().delete(`/api/storable/${opt}`, {
        data: payload,
      });

      return data;
    } catch (err) {
      console.error(err);
    }
  };

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
    // getShipmentToApi,
    getFinanceData,
    createFinanceToApi,
    createNewStorableToApi,
    deleteStorableItemToApi,
  };
});

export const getAllShipment = defineStore('shipment', {
  state: () => ({
    shipments: [] as Shipment[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 10,
  }),

  actions: {
    async updateRowsPerPage(newLimit: number) {
      this.take = newLimit;
      this.skip = 0;
      await this.fetchShipments(false);
    },

    async fetchShipments(isLoadMore = false) {
      this.loading = true;
      try {
        const response = await apolloClient.query({
          query: GET_PAGINATED_SHIPMENTS,
          variables: {
            skip: this.skip,
            take: this.take,
          },
          fetchPolicy: 'network-only',
        });

        console.log('I AM GRAPHQL SHIPMENTS RESPONSE: ', response.data);
        const data = response.data?.shipments;
        const incomingItems = data?.items ?? [];

        if (isLoadMore) {
          this.shipments.push(...incomingItems);
        } else {
          this.shipments = incomingItems;
        }

        this.totalCount = data?.totalCount ?? 0;
        this.hasMore = data?.hasMore ?? false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export const getAllUsers = defineStore('users', {
  state: () => ({
    user: [] as Users[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 10,
  }),

  actions: {
    async updateRowsPerPage(newLimit: number) {
      this.take = newLimit;
      this.skip = 0;
      await this.fetchUsers(false);
    },

    async fetchUsers(isLoadMore = false) {
      this.loading = true;
      try {
        const response = await apolloClient.query({
          query: GET_PAGINATED_USERS,
          variables: {
            skip: this.skip,
            take: this.take,
          },
          fetchPolicy: 'network-only',
        });

        console.log('I AM GRAPHQL USERS RESPONSE: ', response.data);
        const data = response.data?.user;
        const incomingItems = data?.items ?? [];

        if (isLoadMore) {
          this.user.push(...incomingItems);
        } else {
          this.user = incomingItems;
        }

        this.totalCount = data?.totalCount ?? 0;
        this.hasMore = data?.hasMore ?? false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async goToPage(page: number) {
      this.skip = (page - 1) * this.take;
      await this.fetchUsers();
    },
  },
});
