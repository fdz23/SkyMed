import { TestBed } from '@angular/core/testing';
import { Especialidades } from 'src/assets/especialidades';

import { EspecialidadeService } from './especialidade.service';

describe('MedicoService', () => {
  let service: EspecialidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});