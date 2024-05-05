export interface Bill {
  _id?: string;
  credit: boolean;
  dateIn: string;
  numberBill: string;
  provider: string;
  user: string;
  valueBill: number;
}
