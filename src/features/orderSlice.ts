import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../app/store';
import { IOrder } from '../models/order.model';
import { orders } from '../data';
const initialState: { orders: IOrder[] } = {
  orders: orders,
};
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<IOrder, 'orderId'>>) => {
      const maxId = state.orders.reduce((accumulator, current) =>
        accumulator.orderId > current.orderId ? accumulator : current,
      ).orderId;
      const newOrder: IOrder = {
        ...action.payload,
        customerId: Number(action.payload.customerId),
        employeeId: Number(action.payload.employeeId),
        orderId: state.orders.length > 0 ? maxId + 1 : 1,
      };
      state.orders.push(newOrder);
      toast.success('Successfully added new order');
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((order) => order.orderId !== action.payload);
      toast.warn('Deleted a order successfully');
    },
    updateOrder: (state, action: PayloadAction<IOrder>) => {
      let indexOrder = state.orders.findIndex((order) => order.orderId === action.payload.orderId);
      state.orders[indexOrder] = action.payload;
      toast.info('Successfully updated order information');
    },
    sortOrderByField: (state, action: PayloadAction<{ field: string; orderBy: string }>) => {
      const newList = [...state.orders].sort((orderFirst, orderSecond) => {
        const a = orderFirst[action.payload.field as keyof typeof orderFirst] as string;
        const b = orderSecond[action.payload.field as keyof typeof orderSecond] as string;
        if (action.payload.orderBy === 'ASC') return a > b ? -1 : 1;
        return a > b ? 1 : -1;
      });
      state.orders = newList;
    },
  },
});

export const selectOrders = (state: RootState) => state.order.orders;

export const { addOrder, removeOrder, updateOrder, sortOrderByField } = orderSlice.actions;

export default orderSlice.reducer;
