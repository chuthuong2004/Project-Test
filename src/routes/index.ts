// Layouts

// Pages
import config from '../config';
import React, { ReactNode } from 'react';
import { Customer, Dashboard, Employee, Order } from '../pages';

type routeType = {
  path: string;
  component: React.FC<any>;
  layout?: React.FC<{ children: ReactNode }> | null;
};
const routes: Array<routeType> = [
  {
    path: config.routes.dashboard,
    component: Dashboard,
  },
  {
    path: config.routes.employee,
    component: Employee,
  },
  {
    path: config.routes.order,
    component: Order,
  },
  {
    path: config.routes.customer,
    component: Customer,
  },
];
export default routes;
