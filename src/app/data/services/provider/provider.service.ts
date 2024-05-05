import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environment/environments';

import {
  Provider,
  ProviderResponseInterface,
  ProvidersWithInvoiceDetails,
} from '../../../domain/models/interfaces/provider';

import { ProviderMapperService } from '../../mappers/provider/provider-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(
    private http: HttpClient,
    private mapperProvider: ProviderMapperService
  ) {}

  private readonly baseUrl: string = environment.baseUrl;

  createProvider(providerInfo: Provider) {
    const formatDataProvider =
      this.mapperProvider.providerAdapterDtoBackend(providerInfo);
    const url = `${this.baseUrl}/provider`;
    const body = formatDataProvider;

    return this.http.post<ProviderResponseInterface>(url, body).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        console.error('Failed to create provider:', error);
        return throwError(() => new Error('Failed to create provider'));
      })
    );
  }

  getAllProvidersInvoiceDetatils() {
    const url = `${this.baseUrl}/provider/info-invoices`;
    return this.http.get<ProvidersWithInvoiceDetails[]>(url).pipe(
      map((resp) =>
        resp.map((provider) =>
          this.mapperProvider.providersWithInvoiceDetails(provider)
        )
      ),
      catchError((error) => {
        console.error('Error fetching provider details:', error);
        return throwError(() => new Error('Failed to get all providers'));
      })
    );
  }

  getAllProviders() {
    const url = `${this.baseUrl}/provider`;
    return this.http.get<ProviderResponseInterface[]>(url).pipe(
      map((resp) =>
        resp.map((providers) =>
          this.mapperProvider.providerBackendResponse(providers)
        )
      ),
      catchError((error) => {
        console.error('Error fetching provider details:', error);
        return throwError(() => new Error('Failed to get all providers'));
      })
    );
  }
}
