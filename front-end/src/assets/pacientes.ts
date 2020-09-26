import { Enderecos } from './enderecos';

export interface Pacientes {
    id: number,
    nome: string;
    cpf_cnpj: string;
    rg: string;
    endereco: Enderecos;
    telefone: string;
    email: string;
    senha: string;
    }
  