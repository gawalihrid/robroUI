import { TestBed } from '@angular/core/testing';

import { CustomAuthGuardGuard } from './custom-auth-guard.guard';

describe('CustomAuthGuardGuard', () => {
  let guard: CustomAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
