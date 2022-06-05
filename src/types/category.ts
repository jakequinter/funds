import { Expense } from './expense';

export type Category = {
  id: string;
  name: string;
  color: string;
  target: number;
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
}