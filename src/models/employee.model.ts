export interface IEmployee {
  employeeId: number;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phone: string;
  position: 'manager' | 'employee' | string;
  hourlyRate: number;
  dateHired: string;
}
