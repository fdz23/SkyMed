import { Enderecos } from './enderecos';

export interface Pessoas {
    id?: number,
    nome: string;
    cpf: string;
    rg: string;
    endereco: Enderecos;
    telefone: string;
    email: string;
    senha: string;
    ehPaciente: boolean;
}