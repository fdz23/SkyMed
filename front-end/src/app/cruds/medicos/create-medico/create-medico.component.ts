import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Medicos } from '../../../../assets/medicos';
import { Usuarios } from '../../../../assets/usuarios';
import { CepService } from 'src/app/servicos/cep.service';
import { MedicoService } from 'src/app/servicos/medico.service';
import { Pessoas } from 'src/assets/Pessoas';
import { Especialidades } from 'src/assets/especialidades';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';

@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html'
})
export class CreateMedicoComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
              private http: HttpClient,
              private cepService: CepService,
              private medicoService: MedicoService,
              private especialidadeService: EspecialidadeService) { }

  msgs: Message[] = [];
  tipoDeRegistrosArray: string[] = [
    'CRM', 'CRO', 'CRP'
  ];
  especialidades: Especialidades[];
  especialidadeSelecionada: Especialidades;
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
  especialidade: Especialidades;
  ehMedico: false;
  ehAdmin: false;
  senha : string;
  usuario: Usuarios;

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.especialidadeService.obtenhaEspecialidades().subscribe(
      especialidades => {
        this.especialidades = especialidades;
      },
      erro => {
        this.msgs = [];
        this.msgs.push({severity: 'error', detail: `Erro ao encontrar especialidades disponíveis: ${erro.error}`});
      }
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
                this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar médico : ${error.error}` });
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
      || this.cpf == null || this.cpf === ''
      || this.rg == null || this.rg === ''
      || this.tipoDeRegistro == null || this.tipoDeRegistro === ''
      || this.registro == null || this.rg === ''
      || this.complemento == null || this.complemento === ''
      || this.numero == null
      || this.cep == null || this.cep === ''
      || this.celular == null || this.celular === ''
      || this.email == null || this.email === '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
    }
    const usuarios = {

      ehAdmin: false,
      ehMedico:true,
      email: this.email,
      senha: this.senha

    } as Usuarios;

    const pacientes = {
      nome: this.nome,
      cpf: this.cpf,
      rg: this.rg,
      usuario: usuarios,
      telefone: this.celular,
   
     } as Pessoas;

    const medico = {
      id: 0,
      pessoa: pacientes,
      registro: this.registro,
      especialidade: this.especialidadeSelecionada
    } as Medicos;

    this.insereMedico(medico);
  }

}
