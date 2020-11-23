import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { Hospitais } from '../../../../assets/hospitais';
import { Usuarios } from '../../../../assets/usuarios';
import { Pessoas } from 'src/assets/Pessoas';
import { CepService } from 'src/app/servicos/cep.service';
import { HospitalService } from 'src/app/servicos/hospital.service';
import { MedicoService } from 'src/app/servicos/medico.service';

@Component({
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html'
})
export class CreateHospitalComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private cepService: CepService,
    private hospitalService: HospitalService,
    private medicoService: MedicoService)
    { }

  msgs: Message[] = [];

  razaoSocial: string;
  nome: string;
  cnpj: string;
  complemento: string;
  numero: string;
  cep: string;
  telefone: string;
  email: string;
  rg: string;
  cpf: string;
  ehMedico: boolean;
  ehAdmin: boolean;
  senha : string;
  usuario: Usuarios;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  criaUsuario(paciente: Pessoas): void{
    paciente.usuario.ehHospital = true;
    paciente.usuario.email = this.email;
  }

  insereHospital(hospital: Hospitais): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          hospital.pessoa.endereco = endereco;
          this.criaUsuario(hospital.pessoa);

          this.hospitalService.insereHospital(hospital)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Hospital cadastrado com sucesso!' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar hospital : ${error.error}` });
                return;
              }
            );
        },
        error => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: `Erro ao buscar endereço : ${error.error}` });
        }
      );
  }

  salvar(): void {

    if (this.nome == null || this.nome === ''
     || this.cnpj == null || this.cnpj === ''
     || this.complemento == null || this.complemento === ''
     || this.numero == null
     || this.cep == null || this.cep === ''
     || this.telefone == null || this.telefone === ''
     || this.razaoSocial == null || this.razaoSocial === ''
     || this.cpf == null || this.cpf === ''
     || this.rg == null || this.rg === ''
     || this.email == null || this.email === '')
     {
      return;
     }

    const usuarios = {
      ehAdmin: true,
      email: this.email,
      senha: this.senha
    } as Usuarios;

    const pessoaHospital = {
      nome: this.nome,
      telefone: this.telefone,
      cpf: this.cpf,
      rg: this.rg,
      usuario: usuarios,
     } as Pessoas;

    const hospital = {
      razao_social: this.razaoSocial,
      cnpj: this.cnpj,
      pessoa: pessoaHospital
    } as Hospitais;

    this.insereHospital(hospital);
  }

}
