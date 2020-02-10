import { TestBed } from '@angular/core/testing';

import { Scooters2Service } from './scooters2.service';

describe('Scooters2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Scooters2Service = TestBed.get(Scooters2Service);
    expect(service).toBeTruthy();
  });
});
