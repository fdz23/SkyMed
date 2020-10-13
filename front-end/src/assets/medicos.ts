import { ParseSourceSpan } from '@angular/compiler';
import { Enderecos } from './enderecos';
import { Pacientes } from './Pacientes';

export interface Medicos {
  id: number;
  registro: string;
  endereco: Enderecos;
  pessoa: Pacientes;
}
