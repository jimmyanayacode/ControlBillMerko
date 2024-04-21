import { Injectable } from '@angular/core';
import { Bill } from '../../../interfaces/bill/billI.interface';
import { BillMapperService } from '../mappers/bill/bill-mapper.service';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { BillRequestBackend } from '../../../interfaces/bill/billRequestBackend.interface';
import { BillFromBackend } from '../../../interfaces/bill/billFromBackend,interface';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor( private http: HttpClient, private billMapperService:BillMapperService) {}

  private readonly baseUrl:string = environment.baseUrl;

  createBill(billInfo:Bill){
    const formatDataBill = this.billMapperService.billToBillBackend(billInfo);
    const url = `${this.baseUrl}/bill`;
    const body = formatDataBill

    return this.http.post<BillRequestBackend>(url, body)
      .pipe(
        catchError( error => {
          console.error('Failed to create invoices:', error);
        return throwError(() => new Error('Failed to create invoice'));
        })
      )
  }

  getAllBills(){
    const url = `${ this.baseUrl }/bill`;
    return this.http.get<BillFromBackend[]>(url).pipe(
      map( resp => resp.map( bill => this.billMapperService.billBackendToBill(bill) )),
      catchError(error => {
        console.error('Error fetching all bills:', error);
        return throwError(() => new Error('Failed to get all bills'));
      })
    )
  }


}
