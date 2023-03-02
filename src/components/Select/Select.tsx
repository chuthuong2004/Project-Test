import React from 'react';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
const cx = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
  onChangeSelected?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  label?: string;
  value?: string | number;
};
const Select: React.FC<Props> = ({ value, label, name, children, onChangeSelected = () => {} }) => {
  return (
    <div className={cx('container')}>
      <label className={cx('label')} htmlFor="">
        {label}
      </label>
      <div className={cx('wrapper')}>
        <select
          name={name}
          onChange={onChangeSelected}
          value={value}
          className={cx('stored-addresses')}
          id=""
        >
          {children}
        </select>
        <div className={cx('arrow-down')}>
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
};

export default Select;
