import { Medicos } from './medicos';
import { Pessoas } from './pessoas';

export interface Horarios {
    id: number;
    paciente: Pessoas;
    medico: Medicos;
    inicio: Date;
    fim: Date;
    data: string;
    periodo: string;
}
