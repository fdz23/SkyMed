import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePacienteComponent } from './create-paciente.component';

describe('CreatePacienteComponent', () => {
  let component: CreatePacienteComponent;
  let fixture: ComponentFixture<CreatePacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
