import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, FormEmployee, PopUp, SearchInput, Table } from '../../components';
import { removeEmployee, selectEmployees } from '../../features/employeeSlice';
import { useDebounce } from '../../hooks';
import { IEmployee } from '../../models/employee.model';
import { convertVie } from '../../utils';

import styles from './Employee.module.scss';
const cx = classNames.bind(styles);
const columns: { field: string; label: string }[] = [
  {
    field: 'employeeId',
    label: 'Employee ID',
  },
  {
    field: 'firstName',
    label: 'Full name',
  },
  {
    field: 'streetAddress',
    label: 'Street Address',
  },
  {
    field: 'city',
    label: 'City',
  },
  {
    field: 'state',
    label: 'State',
  },
  {
    field: 'zipCode',
    label: 'Zipcode',
  },
  {
    field: 'phone',
    label: 'Phone',
  },
  {
    field: 'position',
    label: 'Position',
  },
  {
    field: 'hourlyRate',
    label: 'Hourly Rate',
  },
  {
    field: 'dateHired',
    label: 'Date Hired',
  },
  {
    field: 'employeeId',
    label: 'Actions',
  },
];
const Employee = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees);
  const [editEmployee, setEditEmployee] = useState<IEmployee | undefined>(undefined);

  const [dataEmployees, setDataEmployees] = useState<IEmployee[]>(employees);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchInput, 500);
  const [openPopup, setOpenPopup] = useState({ add: false, edit: false });

  useEffect(() => {
    (() => {
      setLoading(true);
      const result = employees.filter((employee: IEmployee) => {
        const isValidEmployeeId = employee.employeeId
          .toString()
          .toLowerCase()
          .includes(debouncedValue.toLowerCase());
        const isValidFirstName = convertVie(employee.firstName.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidLastName = convertVie(employee.lastName.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidAddress = convertVie(employee.streetAddress.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidCity = convertVie(employee.city.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidState = convertVie(employee.state.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidPosition = convertVie(employee.position.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidPhone = convertVie(employee.phone.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidZipcode = employee.zipCode
          .toString()
          .toLowerCase()
          .includes(debouncedValue.toLowerCase());
        const isValidHourlyRate = employee.hourlyRate
          .toString()
          .toLowerCase()
          .includes(debouncedValue.toLowerCase());
        const isValidDateHired = convertVie(employee.dateHired.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        return (
          isValidEmployeeId ||
          isValidFirstName ||
          isValidLastName ||
          isValidAddress ||
          isValidCity ||
          isValidState ||
          isValidPosition ||
          isValidPhone ||
          isValidZipcode ||
          isValidHourlyRate ||
          isValidDateHired
        );
      });
      setTimeout(() => {
        setLoading(false);
        setDataEmployees(result);
      }, 500);
    })();
  }, [debouncedValue, employees]);
  useEffect(() => {
    setSearchInput('');
    setLoading(false);
  }, [employees]);

  useEffect(() => {
    !searchInput && setDataEmployees(employees);
  }, [searchInput, employees]);

  const handleDeleteEmployee = (id: number) => {
    dispatch(removeEmployee(id));
  };

  const handleClickEdit = (employee: IEmployee) => {
    setOpenPopup((prev) => ({ ...prev, edit: true }));

    setEditEmployee(employee);
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
                  onClick={() => setOpenPopup((prev) => ({ ...prev, add: !prev.edit }))}
                  primary
                >
                  Add New Employee
                </Button>
              </div>
            }
          >
            <FormEmployee
              action="add"
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
          <FormEmployee
            employee={editEmployee}
            action="edit"
            onClose={() => setOpenPopup((prev) => ({ ...prev, edit: false }))}
          />
        </PopUp>
        <Table columns={columns}>
          {dataEmployees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName + ' ' + employee.lastName}</td>
              <td>{employee.streetAddress}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>{employee.hourlyRate.toLocaleString()}đ</td>
              <td>{employee.dateHired}</td>
              <td className={cx('actions')}>
                <button onClick={() => handleClickEdit(employee)} className={cx('btn', 'edit')}>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.employeeId)}
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

export default Employee;
