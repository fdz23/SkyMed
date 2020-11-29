import { Medicos } from './medicos';
import { Pessoas } from './Pessoas';

export interface Hospitais {
    id: number;
    cnpj: string;
    razaoSocial: string;
    medicos: Medicos[];
    pessoa: Pessoas;
}
