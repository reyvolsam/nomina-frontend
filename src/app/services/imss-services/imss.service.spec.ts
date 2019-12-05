import { TestBed } from '@angular/core/testing';

import { ImssService } from './imss.service';

describe('ImssService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImssService = TestBed.get(ImssService);
    expect(service).toBeTruthy();
  });
});
