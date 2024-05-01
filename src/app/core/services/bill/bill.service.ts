import { environment } from '../../../../environment/environments';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, catchError, map, throwError } from 'rxjs';

import { BillMapperService } from '../../../data/mappers/bill/bill-mapper.service';

import {
  Bill,
  BillBackendGetResponse,
  BillBackendDto,
} from '../../../models/interfaces/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private readonly baseUrl: string = environment.baseUrl;

  billFindByControl = new BehaviorSubject<Bill[]>([]);

  constructor(
    private http: HttpClient,
    private billMapperService: BillMapperService
  ) {}

  createBill(billInfo: Bill) {
    const formatDataBill =
      this.billMapperService.BillAdapterDtoBackend(billInfo);
    const url = `${this.baseUrl}/bill`;
    const body = formatDataBill;

    return this.http.post<BillBackendDto>(url, body).pipe(
      catchError((error) => {
        console.error('Failed to create invoices:', error);
        return throwError(() => new Error('Failed to create invoice'));
      })
    );
  }

  getAllBills() {
    const url = `${this.baseUrl}/bill`;
    return this.http.get<BillBackendGetResponse[]>(url).pipe(
      map((resp) =>
        resp.map((bill) => this.billMapperService.billBackendToBill(bill))
      ),
      catchError((error) => {
        console.error('Error fetching all bills:', error);
        return throwError(() => new Error('Failed to get all bills'));
      })
    );
  }

  getByDateMonth(year: string, month: string) {
    const url = `${this.baseUrl}/bill/date/${year}/${month}`;
    return this.http.get(url);
  }

  getByDateMonths(year: string, month: string[]) {
    const monthParam = month.join(',');
    console.log(monthParam);
    const url = `${this.baseUrl}/bill/dateMany/${year}/${monthParam}`;
    return this.http.get<BillBackendGetResponse[]>(url).pipe(
      map((resp) => {
        const bills = resp.map((bill) =>
          this.billMapperService.billBackendToBill(bill)
        );
        this.billFindByControl.next(bills);
      })
    );
  }
}
