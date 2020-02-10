import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterHttpOverviewComponent } from './scooter-http-overview.component';

describe('ScooterHttpOverviewComponent', () => {
  let component: ScooterHttpOverviewComponent;
  let fixture: ComponentFixture<ScooterHttpOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterHttpOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterHttpOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
