import { ProvidersWithInvoiceDetails } from './../../../interfaces/provider/providerDetailsInvoice.interface';
import { Injectable } from '@angular/core';
import { Provider } from '../../../interfaces/provider/provider.interface';
import { ProviderResponseInterface } from '../../../interfaces/provider/providerFromBackend.interface';
import { ProvidersWithInvoiceResponseDetails } from '../../../interfaces/provider/providerDetailsInvoiceFromBackend.interface';

@Injectable({
  providedIn: 'root',
})
export class ProviderMapperService {
  constructor() {}

  providerBackendToProvider(
    providerFromBackend: ProviderResponseInterface
  ): Provider {
    return {
      providerName: providerFromBackend.name,
      credit: providerFromBackend.creditAvalible,
      selfWithHolding: providerFromBackend.withHolding,
      timelyPaymentDiscont: providerFromBackend.timelyPaymentDiscont,
      salemen: providerFromBackend.salemen,
    };
  }

  providerToProviderBackend(provider: Provider): ProviderResponseInterface {
    return {
      name: provider.providerName,
      creditAvalible: provider.credit,
      withHolding: provider.selfWithHolding,
      timelyPaymentDiscont: provider.timelyPaymentDiscont,
      salemen: provider.salemen,
    };
  }

  providersWithInvoiceDetails(
    providersWithInvoiceResponseDetails: ProvidersWithInvoiceResponseDetails
  ): ProvidersWithInvoiceDetails {
    return {
      name: providersWithInvoiceResponseDetails.name,
      shoppingValue: providersWithInvoiceResponseDetails.shoppingValue,
      balanceCount: providersWithInvoiceResponseDetails.balanceCount,
      totalPayValue: providersWithInvoiceResponseDetails.totalPayValue,
      totalCreditPending: providersWithInvoiceResponseDetails.totalCreditPending
    };
  }
}
