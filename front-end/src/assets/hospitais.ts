import { Medicos } from './medicos';
import { Pessoas } from './Pessoas';

export interface Hospitais {
    id: number;
    cnpj: string;
    razao_social: string;
    medicos: Medicos[];
    pessoa: Pessoas;
}
