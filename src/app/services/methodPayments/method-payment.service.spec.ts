import { TestBed } from '@angular/core/testing';

import { MethodPaymentService } from './method-payment.service';

describe('MethodPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MethodPaymentService = TestBed.get(MethodPaymentService);
    expect(service).toBeTruthy();
  });
});
