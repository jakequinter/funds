export type Expense = {
  id: string;
  categoryId: string;
  name: string;
  spend: number;
  type: string;
  color: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
}

type TimeStamp = {
  _seconds: number;
  _nanoseconds: number;
}