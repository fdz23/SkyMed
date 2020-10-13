import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicoComponent } from './list-medico.component';

describe('ListMedicoComponent', () => {
  let component: ListMedicoComponent;
  let fixture: ComponentFixture<ListMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
