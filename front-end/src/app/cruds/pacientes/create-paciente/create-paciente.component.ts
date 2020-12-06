import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Pessoas } from '../../../../assets/pessoas';
import { Usuarios } from '../../../../assets/usuarios';
import { CepService } from 'src/app/servicos/cep.service';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { Enderecos } from 'src/assets/enderecos';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { NgxSpinnerService } from "ngx-spinner";
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html'

})
export class CreatePacienteComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private cepService: CepService,
    private pessoaService: PessoaService,
    private router: Router,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService) { }

  msgs: Message[] = [];
  estadosArray: string[];
  cidadesArray: string[] = [];
  filteredEstados: string[];
  filteredCidades: string[];

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
  senha: string;
  usuario: Usuarios;
  token: String;


  ngOnInit(): void {
    this.spinner.show();
    this.primengConfig.ripple = true;
    this.http.get<any>('assets/estados-cidades.json')
      .toPromise()
      .then(res => res.estados as Estados[])
      .then(data => {
        data.forEach(
          estado => estado.cidades.forEach(
            cidade => this.cidadesArray.push(cidade)
          )
        );
        this.estadosArray = data.map(
          estado => estado.nome
        );
      });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);


  }

  inserePaciente(paciente: Pessoas): void {
    this.spinner.show();
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;
          paciente.endereco = endereco;


          this.pessoaService.inserePaciente(paciente)
            .subscribe(
              () => {
                setTimeout(() => {
                  this.spinner.hide();
                }, 500);

                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Paciente cadastrado com sucesso!' });

                if (localStorage.getItem('currentUser') == null) {

                  this.router.navigateByUrl("/autenticacao-conta/".concat(paciente.usuario.email));

                }
              },
              error => {
                setTimeout(() => {
                  this.spinner.hide();
                }, 500);
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar Paciente : ${error.error}` });
                return;
              }
            );
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

    if (this.nome == null || this.nome == ''
      || this.cpf == null || this.cpf == ''
      || this.rg == null || this.rg == ''
      || this.rg == null || this.rg == ''
      || this.complemento == null || this.complemento == ''
      || this.numero == null
      || this.cep == null || this.cep == ''
      || this.telefone == null || this.telefone == ''
      || this.email == null || this.email == '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
    }

    const usuarios = {
      ehPaciente: true,
      ehAdmin: false,
      ehHospital: false,
      ehMedico: false,
      email: this.email,
      senha: this.senha
    } as Usuarios;

    const paciente = {
      nome: this.nome,
      cpf: this.cpf,
      rg: this.rg,
      usuario: usuarios,
      telefone: this.telefone
    } as Pessoas;

    this.inserePaciente(paciente);
  }
}
