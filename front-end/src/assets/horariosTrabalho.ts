import { Medicos } from './medicos';

export interface HorariosTrabalho {
    id: number;
    inicio: Date;
    fim: Date;
    diaDaSemana: number;
}
