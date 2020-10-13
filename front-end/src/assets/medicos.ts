import { Especialidades } from './especialidades';
import { Pessoas } from './Pessoas';

export interface Medicos {
  id: number;
  registro: string;
  especialidade: Especialidades[];
  pessoa: Pessoas;
}
