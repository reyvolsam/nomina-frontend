import { TestBed } from '@angular/core/testing';

import { EmployeeTypesService } from './employee-types.service';

describe('EmployeeTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeTypesService = TestBed.get(EmployeeTypesService);
    expect(service).toBeTruthy();
  });
});
