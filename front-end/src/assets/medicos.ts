import { Especialidades } from './especialidades';
import { Pessoas } from './pessoas';
import { Horarios } from './horarios';
import { HorariosTrabalho } from './horariosTrabalho';
import { Hospitais } from './hospitais';

export interface Medicos {
  id: number;
  registro: string;
  especialidade: Especialidades;
  pessoa: Pessoas;
  horariosConsulta: Horarios[];
  horariosTrabalho: HorariosTrabalho[];
  hospital: Hospitais;
}
