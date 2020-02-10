import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterSpringDetailComponent } from './scooter-spring-detail.component';

describe('ScooterSpringDetailComponent', () => {
  let component: ScooterSpringDetailComponent;
  let fixture: ComponentFixture<ScooterSpringDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterSpringDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterSpringDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
