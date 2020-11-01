import { Especialidades } from './especialidades';
import { Pessoas } from './Pessoas';
import { Horarios } from './Horarios';

export interface Medicos {
  id: number;
  registro: string;
  especialidade: Especialidades;
  pessoa: Pessoas;
  horarios: Horarios[];
}
