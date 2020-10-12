import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteListarComponent } from './paciente-listar.component';

describe('ListagemPacientesComponent', () => {
  let component: PacienteListarComponent;
  let fixture: ComponentFixture<PacienteListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
