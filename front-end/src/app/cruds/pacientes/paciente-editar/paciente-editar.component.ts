import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message, ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Pacientes } from '../../../../assets/Pacientes';
import { CepService } from 'src/app/servicos/cep.service';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { Enderecos } from 'src/assets/enderecos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.component.html',
  providers: [ConfirmationService]

})
export class PacienteEditarComponent implements OnInit {
  paciente: Pacientes;
  msgs: Message[] = [];

  public pacienteid;
  nome: string;
  cpf: string;
  rg: string;
  endereco: Enderecos;
  complemento: string;
  numero: string;
  cep: string;
  uf: string;
  cidade: string;
  telefone: string;
  email: string;
  logradouro: string;
  ehPaciente: boolean;

  constructor(private primengConfig: PrimeNGConfig,
    private http: HttpClient, private cepService: CepService,
    private pacienteService: PacienteService, private route: ActivatedRoute, private confirmationService: ConfirmationService) {
    this.route.params.subscribe(params => this.pacienteid = params['id']);

  }

  ngOnInit(): void {

    this.obtenhaPacientePorId(this.pacienteid);

  }

  public obtenhaPacientePorId(id: any): void {

    this.pacienteService.obtenhaPacientePorId(this.pacienteid).subscribe((paciente: Pacientes) => {

      this.paciente = paciente;

      this.cep = paciente.endereco.cep;
      this.nome = paciente.nome;
      this.cpf = paciente.cpf;
      this.rg = paciente.rg;
      this.endereco = paciente.endereco;
      this.logradouro = paciente.endereco.logradouro;
      this.complemento = paciente.endereco.complemento;
      this.numero = paciente.endereco.numero;
      this.uf = paciente.endereco.uf;
      this.cidade = paciente.endereco.localidade;
      this.telefone = paciente.telefone;
      this.email = paciente.email;
    }, () => { });


  }
  atualizaPaciente(paciente: Pacientes): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          paciente.endereco = endereco;

          this.pacienteService.atualizaPaciente(paciente)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Paciente Atualizado com sucesso' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao atualizar Paciente : ${error}` });
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
  
  deletaPaciente() {

    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o cadastro?',
      header: 'Exclusão de cadastro',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pacienteService.deletaPaciente(this.paciente.id).subscribe(paciente => { }, err => { console.log('Erro ao deletar paciente') });
        this.msgs = [{ severity: 'info', summary: 'Concluído', detail: 'Registro Excluido' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Operação Cancelada' }];
      }
    });


  }

  salvar(): void {

    if (this.nome == null || this.nome == ''
      || this.cpf == null || this.cpf == ''
      || this.rg == null || this.rg == ''
      || this.rg == null || this.rg == ''
      || this.logradouro == null || this.logradouro == ''
      || this.complemento == null || this.complemento == ''
      || this.numero == null
      || this.cep == null || this.cep == ''
      || this.uf == null || this.uf == ''
      || this.cidade == null || this.cidade == ''
      || this.telefone == null || this.telefone == ''
      || this.email == null || this.email == '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
    }

    const paciente = {
      nome: this.nome,
      cpf: this.cpf,
      rg: this.rg,
      telefone: this.telefone,
      email: this.email,
      ehPaciente: true,
    } as Pacientes;

    this.atualizaPaciente(paciente);

  }
}