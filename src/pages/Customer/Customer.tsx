import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeCustomer, selectCustomers } from '../../features/customerSlice';
import { ICustomer } from '../../models/customer.model';
import { Button, FormCustomer, PopUp, SearchInput, Table } from '../../components';
import * as XLSX from 'xlsx';
// @ts-ignore
import { saveAs } from 'file-saver';
import styles from './Customer.module.scss';
import { IoMdDownload } from 'react-icons/io';
import { useDebounce } from '../../hooks';
import { convertVie } from '../../utils';
const cx = classNames.bind(styles);

const columns: { field: string; label: string }[] = [
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'fullName',
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
    field: 'email',
    label: 'Email',
  },
  {
    field: 'phone',
    label: 'Phone',
  },
  {
    field: 'zipcode',
    label: 'Zipcode',
  },
  {
    field: 'id',
    label: 'Actions',
  },
];
const Customer = () => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomers);
  const [editCustomer, setEditCustomer] = useState<ICustomer | undefined>(undefined);

  const [dataCustomers, setDataCustomers] = useState<ICustomer[]>(customers);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchInput, 500);
  const [openPopup, setOpenPopup] = useState({ add: false, edit: false });

  useEffect(() => {
    (() => {
      setLoading(true);
      const result = customers.filter((customer: ICustomer) => {
        const isValidCustomerId = customer.id
          .toString()
          .toLowerCase()
          .includes(debouncedValue.toLowerCase());
        const isValidFirstName = convertVie(customer.firstName.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidLastName = convertVie(customer.lastName.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidAddress = convertVie(customer.streetAddress.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidCity = convertVie(customer.city.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidState = convertVie(customer.state.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidEmail = convertVie(customer.email.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidPhone = convertVie(customer.phone.toLowerCase()).includes(
          convertVie(debouncedValue.toLowerCase()),
        );
        const isValidZipcode = customer.zipcode
          .toString()
          .toLowerCase()
          .includes(debouncedValue.toLowerCase());
        return (
          isValidCustomerId ||
          isValidFirstName ||
          isValidLastName ||
          isValidAddress ||
          isValidCity ||
          isValidState ||
          isValidEmail ||
          isValidPhone ||
          isValidZipcode
        );
      });
      setTimeout(() => {
        setLoading(false);
        setDataCustomers(result);
      }, 500);
    })();
  }, [debouncedValue, customers]);
  useEffect(() => {
    setSearchInput('');
    setLoading(false);
  }, [customers]);

  useEffect(() => {
    !searchInput && setDataCustomers(customers);
  }, [searchInput, customers]);

  const handleClickEdit = (customer: ICustomer) => {
    setOpenPopup((prev) => ({ ...prev, edit: true }));
    setEditCustomer(customer);
  };

  const handleDeleteCustomer = (id: number) => {
    dispatch(removeCustomer(id));
  };

  const exportToCSV = (csvData: ICustomer[], fileName: string) => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
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
                  Add New Customer
                </Button>
              </div>
            }
          >
            <FormCustomer
              action="add"
              isOpen={openPopup.add}
              onClose={() => setOpenPopup((prev) => ({ ...prev, add: false }))}
            />
          </PopUp>

          <div className={cx('btn-export')}>
            <Button
              onClick={() => exportToCSV(customers, 'customers')}
              primary
              leftIcon={<IoMdDownload size={14} />}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className={cx('table')}>
        <PopUp
          isOpen={openPopup.edit}
          handleClose={() => setOpenPopup((prev) => ({ ...prev, edit: false }))}
          position="center"
          trigger={<></>}
        >
          <FormCustomer
            customer={editCustomer}
            isOpen={openPopup.edit}
            action="edit"
            onClose={() => setOpenPopup((prev) => ({ ...prev, edit: false }))}
          />
        </PopUp>
        <Table columns={columns}>
          {dataCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName + ' ' + customer.lastName}</td>
              <td>{customer.streetAddress}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.zipcode}</td>
              <td>
                <button onClick={() => handleClickEdit(customer)} className={cx('btn', 'edit')}>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
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

export default Customer;
