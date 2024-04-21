import { Injectable } from '@angular/core';
import { BillRequestBackend } from '../../../../interfaces/bill/billRequestBackend.interface';
import { Bill } from '../../../../interfaces/bill/billI.interface';
import { BillFromBackend } from '../../../../interfaces/bill/billFromBackend,interface';

@Injectable({
  providedIn: 'root'
})
export class BillMapperService {

  constructor() { }

  billBackendToBill(billFromBackend: BillFromBackend): any {
    return {
      nameProvider: billFromBackend.provider.name,
      numberBill: billFromBackend.numberBill,
      value:  billFromBackend.value,
      dateInput: billFromBackend.dateInput,
      balance: billFromBackend.balance
    }
  }

  billToBillBackend(bill: Bill): BillRequestBackend {
    console.log(bill)
    return {
      numberBill: bill.numberBill,
      provider: bill.provider,
      user: bill.user,
      value: bill.valueBill,
      availibleCredit: bill.credit,
      dateIn: bill.dateIn
    }
  }

}
