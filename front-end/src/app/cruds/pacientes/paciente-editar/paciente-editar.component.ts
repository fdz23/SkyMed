import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message, ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Pessoas } from '../../../../assets/pessoas';
import { Usuarios } from '../../../../assets/usuarios';
import { CepService } from 'src/app/servicos/cep.service';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { Enderecos } from 'src/assets/enderecos';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.component.html',
  providers: [ConfirmationService]

})
export class PacienteEditarComponent implements OnInit {
  paciente: Pessoas;
  msgs: Message[] = [];

  public pacienteid;
  id: any;
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

  ehMedico: false;
  ehAdmin: false;
  senha : string;
  usuario: Usuarios;

  constructor(private router: Router, private primengConfig: PrimeNGConfig,
    private http: HttpClient, private cepService: CepService,
    private pessoaService: PessoaService, private route: ActivatedRoute, private confirmationService: ConfirmationService) {
    this.route.params.subscribe(params => this.pacienteid = params['id']);

  }

  ngOnInit(): void {

    this.obtenhaPacientePorId(this.pacienteid);

  }

  public obtenhaPacientePorId(id: any): void {

    this.pessoaService.obtenhaPacientePorId(this.pacienteid).subscribe((paciente: Pessoas) => {

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
      this.email = paciente.usuario.email;
      this.id = paciente.id;
    }, () => { });


  }
  atualizaPaciente(paciente: Pessoas): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;
          paciente.endereco = endereco;
          

          this.pessoaService.atualizaPaciente(paciente)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Paciente Atualizado com sucesso' });

                setTimeout(() => {
                  this.router.navigateByUrl('/paciente-listar');
                }, 2000);

              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao atualizar Paciente : ${error.error}` });
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

    if (this.nome == null || this.nome == ''
      || this.cpf == null || this.cpf == ''
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

    const usuarios = {
      ehPaciente: true,
      email: this.email,
      senha: this.senha
    } as Usuarios;

    const paciente = {
      nome: this.nome,
      cpf: this.cpf,
      rg: this.rg,
      usuario: usuarios,
      telefone: this.telefone,
      id: this.id,
    } as Pessoas;

    this.atualizaPaciente(paciente);
  }
}
