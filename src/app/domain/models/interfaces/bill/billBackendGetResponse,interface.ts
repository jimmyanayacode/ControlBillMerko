export interface BillBackendResponse {
  __v: number;
  _id: string;
  availibleCredit: boolean;
  balance: number;
  dateInput: Date;
  numberBill: string;
  payBill: Date;
  payValue: number;
  provider: Provider;
  user: string;
  value: number;
}

interface Provider {
  _id: string;
  name: string;
}
