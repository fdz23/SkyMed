import { Enderecos } from './enderecos';

export interface Medicos {
  id: number;
  nome: string;
  cpf_cnpj: string;
  rg: string;
  tipoDeRegistro: string;
  registro: string;
  especialidade: string;
  endereco: Enderecos;
  telefone: string;
  email: string;
}
