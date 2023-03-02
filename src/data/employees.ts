import { IEmployee } from '../models/employee.model';

const employees: IEmployee[] = [
  {
    firstName: 'Đào',
    lastName: 'Văn Thương',
    streetAddress: '25 D2',
    city: 'Thành phố Thủ Đức',
    phone: '0932445664',
    position: 'manager',
    hourlyRate: 2000000,
    dateHired: '2023-02-01',
    state: 'HCM',
    zipCode: 719054,
    employeeId: 1,
  },
  {
    firstName: 'Nguyễn',
    lastName: 'Thị Hiếu',
    streetAddress: '60 Lê Thị Hoa',
    city: 'Thành phố Thủ Đức',
    phone: '0354441341',
    position: 'employee',
    hourlyRate: 50000,
    dateHired: '2023-01-06',
    state: 'Tp. Hồ Chí Minh',
    zipCode: 720770,
    employeeId: 2,
  },
  {
    firstName: 'Nguyễn',
    lastName: 'Quốc Chu',
    streetAddress: '4/5/6 đường số 10',
    city: 'Thành phố Thủ Đức',
    phone: '0921775630',
    position: 'employee',
    hourlyRate: 50000,
    dateHired: '2023-02-27',
    state: 'Tp. Hồ Chí Minh',
    zipCode: 720770,
    employeeId: 3,
  },
];

export default employees;
