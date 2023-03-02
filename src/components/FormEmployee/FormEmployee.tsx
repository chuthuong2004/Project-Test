import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { useAppDispatch } from '../../app/hooks';
import { addEmployee, updateEmployee } from '../../features/employeeSlice';
import { IEmployee } from '../../models/employee.model';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import styles from './FormEmployee.module.scss';
const cx = classNames.bind(styles);
type Props = {
  action: 'add' | 'edit';
  employee?: IEmployee;
  isOpen: boolean;
  onClose?: () => void;
};
const initialValue: Omit<IEmployee, 'employeeId'> = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  phone: '',
  position: '',
  hourlyRate: 0,
  dateHired: '',
  state: '',
  zipCode: 0,
};
const FormEmployee: React.FC<Props> = ({
  isOpen,
  employee,
  action = 'add',
  onClose = () => {},
}) => {
  const dispatch = useAppDispatch();
  const [inputEmployee, setInputEmployee] = useState<Omit<IEmployee, 'employeeId'>>(initialValue);
  useEffect(() => {
    employee &&
      setInputEmployee({
        firstName: employee.firstName,
        lastName: employee.lastName,
        streetAddress: employee.streetAddress,
        city: employee.city,
        phone: employee.phone,
        position: employee.position,
        hourlyRate: employee.hourlyRate,
        dateHired: employee.dateHired,
        state: employee.state,
        zipCode: employee.zipCode,
      });
  }, [employee]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputEmployee((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    action === 'add'
      ? dispatch(addEmployee(inputEmployee))
      : dispatch(updateEmployee({ ...inputEmployee, employeeId: employee?.employeeId || 0 }));
    setInputEmployee(initialValue);
    onClose();
  };
  console.log(inputEmployee);

  return (
    <div className={cx('form-customer', !isOpen && 'closed')}>
      <h4>{action === 'add' ? 'Add New Employee' : 'Update Employee'}</h4>
      <div className={cx('icon-close')} onClick={() => onClose()}>
        <TfiClose />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={cx('form-control')}>
          <div className={cx('form-input')}>
            <Input
              label="First name"
              name="firstName"
              placeholder="Enter your first name"
              value={inputEmployee?.firstName}
              onChange={handleChangeInput}
            />
          </div>
          <div className={cx('form-input')}>
            <Input
              label="Last name"
              name="lastName"
              placeholder="Enter your last name"
              value={inputEmployee?.lastName}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <Input
          label="Street Address"
          name="streetAddress"
          placeholder="Enter your street address"
          value={inputEmployee?.streetAddress}
          onChange={handleChangeInput}
        />

        <div className={cx('form-control')}>
          <div className={cx('form-input')}>
            <Input
              label="City"
              name="city"
              placeholder="Enter your city"
              value={inputEmployee?.city}
              onChange={handleChangeInput}
            />
          </div>
          <div className={cx('form-input')}>
            <Input
              label="Phone"
              name="phone"
              placeholder="Enter your phone"
              value={inputEmployee?.phone}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <Select
          value={inputEmployee?.position}
          name="position"
          onChangeSelected={handleChangeInput}
          label="Position"
        >
          <option value={''}>Please select a position</option>
          <option value={'manager'}>Manager</option>
          <option value={'employee'}>Employee</option>
        </Select>
        <div className={cx('form-control')}>
          <div className={cx('form-input')}>
            <Input
              label="Hourly Rate"
              name="hourlyRate"
              type="number"
              placeholder="Enter your hourly rate"
              value={String(inputEmployee?.hourlyRate)}
              onChange={handleChangeInput}
            />
          </div>
          <div className={cx('form-input')}>
            <Input
              label="Date Hired"
              name="dateHired"
              type="date"
              placeholder="Enter date hired"
              value={inputEmployee?.dateHired}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className={cx('form-control')}>
          <div className={cx('form-input')}>
            <Input
              label="State"
              name="state"
              placeholder="Enter  state"
              value={inputEmployee?.state}
              onChange={handleChangeInput}
            />
          </div>
          <div className={cx('form-input')}>
            <Input
              label="Zipcode"
              name="zipCode"
              placeholder="Enter zipcode"
              value={String(inputEmployee?.zipCode)}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <Button className={cx('btn')} primary>
          {action === 'add' ? 'Add New Employee' : 'Update Employee'}
        </Button>
      </form>
    </div>
  );
};

export default FormEmployee;
