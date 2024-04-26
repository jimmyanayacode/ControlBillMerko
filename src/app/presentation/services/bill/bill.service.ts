import { environment } from '../../../../environment/environments';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError, map, throwError } from 'rxjs';

import { BillMapperService } from '../mappers/bill/bill-mapper.service';

import { Bill, BillBackendGetResponse, BillBackendDto } from '../../../interfaces/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {


  private readonly baseUrl:string = environment.baseUrl;

  constructor( private http: HttpClient, private billMapperService:BillMapperService) {}

  createBill(billInfo:Bill){
    const formatDataBill = this.billMapperService.BillAdapterDtoBackend(billInfo);
    const url = `${this.baseUrl}/bill`;
    const body = formatDataBill

    return this.http.post<BillBackendDto>(url, body)
      .pipe(
        catchError( error => {
          console.error('Failed to create invoices:', error);
        return throwError(() => new Error('Failed to create invoice'));
        })
      )
  }

  getAllBills(){
    const url = `${this.baseUrl}/bill`;
    return this.http.get<BillBackendGetResponse[]>(url).pipe(
      map( resp => resp.map( bill => this.billMapperService.billBackendToBill(bill) )),
      catchError(error => {
        console.error('Error fetching all bills:', error);
        return throwError(() => new Error('Failed to get all bills'));
      })
    )
  }

  getByDateMonth(year:string, month:string){
    const url = `${ this.baseUrl }/bill/date/${year}/${month}`;
    return this.http.get(url)
  }


}
