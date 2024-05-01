 export interface ProviderResponseInterface {
  name:                 string;
  creditAvalible:       boolean;
  withHolding:          boolean;
  timelyPaymentDiscont: boolean;
  salemen:              string;
  statusProvider?:       boolean;
  _id?:                  string;
  __v?:                  number;
}

