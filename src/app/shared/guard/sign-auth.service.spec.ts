import { TestBed } from '@angular/core/testing';

import { SignAuthService } from './sign-auth.service';

describe('SignAuthService', () => {
  let service: SignAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
