import { Pessoas } from './pessoas';

export interface Usuarios {
    id: number;
    email: string;
    senha: string;
    ehAdmin: boolean;
    ehMedico: boolean;
    ehHospital: boolean;
    ehPaciente: boolean;
    token_autenticacao: string;
    token_redefinicao: string;
}
