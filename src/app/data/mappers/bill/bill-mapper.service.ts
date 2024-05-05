import { Injectable } from '@angular/core';
import {
  Bill,
  BillBackendDto,
  BillBackendResponse,
} from '../../../domain/models/interfaces/bill';

@Injectable({
  providedIn: 'root',
})
export class BillMapperService {
  constructor() {}

  billBackendResponse(billFromBackend: BillBackendResponse): any {
    return {
      nameProvider: billFromBackend.provider.name,
      numberBill: billFromBackend.numberBill,
      value: billFromBackend.value,
      dateInput: billFromBackend.dateInput,
      balance: billFromBackend.balance,
    };
  }

  BillAdapterDtoBackend(bill: Bill): BillBackendDto {
    return {
      numberBill: bill.numberBill,
      provider: bill.provider,
      user: bill.user,
      value: bill.valueBill,
      availibleCredit: bill.credit,
      dateIn: bill.dateIn,
    };
  }
}
