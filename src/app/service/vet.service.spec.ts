import { TestBed } from '@angular/core/testing';

import { VetService } from './vet.service';

describe('OwnerService', () => {
  let service: VetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
