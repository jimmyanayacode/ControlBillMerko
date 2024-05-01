import { environment } from '../../../../environment/environments';

import { Injectable, OnInit, computed, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';

import { BillMapperService } from '../mappers/bill/bill-mapper.service';

import {
  Bill,
  BillBackendGetResponse,
  BillBackendDto,
} from '../../../interfaces/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private readonly baseUrl: string = environment.baseUrl;

  private _billFindByControl = signal<Bill[]>([]);
  public currentBillFindByControl = computed(() => this._billFindByControl());


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
    return this.http.get<Bill[]>(url).pipe(
      map((bills) => {
        this._billFindByControl.set(bills);

        console.log(this.currentBillFindByControl())
      })
    );
  }
}
