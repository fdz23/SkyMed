import { Pessoas } from './pessoas';

export interface Usuarios {
    id: number;
    email: string;
    senha: string;
    ehAdmin: boolean;
    ehMedico: boolean;
    ehHospital: boolean;
    ehPaciente: boolean;
    ehAutenticado: boolean;
    tokenAutenticacao: string;
    tokenAutenticacaoEmail: string;
    tokenRedefinicaoSenha: string;
}
