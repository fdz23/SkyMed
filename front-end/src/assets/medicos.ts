import { ParseSourceSpan } from '@angular/compiler';
import { Enderecos } from './enderecos';
import { Especialidades } from './especialidades';
import { Pacientes } from './Pacientes';

export interface Medicos {
  id: number;
  registro: string;
  especialidades: Especialidades[];
  pessoa: Pacientes;
}
