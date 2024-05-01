import { Injectable } from '@angular/core';
import { ProviderResponseInterface } from '../../../models/interfaces/provider/providerFromBackend.interface';
import { Provider } from '../../../models/interfaces/provider/provider.interface';
import { ProvidersWithInvoiceDetails } from '../../../models/interfaces/provider/providerDetailsInvoice.interface';
import { ProvidersWithInvoiceResponseDetails } from '../../../models/interfaces/provider/providerDetailsInvoiceFromBackend.interface';

@Injectable({
  providedIn: 'root',
})
export class ProviderMapperService {
  constructor() {}

  providerFromBackendToProvider(
    providerFromBackend: ProviderResponseInterface
  ): Provider {
    return {
      _id: providerFromBackend._id,
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
      totalCreditPending:
        providersWithInvoiceResponseDetails.totalCreditPending,
    };
  }
}
