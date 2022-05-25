import { Expense } from './expense';

export type Category = {
  id: string;
  userId: string;
  name: string;
  color: string;
  target: number;
  expenses: Expense[];
  createdAt: Date;
  updatedAt: Date;
}