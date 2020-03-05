import { TestBed } from '@angular/core/testing';

import { ObjectNameMatchService } from './object-name-match.service';

describe('ObjectNameMatchService', () => {
  let service: ObjectNameMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectNameMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
