import { TestBed } from '@angular/core/testing';

import { ContributionBasesService } from './contributionBases.service';
import { ContributionBases } from 'src/app/models/contributionBases';

describe('contributionBasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContributionBasesService = TestBed.get(ContributionBases);
    expect(service).toBeTruthy();
  });
});
