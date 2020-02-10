import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterQueryDetailAformComponent } from './scooter-query-detail-aform.component';

describe('ScooterQueryDetailAformComponent', () => {
  let component: ScooterQueryDetailAformComponent;
  let fixture: ComponentFixture<ScooterQueryDetailAformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterQueryDetailAformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterQueryDetailAformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
