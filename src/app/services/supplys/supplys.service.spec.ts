import { TestBed, inject } from '@angular/core/testing';

import { SupplysService } from './supplys.service';

describe('SupplysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplysService]
    });
  });

  it('should be created', inject([SupplysService], (service: SupplysService) => {
    expect(service).toBeTruthy();
  }));
});
