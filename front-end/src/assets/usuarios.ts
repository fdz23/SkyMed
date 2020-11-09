import { Pessoas } from './pessoas';

export interface Usuarios {
    id: number;
    email: string;
    senha: string;
    pessoa: Pessoas;
    ehAdmin: boolean;
    ehMedico: boolean;
}
