import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, FormOrder, PopUp, SearchInput, Table } from '../../components';
import { selectCustomers } from '../../features/customerSlice';
import { selectEmployees } from '../../features/employeeSlice';
import { removeOrder, selectOrders } from '../../features/orderSlice';
import { useDebounce } from '../../hooks';
import { ICustomer } from '../../models/customer.model';
import { IEmployee } from '../../models/employee.model';
import { IOrder } from '../../models/order.model';
import { convertVie } from '../../utils';

import styles from './Order.module.scss';
const cx = classNames.bind(styles);
const columns: { field: string; label: string }[] = [
  {
    field: 'orderId',
    label: 'Order ID',
  },
  {
    field: 'customerId',
    label: 'Customer',
  },
  {
    field: 'orderDate',
    label: 'Order Date',
  },
  {
    field: 'shipDate',
    label: 'Ship Date',
  },
  {
    field: 'employeeId',
    label: 'Employee',
  },
  {
    field: 'orderId',
    label: 'Actions',
  },
];
const Order = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const customers = useAppSelector(selectCustomers);
  const employees = useAppSelector(selectEmployees);

  const [editOrder, setEditOrder] = useState<IOrder | undefined>(undefined);

  const [dataOrders, setDataOrders] = useState<IOrder[]>(orders);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchInput, 500);
  const [openPopup, setOpenPopup] = useState({ add: false, edit: false });

  useEffect(() => {
    (() => {
      setLoading(true);
      const result = orders.filter((order: IOrder) => {
        const customerByOrderId = customers.find(
          (customer: ICustomer) => customer.id === order.customerId,
        );
        const employeeByOrderId = employees.find(
          (employee: IEmployee) => employee.employeeId === order.employeeId,
        );
        const isValidOrderId = order.orderId
          .toString()
          .toLowerCase()
          .includes(debouncedValue.toLowerCase());

        const isValidOrderDate = convertVie(order.orderDate.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidShipDate = convertVie(order.shipDate.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        let isValidFirstNameCustomer,
          isValidLastNameCustomer,
          isValidFirstNameEmployee,
          isValidLastNameEmployee;
        if (customerByOrderId?.firstName) {
          isValidFirstNameCustomer = convertVie(
            customerByOrderId?.firstName.toLowerCase(),
          ).includes(convertVie(debouncedValue.toLowerCase()));
        }
        if (customerByOrderId?.lastName) {
          isValidLastNameCustomer = convertVie(customerByOrderId?.lastName.toLowerCase()).includes(
            convertVie(debouncedValue.toLowerCase()),
          );
        }
        if (employeeByOrderId?.firstName) {
          isValidFirstNameEmployee = convertVie(
            employeeByOrderId?.firstName.toLowerCase(),
          ).includes(convertVie(debouncedValue.toLowerCase()));
        }
        if (employeeByOrderId?.lastName) {
          isValidLastNameEmployee = convertVie(employeeByOrderId?.lastName.toLowerCase()).includes(
            convertVie(debouncedValue.toLowerCase()),
          );
        }

        return (
          isValidOrderId ||
          isValidOrderDate ||
          isValidShipDate ||
          isValidFirstNameCustomer ||
          isValidLastNameCustomer ||
          isValidFirstNameEmployee ||
          isValidLastNameEmployee
        );
      });
      setTimeout(() => {
        setLoading(false);
        setDataOrders(result);
      }, 500);
    })();
  }, [debouncedValue, orders, customers, employees]);
  useEffect(() => {
    setSearchInput('');
    setLoading(false);
  }, [orders]);

  useEffect(() => {
    !searchInput && setDataOrders(orders);
  }, [searchInput, orders]);

  const handleDeleteOrder = (id: number) => {
    dispatch(removeOrder(id));
  };
  const handleClickEdit = (order: IOrder) => {
    setOpenPopup((prev) => ({ ...prev, edit: true }));
    setEditOrder(order);
  };
  return (
    <div className={cx('container')}>
      <div className={cx('search')}>
        <SearchInput
          value={searchInput}
          loading={loading}
          onChange={(e) => setSearchInput(e.target.value)}
          handleClearInput={() => setSearchInput('')}
          placeholder="Enter keywords to search..."
        />
        <div className={cx('actions')}>
          <PopUp
            isOpen={openPopup.add}
            handleClose={() => setOpenPopup((prev) => ({ ...prev, add: false }))}
            position="center"
            trigger={
              <div className={cx('btn-add')}>
                <Button
                  onClick={() => setOpenPopup((prev) => ({ ...prev, add: !prev.add }))}
                  primary
                >
                  Add New Order
                </Button>
              </div>
            }
          >
            <FormOrder
              action="add"
              isOpen={openPopup.add}
              onClose={() => setOpenPopup((prev) => ({ ...prev, add: false }))}
            />
          </PopUp>
        </div>
      </div>
      <div className={cx('table')}>
        <PopUp
          isOpen={openPopup.edit}
          handleClose={() => setOpenPopup((prev) => ({ ...prev, edit: false }))}
          position="center"
          trigger={<></>}
        >
          <FormOrder
            order={editOrder}
            action="edit"
            isOpen={openPopup.edit}
            onClose={() => setOpenPopup((prev) => ({ ...prev, edit: false }))}
          />
        </PopUp>
        <Table columns={columns}>
          {dataOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>
                {customers.find((cust) => cust.id === Number(order.customerId))?.firstName +
                  ' ' +
                  customers.find((cust) => cust.id === Number(order.customerId))?.lastName}
              </td>
              <td>{order.orderDate}</td>
              <td>{order.shipDate}</td>
              <td>
                {employees.find((employee) => employee.employeeId === Number(order.employeeId))
                  ?.firstName +
                  ' ' +
                  employees.find((employee) => employee.employeeId === Number(order.employeeId))
                    ?.lastName}
              </td>
              <td>
                <button onClick={() => handleClickEdit(order)} className={cx('btn', 'edit')}>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.orderId)}
                  className={cx('btn', 'del')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Order;
