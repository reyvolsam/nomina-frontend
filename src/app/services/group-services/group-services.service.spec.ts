import { TestBed } from '@angular/core/testing';

import { GroupServicesService } from './group-services.service';

describe('GroupServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupServicesService = TestBed.get(GroupServicesService);
    expect(service).toBeTruthy();
  });
});
