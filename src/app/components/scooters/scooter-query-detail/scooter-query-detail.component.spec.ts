import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterQueryDetailComponent } from './scooter-query-detail.component';

describe('ScooterQueryDetailComponent', () => {
  let component: ScooterQueryDetailComponent;
  let fixture: ComponentFixture<ScooterQueryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterQueryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterQueryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
