import { TestBed } from '@angular/core/testing';

import { BioImamServiceService } from './bio-imam-service.service';

describe('BioImamServiceService', () => {
  let service: BioImamServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioImamServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
