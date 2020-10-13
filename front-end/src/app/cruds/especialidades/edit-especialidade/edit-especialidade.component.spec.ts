import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEspecialidadeComponent } from './edit-especialidade.component';

describe('EditEspecialidadeComponent', () => {
  let component: EditEspecialidadeComponent;
  let fixture: ComponentFixture<EditEspecialidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEspecialidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEspecialidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
