import { Medicos } from './medicos';
import { Pacientes } from './Pacientes';

export interface Hospitais {
    id: number;
    cnpj: string;
    razao_social: string;
    medicos: Medicos[];
    pessoa: Pacientes;
}
