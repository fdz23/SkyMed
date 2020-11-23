import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message, ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { CepService } from 'src/app/servicos/cep.service';
import { Enderecos } from 'src/assets/enderecos';
import { ActivatedRoute } from '@angular/router';
import { Medicos } from 'src/assets/medicos';
import { MedicoService } from 'src/app/servicos/medico.service';
import { Pessoas } from 'src/assets/Pessoas';
import { Usuarios } from '../../../../assets/usuarios';
import { Especialidades } from 'src/assets/especialidades';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';

@Component({
  selector: 'app-edit-medico',
  templateUrl: './edit-medico.component.html',
  providers: [ConfirmationService]

})
export class EditMedicoComponent implements OnInit {
  medico: Medicos;
  msgs: Message[] = [];
  especialidades: Especialidades[];

  public medicoid;
  nome: string;
  cpf: string;
  rg: string;
  tipoDeRegistro: string;
  registro: string;
  especialidade: Especialidades;
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
  ehMedico: boolean;
  ehAdmin: boolean;
  senha: string;
  usuario: Usuarios;

  constructor(
    private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private cepService: CepService,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private especialidadeService: EspecialidadeService) {
    this.route.params.subscribe(params => this.medicoid = params.id);

  }

  criaUsuario(paciente: Pessoas): void{

    paciente.usuario.ehAdmin = false;
    paciente.usuario.ehMedico = false;
    paciente.usuario.email = this.email;
    paciente.usuario.senha = '1234';
  }

  ngOnInit(): void {
    this.obtenhaMedicoPorId(this.medicoid);

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

  public obtenhaMedicoPorId(id: any): void {
    this.medicoService.obtenhaMedicoPorId(this.medicoid).subscribe((medico: Medicos) => {

      this.medico = medico;

      this.cep = medico.pessoa.endereco.cep;
      this.nome = medico.pessoa.nome;
      this.cpf = medico.pessoa.cpf;
      this.rg = medico.pessoa.rg;
      this.logradouro = medico.pessoa.endereco.logradouro;
      this.complemento = medico.pessoa.endereco.complemento;
      this.numero = medico.pessoa.endereco.numero;
      this.uf = medico.pessoa.endereco.uf;
      this.cidade = medico.pessoa.endereco.localidade;
      this.telefone = medico.pessoa.telefone;
      this.email = medico.pessoa.usuario.email;
      this.registro = medico.registro;
      this.especialidade = medico.especialidade;
    }, () => { });
  }

  atualizaMedico(medico: Medicos): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          medico.pessoa.endereco = endereco;
          this.criaUsuario(medico.pessoa);

          this.medicoService.atualizaMedico(medico)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Médico Atualizado com sucesso' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao atualizar Médico : ${error}` });
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
      || this.especialidade == null
      || this.complemento == null || this.complemento === ''
      || this.numero == null
      || this.cep == null || this.cep === ''
      || this.uf == null || this.uf === ''
      || this.cidade == null || this.cidade === ''
      || this.telefone == null || this.telefone === ''
      || this.email == null || this.email === '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
    }

    const medico = this.medico;
    medico.especialidade = this.especialidade;
    medico.pessoa.usuario.email = this.email;
    medico.pessoa.telefone = this.telefone;

    const usuarios = {
      ehMedico: true,
      email: this.email,
      senha: this.senha
    } as Usuarios;

    medico.pessoa.usuario = usuarios;

    this.atualizaMedico(medico);
  }
}
