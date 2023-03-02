import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../app/store';
import { IEmployee } from '../models/employee.model';
import { employees } from './../data';
const initialState: { employees: IEmployee[] } = { employees };
export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<IEmployee, 'employeeId'>>) => {
      const maxId = state.employees.reduce((accumulator, current) =>
        accumulator.employeeId > current.employeeId ? accumulator : current,
      ).employeeId;
      const newEmployee: IEmployee = {
        ...action.payload,
        zipCode: Number(action.payload.zipCode),
        hourlyRate: Number(action.payload.hourlyRate),
        employeeId: state.employees.length > 0 ? maxId + 1 : 1,
      };
      state.employees.push(newEmployee);
      toast.success('Successfully added new employee');
    },
    removeEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (employee) => employee.employeeId !== action.payload,
      );
      toast.warn('Deleted a employee successfully');
    },
    updateEmployee: (state, action: PayloadAction<IEmployee>) => {
      let indexEmployee = state.employees.findIndex(
        (employee) => employee.employeeId === action.payload.employeeId,
      );
      state.employees[indexEmployee] = {
        ...action.payload,
        zipCode: Number(action.payload.zipCode),
      };
      toast.info('Successfully updated employee information');
    },
    sortEmployeeByField: (state, action: PayloadAction<{ field: string; orderBy: string }>) => {
      const newList = [...state.employees].sort((employeeFirst, employeeSecond) => {
        const a = employeeFirst[action.payload.field as keyof typeof employeeFirst] as string;
        const b = employeeSecond[action.payload.field as keyof typeof employeeSecond] as string;
        if (action.payload.orderBy === 'ASC') return a > b ? 1 : -1;
        return a > b ? -1 : 1;
      });
      state.employees = newList;
    },
  },
});

export const selectEmployees = (state: RootState) => state.employee.employees;

export const { addEmployee, removeEmployee, updateEmployee, sortEmployeeByField } =
  employeeSlice.actions;
export default employeeSlice.reducer;
