import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../../../models/interfaces/provider/provider.interface';
import { ProviderResponseInterface } from '../../../models/interfaces/provider/providerFromBackend.interface';
import { catchError, map, throwError } from 'rxjs';
import { ProvidersWithInvoiceDetails } from '../../../models/interfaces/provider/providerDetailsInvoice.interface';
import { ProviderMapperService } from '../../../data/mappers/provider/provider-mapper.service';

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
      this.mapperProvider.providerToProviderBackend(providerInfo);
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
          this.mapperProvider.providerFromBackendToProvider(providers)
        )
      ),
      catchError((error) => {
        console.error('Error fetching provider details:', error);
        return throwError(() => new Error('Failed to get all providers'));
      })
    );
  }
}
