import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHospitalComponent } from './create-hospital.component';

describe('CreateHospitalComponent', () => {
  let component: CreateHospitalComponent;
  let fixture: ComponentFixture<CreateHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
