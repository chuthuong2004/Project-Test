import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { useAppDispatch } from '../../app/hooks';
import { addCustomer, updateCustomer } from '../../features/customerSlice';
import { ICustomer } from '../../models/customer.model';
import Button from '../Button';
import Input from '../Input';
import styles from './FormCustomer.module.scss';
const cx = classNames.bind(styles);
type Props = {
  action: 'add' | 'edit';
  customer?: ICustomer;
  isOpen: boolean;
  onClose?: () => void;
};
const initialValue: Omit<ICustomer, 'id'> = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  email: '',
  phone: '',
  state: '',
  zipcode: '',
};
const FormCustomer: React.FC<Props> = ({
  isOpen,
  customer,
  action = 'add',
  onClose = () => {},
}) => {
  const dispatch = useAppDispatch();

  const [errorsInput, setErrorsInput] = useState<Omit<ICustomer, 'id'>>(initialValue);
  const [inputCustomer, setInputCustomer] = useState<Omit<ICustomer, 'id'>>(initialValue);
  useEffect(() => {
    customer &&
      setInputCustomer({
        firstName: customer.firstName,
        lastName: customer.lastName,
        streetAddress: customer.streetAddress,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
        state: customer.state,
        zipcode: customer.zipcode,
      });
  }, [customer]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    action === 'add'
      ? dispatch(addCustomer(inputCustomer))
      : dispatch(updateCustomer({ ...inputCustomer, id: customer?.id || 0 }));
    setInputCustomer(initialValue);
    onClose();
  };
  const handleBlurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorsInput({
      ...errorsInput,
      [e.target.name]: e.target.value ? '' : 'Trường này là bắt buộc !',
    });
  };
  console.log(inputCustomer);

  return (
    <div className={cx('form-customer', !isOpen && 'closed')}>
      <h4>{action === 'add' ? 'Add New Customer' : 'Update Customer'}</h4>
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
              value={inputCustomer?.firstName}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              error={errorsInput}
            />
          </div>
          <div className={cx('form-input')}>
            <Input
              label="Last name"
              name="lastName"
              placeholder="Enter your last name"
              value={inputCustomer?.lastName}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              error={errorsInput}
            />
          </div>
        </div>
        <Input
          label="Address"
          name="streetAddress"
          placeholder="Enter your street address"
          value={inputCustomer?.streetAddress}
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
          error={errorsInput}
        />
        <Input
          label="City"
          name="city"
          placeholder="Enter your city"
          value={inputCustomer?.city}
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
          error={errorsInput}
        />
        <div className={cx('form-control')}>
          <div className={cx('form-input')}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={inputCustomer?.email}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              error={errorsInput}
            />
          </div>
          <div className={cx('form-input')}>
            <Input
              label="Phone"
              name="phone"
              placeholder="Enter your phone"
              value={inputCustomer?.phone}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              error={errorsInput}
            />
          </div>
        </div>
        <div className={cx('form-control')}>
          <div className={cx('form-input')}>
            <Input
              label="State"
              name="state"
              placeholder="Enter your state"
              value={inputCustomer?.state}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              error={errorsInput}
            />
          </div>
          <div className={cx('form-input')}>
            <Input
              label="Zipcode"
              name="zipcode"
              type="number"
              placeholder="Enter your zipcode"
              value={String(inputCustomer?.zipcode)}
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              error={errorsInput}
            />
          </div>
        </div>
        <Button className={cx('btn')} primary>
          {action === 'add' ? 'Add New Customer' : 'Update Customer'}
        </Button>
      </form>
    </div>
  );
};

export default FormCustomer;
