import { TestBed } from '@angular/core/testing';

import { ProviderMapperService } from './provider-mapper.service';

describe('ProviderMapperService', () => {
  let service: ProviderMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
