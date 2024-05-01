
export interface BillBackendGetResponse {
  _id:             string;
  numberBill:      string;
  provider:        Provider;
  user:            string;
  value:           number;
  availibleCredit: boolean;
  payValue:        number;
  dateInput:       Date;
  payBill:         Date;
  balance:         number;
  __v:             number;
}

interface Provider {
  _id:  string;
  name: string;
}

