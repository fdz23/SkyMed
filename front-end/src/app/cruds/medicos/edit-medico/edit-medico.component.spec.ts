import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicoComponent } from './edit-medico.component';

describe('EditMedicoComponent', () => {
  let component: EditMedicoComponent;
  let fixture: ComponentFixture<EditMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
