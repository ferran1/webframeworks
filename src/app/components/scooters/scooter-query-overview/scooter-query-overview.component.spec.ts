import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterQueryOverviewComponent } from './scooter-query-overview.component';

describe('ScooterQueryOverviewComponent', () => {
  let component: ScooterQueryOverviewComponent;
  let fixture: ComponentFixture<ScooterQueryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterQueryOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterQueryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
