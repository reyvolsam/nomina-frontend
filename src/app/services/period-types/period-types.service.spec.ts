import { TestBed } from '@angular/core/testing';

import { PeriodTypesService } from './period-types.service';

describe('PeriodTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodTypesService = TestBed.get(PeriodTypesService);
    expect(service).toBeTruthy();
  });
});
