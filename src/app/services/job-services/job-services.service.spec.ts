import { TestBed } from '@angular/core/testing';

import { JobServicesService } from './job-services.service';

describe('JobServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobServicesService = TestBed.get(JobServicesService);
    expect(service).toBeTruthy();
  });
});
