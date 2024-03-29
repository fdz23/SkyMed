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
import { HorariosTrabalho } from 'src/assets/horariosTrabalho';
import { Timestamp } from 'rxjs';
import { HospitalService } from 'src/app/servicos/hospital.service';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { Hospitais } from 'src/assets/hospitais';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html'
})
export class CreateMedicoComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private cepService: CepService,
    private medicoService: MedicoService,
    private especialidadeService: EspecialidadeService,
    private hospitalService: HospitalService,
    private autenticacaoService: AutenticacaoService,
    private spinner: NgxSpinnerService) { }

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
  horarioInicio: string;
  horarioFim: string;
  diasDaSemana: any[] = [
    { name: 'Domingo' },
    { name: 'Segunda-feira' },
    { name: 'Terça-feira' },
    { name: 'Quarta-feira' },
    { name: 'Quinta-feira' },
    { name: 'Sexta-feira' },
    { name: 'Sábado' }
  ];
  diasDaSemanaSelecionados: any[] = [];
  ehMedico: false;
  ehAdmin: false;
  senha: string;
  usuario: Usuarios;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    this.especialidadeService.obtenhaEspecialidades().subscribe(
      especialidades => {
        this.especialidades = especialidades;
        this.especialidadeSelecionada = especialidades[0];
      },
      erro => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: `Erro ao encontrar especialidades disponíveis: ${erro.error}` });
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
    this.spinner.show();
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          debugger;
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          medico.pessoa.endereco = endereco;

          if (localStorage.length > 0) {
            this.hospitalService.obtenhaHospitalLogado(JSON.parse(localStorage.currentUser).id)
              .subscribe(
                hospital => {
                  medico.hospital = hospital;

                  this.medicoService.insereMedico(medico)
                    .subscribe(
                      () => {
                        setTimeout(() => {
                          this.spinner.hide();
                        }, 500);
                        this.msgs = [];
                        this.msgs.push({ severity: 'success', detail: 'Médico cadastrado com sucesso!' });
                      },
                      error => {
                        setTimeout(() => {
                          this.spinner.hide();
                        }, 500);
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar médico : ${error.error}` });
                        return;
                      }
                    );
                },
                error => {
                     setTimeout(() => {
                    this.spinner.hide();
                  }, 500);
                  this.msgs = [];
                  this.msgs.push({ severity: 'error', detail: `Erro ao buscar hospital : ${error.error}` });
                  return;
                }
              );
          }
        },
        error => {
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: `Erro ao buscar endereço : ${error.error}` });
        }
      );
  }

  salvar(): void {
    if (this.nome == null || this.nome === ''
      || this.cpf == null || this.cpf === ''
      || this.rg == null || this.rg === ''
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
      ehMedico: true,
      ehAdmin: false,
      ehHospital: false,
      ehPaciente: false,
      ehAutenticado: false,
      email: this.email,
      senha: this.senha
    } as Usuarios;

    const pessoa = {
      nome: this.nome,
      cpf: this.cpf,
      rg: this.rg,
      usuario: usuarios,
      telefone: this.celular,
      origemPaciente: "web"
    } as Pessoas;

    const horariosTrabalho: HorariosTrabalho[] = [];

    let inicio: Date;
    let fim: Date;

    const teste = '2020/01/01 ' + this.horarioInicio.substring(0, 2).concat(':', this.horarioInicio.substring(2));
    const teste2 = '2020/01/01 ' + this.horarioFim.substring(0, 2).concat(':', this.horarioFim.substring(2));

    inicio = new Date(teste);
    fim = new Date(teste2);

    if (this.diasDaSemanaSelecionados.find(dia => dia.name === 'Domingo')) {
      horariosTrabalho.push(
        {
          inicio,
          fim,
          diaDaSemana: 0
        } as HorariosTrabalho
      );
    }

    if (this.diasDaSemanaSelecionados.find(dia => dia.name === 'Segunda-feira', 0)) {
      horariosTrabalho.push(
        {
          inicio,
          fim,
          diaDaSemana: 1
        } as HorariosTrabalho
      );
    }

    if (this.diasDaSemanaSelecionados.find(dia => dia.name === 'Terça-feira', 0)) {
      horariosTrabalho.push(
        {
          inicio,
          fim,
          diaDaSemana: 2
        } as HorariosTrabalho
      );
    }

    if (this.diasDaSemanaSelecionados.find(dia => dia.name === 'Quarta-feira', 0)) {
      horariosTrabalho.push(
        {
          inicio,
          fim,
          diaDaSemana: 3
        } as HorariosTrabalho
      );
    }

    if (this.diasDaSemanaSelecionados.find(dia => dia.name === 'Quinta-feira', 0)) {
      horariosTrabalho.push(
        {
          inicio,
          fim,
          diaDaSemana: 4
        } as HorariosTrabalho
      );
    }

    if (this.diasDaSemanaSelecionados.find(dia => dia.name === 'Sexta-feira', 0)) {
      horariosTrabalho.push(
        {
          inicio,
          fim,
          diaDaSemana: 5
        } as HorariosTrabalho
      );
    }

    if (this.diasDaSemanaSelecionados.find(dia => dia.name === 'Sábado', 0)) {
      horariosTrabalho.push(
        {
          inicio,
          fim,
          diaDaSemana: 6
        } as HorariosTrabalho
      );
    }

    const medico = {
      pessoa,
      registro: this.registro,
      especialidade: this.especialidadeSelecionada,
      horariosTrabalho
    } as Medicos;

    this.insereMedico(medico);
  }

}
