import { TestBed } from '@angular/core/testing';

import { ScootersService } from './scooters.service';

describe('ScootersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScootersService = TestBed.get(ScootersService);
    expect(service).toBeTruthy();
  });
});
