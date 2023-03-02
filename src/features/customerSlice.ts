import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../app/store';
import { customers } from '../data';
import { ICustomer } from '../models/customer.model';
const initialState: { customers: ICustomer[] } = { customers };
export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Omit<ICustomer, 'id'>>) => {
      const maxId = state.customers.reduce((accumulator, current) =>
        accumulator.id > current.id ? accumulator : current,
      ).id;
      const newCustomer: ICustomer = {
        ...action.payload,
        id: state.customers.length > 0 ? maxId + 1 : 1,
      };
      state.customers.push(newCustomer);
      toast.success('Successfully added new customer');
    },
    removeCustomer: (state, action: PayloadAction<number>) => {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload);
      toast.warn('Deleted a customer successfully');
    },
    updateCustomer: (state, action: PayloadAction<ICustomer>) => {
      let indexCust = state.customers.findIndex((customer) => customer.id === action.payload.id);
      state.customers[indexCust] = action.payload;
      toast.info('Successfully updated customer information');
    },
    sortCustomerByField: (state, action: PayloadAction<{ field: string; orderBy: string }>) => {
      const newList = [...state.customers].sort((customerFirst, customerSecond) => {
        const a = customerFirst[action.payload.field as keyof typeof customerFirst] as string;
        const b = customerSecond[action.payload.field as keyof typeof customerSecond] as string;
        if (action.payload.orderBy === 'ASC') return a > b ? 1 : -1;
        return a > b ? -1 : 1;
      });
      state.customers = newList;
    },
  },
});

export const selectCustomers = (state: RootState) => state.customer.customers;

export const { addCustomer, removeCustomer, updateCustomer, sortCustomerByField } =
  customerSlice.actions;
export default customerSlice.reducer;
