import { Enderecos } from './enderecos';
import { Usuarios } from './usuarios';

export interface Pessoas {
    id?: number,
    nome: string;
    cpf: string;
    rg: string;
    endereco: Enderecos;
    telefone: string;
    usuario: Usuarios;
}
