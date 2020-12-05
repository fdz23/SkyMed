import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultasComponent } from './list-consultas.component';

describe('ListConsultasComponent', () => {
  let component: ListConsultasComponent;
  let fixture: ComponentFixture<ListConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
