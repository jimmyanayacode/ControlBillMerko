import { Injectable } from '@angular/core';
import {
  Provider,
  ProviderRequestInterface,
  ProviderResponseInterface,
  ProvidersWithInvoiceDetails,
  ProvidersWithInvoiceResponseDetails,
} from '../../../domain/models/interfaces/provider';

@Injectable({
  providedIn: 'root',
})
export class ProviderMapperService {
  constructor() {}

  providerBackendResponse(
    providerFromBackend: ProviderResponseInterface
  ): Provider {
    return {
      _id: providerFromBackend._id,
      credit: providerFromBackend.creditAvalible,
      providerName: providerFromBackend.name,
      salemen: providerFromBackend.salemen,
      selfWithHolding: providerFromBackend.withHolding,
      timelyPaymentDiscont: providerFromBackend.timelyPaymentDiscont,
    };
  }

  providerAdapterDtoBackend(provider: Provider): ProviderRequestInterface {
    return {
      creditAvalible: provider.credit,
      name: provider.providerName,
      salemen: provider.salemen,
      timelyPaymentDiscont: provider.timelyPaymentDiscont,
      withHolding: provider.selfWithHolding,
    };
  }

  providersWithInvoiceDetails(
    providersWithInvoiceResponseDetails: ProvidersWithInvoiceResponseDetails
  ): ProvidersWithInvoiceDetails {
    return {
      balanceCount: providersWithInvoiceResponseDetails.balanceCount,
      name: providersWithInvoiceResponseDetails.name,
      shoppingValue: providersWithInvoiceResponseDetails.shoppingValue,
      totalCreditPending:
        providersWithInvoiceResponseDetails.totalCreditPending,
      totalPayValue: providersWithInvoiceResponseDetails.totalPayValue,
    };
  }
}
