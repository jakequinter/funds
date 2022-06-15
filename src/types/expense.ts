import { Category } from './category';

export type Expense = {
  id: string;
  categoryId: string;
  name: string;
  amount: number;
  createdAt: string;
  updatedAt: string;

  category: Category;
}