import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCustomers } from '../../features/customerSlice';
import { addEmployee, selectEmployees, updateEmployee } from '../../features/employeeSlice';
import { addOrder, updateOrder } from '../../features/orderSlice';
import { TfiClose } from 'react-icons/tfi';
import { IEmployee } from '../../models/employee.model';
import { IOrder } from '../../models/order.model';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import styles from './FormOrder.module.scss';
const cx = classNames.bind(styles);
type Props = {
  action: 'add' | 'edit';
  order?: IOrder;
  isOpen: boolean;
  onClose?: () => void;
};
const initialValue: Omit<IOrder, 'orderId'> = {
  customerId: '',
  orderDate: '',
  shipDate: '',
  employeeId: '',
};
const FormOrder: React.FC<Props> = ({ isOpen, order, action = 'add', onClose = () => {} }) => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomers);
  const employees = useAppSelector(selectEmployees);
  const [inputOrder, setInputOrder] = useState<Omit<IOrder, 'orderId'>>(initialValue);
  useEffect(() => {
    order &&
      setInputOrder({
        customerId: order.customerId,
        orderDate: order.orderDate,
        shipDate: order.shipDate,
        employeeId: order.employeeId,
      });
  }, [order]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputOrder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    action === 'add'
      ? dispatch(addOrder(inputOrder))
      : dispatch(updateOrder({ ...inputOrder, orderId: order?.orderId || 0 }));
    setInputOrder(initialValue);
    onClose();
  };

  return (
    <div className={cx('form-customer', !isOpen && 'closed')}>
      <h4>{action === 'add' ? 'Add New Order' : 'Update Order'}</h4>
      <div className={cx('icon-close')} onClick={() => onClose()}>
        <TfiClose />
      </div>
      <form onSubmit={handleSubmit}>
        <Select
          value={String(inputOrder?.customerId)}
          name="customerId"
          onChangeSelected={handleChangeInput}
          label="Customer"
        >
          <option value={''}>Please choose customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName + ' ' + customer.lastName}
            </option>
          ))}
        </Select>
        <Input
          label="Order Date"
          name="orderDate"
          type="date"
          placeholder="Enter order date"
          value={inputOrder?.orderDate}
          onChange={handleChangeInput}
        />
        <Input
          label="Ship Date"
          name="shipDate"
          type="date"
          placeholder="Enter ship date"
          value={inputOrder?.shipDate}
          onChange={handleChangeInput}
        />
        <Select
          value={String(inputOrder?.employeeId)}
          name="employeeId"
          onChangeSelected={handleChangeInput}
          label="Employee"
        >
          <option value={''}>Please choose employee</option>
          {employees.map((employee) => (
            <option key={employee.employeeId} value={employee.employeeId}>
              {employee.firstName + ' ' + employee.lastName}
            </option>
          ))}
        </Select>

        <Button className={cx('btn')} primary>
          {action === 'add' ? 'Add New Order' : 'Update Order'}
        </Button>
      </form>
    </div>
  );
};

export default FormOrder;
