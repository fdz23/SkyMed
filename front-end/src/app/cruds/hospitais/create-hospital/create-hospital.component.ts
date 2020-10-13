import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { Hospitais } from '../../../../assets/hospitais';
import { Pacientes } from 'src/assets/Pacientes';
import { CepService } from 'src/app/servicos/cep.service';
import { HospitalService } from 'src/app/servicos/hospital.service';
import { Medicos } from 'src/assets/medicos';
import { MedicoService } from 'src/app/servicos/medico.service';

@Component({
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html'
})
export class CreateHospitalComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private cepService: CepService, private hospitalService: HospitalService, private medicoService: MedicoService) { }

  msgs: Message[] = [];
  medico: Medicos[];
  filteredMedicos: Medicos[];
  medicosArray: Medicos[];

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

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.medicoService.obtenhaMedicos().subscribe(
      medicos => {
        this.medicosArray = medicos;
      },
      erro => {
        this.msgs = [];
        this.msgs.push({severity: 'error', detail: 'Erro ao encontrar médicos disponíveis'});
      }
    );
  }

  searchMedicos(event): void {
    this.filteredMedicos = this.medicosArray.filter(
      medicos => medicos.pessoa.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(event.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
  }

  insereHospital(hospital: Hospitais): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          hospital.pessoa.endereco = endereco;

          this.hospitalService.insereHospital(hospital)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Hospital cadastrado com sucesso!' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar hospital : ${error}` });
                return;
              }
            );
        },
        error => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: `Erro ao buscar endereço : ${error}` });
        }
      );
  }

  salvar(): void {

    debugger;

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
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
     }

    const pessoaHospital = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      cpf: this.cpf,
      rg: this.rg
     } as Pacientes;

    const hospital = {
      razao_social: this.razaoSocial,
      cnpj: this.cnpj,
      pessoa: pessoaHospital,
      medicos: this.medico
    } as Hospitais;

    this.insereHospital(hospital);

    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: 'Hospital cadastrado com sucesso!' });
  }

}
