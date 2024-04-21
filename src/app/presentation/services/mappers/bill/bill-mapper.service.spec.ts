import { TestBed } from '@angular/core/testing';

import { BillMapperService } from './bill-mapper.service';

describe('BillMapperService', () => {
  let service: BillMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
