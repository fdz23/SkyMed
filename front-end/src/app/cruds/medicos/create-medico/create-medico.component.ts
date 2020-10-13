import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Medicos } from '../../../../assets/medicos';
import { CepService } from 'src/app/servicos/cep.service';
import { Enderecos } from 'src/assets/enderecos';
import { MedicoService } from 'src/app/servicos/medico.service';
import { Pacientes } from 'src/assets/Pacientes';

@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html'
})
export class CreateMedicoComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
              private http: HttpClient,
              private cepService: CepService,
              private medicoService: MedicoService) { }

  msgs: Message[] = [];
  tipoDeRegistrosArray: string[] = [
    'CRM', 'CRO', 'CRP'
  ];
  especialidadesArray: string[] = [
    'Psicologia', 'Podologia', 'Pediatria'
  ];
  filteredEspecialidades: string[];
  filteredTipoDeRegistros: string[];

  nome: string;
  cpf: string;
  rg: string;
  tipoDeRegistro: string;
  registro: string;
  logradouro: string;
  complemento: string;
  numero: string;
  cep: string;
  uf: string;
  cidade: string;
  celular: string;
  email: string;
  especialidade: string;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  searchEspecialidades(event): void {
    this.filteredEspecialidades = this.especialidadesArray.filter(
      estado => estado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(event.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
  }

  searchTipoDeRegistros(event): void {
    this.filteredTipoDeRegistros = this.tipoDeRegistrosArray.filter(
      tipoDeRegistros => tipoDeRegistros.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(event.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
  }

  insereMedico(medico: Medicos): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          medico.pessoa.endereco = endereco;

          this.medicoService.insereMedico(medico)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Médico cadastrado com sucesso!' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar médico : ${error}` });
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

    if (this.nome == null || this.nome === ''
      || this.cpf == null || this.cpf === ''
      || this.rg == null || this.rg === ''
      || this.tipoDeRegistro == null || this.tipoDeRegistro === ''
      || this.registro == null || this.rg === ''
      || this.logradouro == null || this.logradouro === ''
      || this.complemento == null || this.complemento === ''
      || this.numero == null
      || this.cep == null || this.cep === ''
      || this.uf == null || this.uf === ''
      || this.cidade == null || this.cidade === ''
      || this.celular == null || this.celular === ''
      || this.email == null || this.email === '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
    }

    const pacientes = {
      nome: this.nome,
      cpf: this.cpf,
      rg: this.rg,
      telefone: this.celular,
      email: this.email
    } as Pacientes;

    const medico = {
      id: 0,
      pessoa: pacientes,
    } as Medicos;

    this.insereMedico(medico);
  }

}
