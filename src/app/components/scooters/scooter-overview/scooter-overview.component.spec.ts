import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterOverviewComponent } from './scooter-overview.component';

describe('ScooterOverviewComponent', () => {
  let component: ScooterOverviewComponent;
  let fixture: ComponentFixture<ScooterOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
