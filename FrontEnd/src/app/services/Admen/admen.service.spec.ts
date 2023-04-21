import { TestBed } from '@angular/core/testing';

import { AdmenService } from './admen.service';

describe('GlobalService', () => {
  let service: AdmenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
