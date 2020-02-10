import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterSpringOverviewComponent } from './scooter-spring-overview.component';

describe('ScooterSpringOverviewComponent', () => {
  let component: ScooterSpringOverviewComponent;
  let fixture: ComponentFixture<ScooterSpringOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterSpringOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterSpringOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
