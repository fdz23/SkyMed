import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarConsultaComponent } from './agendar-consulta.component';

describe('AgendarConsultaComponent', () => {
  let component: AgendarConsultaComponent;
  let fixture: ComponentFixture<AgendarConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
