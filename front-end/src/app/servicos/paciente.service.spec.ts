import { TestBed } from '@angular/core/testing';

import { PessoaService } from './pessoa.service';

describe('PacienteService', () => {
  let service: PessoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
