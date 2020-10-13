import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEspecialidadeComponent } from './list-especialidade.component';

describe('ListEspecialidadeComponent', () => {
  let component: ListEspecialidadeComponent;
  let fixture: ComponentFixture<ListEspecialidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEspecialidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEspecialidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
