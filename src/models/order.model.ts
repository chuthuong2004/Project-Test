export interface IOrder {
  orderId: number;
  customerId: number | string;
  orderDate: string;
  shipDate: string;
  employeeId: number | string;
}
