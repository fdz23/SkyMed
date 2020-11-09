import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicoAgendamentoComponent } from './list-medico-agendamento.component';

describe('ListMedicoAgendamentoComponent', () => {
  let component: ListMedicoAgendamentoComponent;
  let fixture: ComponentFixture<ListMedicoAgendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedicoAgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
