import { IOrder } from '../models/order.model';

const orders: IOrder[] = [
  { customerId: 4, orderDate: '2023-02-27', shipDate: '2023-03-02', employeeId: 1, orderId: 1 },
  { customerId: 3, orderDate: '2023-03-01', shipDate: '2023-03-04', employeeId: 3, orderId: 2 },
  { customerId: 2, orderDate: '2023-03-01', shipDate: '2023-03-05', employeeId: 1, orderId: 3 },
  { customerId: 1, orderDate: '2023-03-03', shipDate: '2023-03-07', employeeId: 2, orderId: 4 },
  { customerId: 5, orderDate: '2023-03-01', shipDate: '2023-03-06', employeeId: 2, orderId: 5 },
];
export default orders;
