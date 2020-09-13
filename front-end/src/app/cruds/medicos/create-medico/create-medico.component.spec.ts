import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicoComponent } from './create-medico.component';

describe('CreateMedicoComponent', () => {
  let component: CreateMedicoComponent;
  let fixture: ComponentFixture<CreateMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
