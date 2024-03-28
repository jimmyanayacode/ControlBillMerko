import { TestBed } from '@angular/core/testing';

import { StatusAuthService } from './status-auth.service';

describe('StatusAuthService', () => {
  let service: StatusAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
