import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacaoEmailComponent } from './verificacao-email.component';

describe('VerificacaoEmailComponent', () => {
  let component: VerificacaoEmailComponent;
  let fixture: ComponentFixture<VerificacaoEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificacaoEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacaoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
