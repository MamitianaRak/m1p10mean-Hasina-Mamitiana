import { TestBed } from '@angular/core/testing';

import { CustomhttpclientService } from './customhttpclient.service';

describe('CustomhttpclientService', () => {
  let service: CustomhttpclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomhttpclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
