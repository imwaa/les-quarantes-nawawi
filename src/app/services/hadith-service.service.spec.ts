import { TestBed } from '@angular/core/testing';

import { HadithServiceService } from './hadith-service.service';

describe('HadithServiceService', () => {
  let service: HadithServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HadithServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
