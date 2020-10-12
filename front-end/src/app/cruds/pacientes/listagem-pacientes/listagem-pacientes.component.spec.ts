import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPacientesComponent } from './listagem-pacientes.component';

describe('ListagemPacientesComponent', () => {
  let component: ListagemPacientesComponent;
  let fixture: ComponentFixture<ListagemPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
