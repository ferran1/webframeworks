import { TestBed } from '@angular/core/testing';

import { SpringScootersService } from './spring-scooters.service';

describe('SpringScootersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpringScootersService = TestBed.get(SpringScootersService);
    expect(service).toBeTruthy();
  });
});
