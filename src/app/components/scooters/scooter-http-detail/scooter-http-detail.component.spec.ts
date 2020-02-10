import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterHttpDetailComponent } from './scooter-http-detail.component';

describe('ScooterHttpDetailComponent', () => {
  let component: ScooterHttpDetailComponent;
  let fixture: ComponentFixture<ScooterHttpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterHttpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterHttpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
