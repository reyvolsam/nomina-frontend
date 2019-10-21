import { TestBed } from '@angular/core/testing';

import { DiscountTypesService } from './discount-types.service';

describe('DiscountTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountTypesService = TestBed.get(DiscountTypesService);
    expect(service).toBeTruthy();
  });
});
