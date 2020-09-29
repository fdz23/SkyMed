import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEspecialidadeComponent } from './create-especialidade.component';

describe('CreateEspecialidadeComponent', () => {
  let component: CreateEspecialidadeComponent;
  let fixture: ComponentFixture<CreateEspecialidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEspecialidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEspecialidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
