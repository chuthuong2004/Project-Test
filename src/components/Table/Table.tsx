import React, { FC, ReactNode, useState } from 'react';
import classNames from 'classnames/bind';
import { FaSortAlphaDownAlt, FaSortDown } from 'react-icons/fa';
import styles from './Table.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { sortEmployeeByField } from '../../features/employeeSlice';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import { sortOrderByField } from '../../features/orderSlice';
import { sortCustomerByField } from '../../features/customerSlice';

const cx = classNames.bind(styles);

type Props = {
  columns: { field: string; label: string }[];
  children: ReactNode[];
};
const Table: FC<Props> = ({ columns, children }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [sortByField, setSortByField] = useState('');
  const handleSortByColumn = (field: string) => {
    field === sortByField ? setSortByField('') : setSortByField(field);
    pathname === config.routes.employee &&
      dispatch(
        sortEmployeeByField({
          field: field,
          orderBy: field === sortByField ? 'ASC' : 'DESC',
        }),
      );
    pathname === config.routes.order &&
      dispatch(
        sortOrderByField({
          field: field,
          orderBy: field === sortByField ? 'ASC' : 'DESC',
        }),
      );
    pathname === config.routes.customer &&
      dispatch(
        sortCustomerByField({
          field: field,
          orderBy: field === sortByField ? 'ASC' : 'DESC',
        }),
      );
  };
  // console.log(sortByField);

  return (
    <div className={cx('wrapper')}>
      <table className={cx('table-header')}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th onClick={() => handleSortByColumn(column.field)} key={index}>
                <div className={cx('table-cell')}>
                  {column.label}
                  <FaSortDown />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
          {children.length === 0 && (
            <tr>
              <td className={cx('error')} colSpan={columns.length + 1}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
