import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Pessoas } from '../../../../assets/pessoas';
import { CepService } from 'src/app/servicos/cep.service';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { Enderecos } from 'src/assets/enderecos';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html'

})
export class CreatePacienteComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private http: HttpClient, private cepService: CepService,
    private pessoaService: PessoaService) { }

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



  ngOnInit(): void {
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
  }

  inserePaciente(paciente: Pessoas): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          paciente.endereco = endereco;

          this.pessoaService.inserePaciente(paciente)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Paciente cadastrado com sucesso!' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar Paciente : ${error}` });
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

    const paciente = {
      nome: this.nome,
      cpf: this.cpf,
      rg: this.rg,
      telefone: this.telefone,
      email: this.email,
      ehPaciente: true,
    } as Pessoas;

    this.inserePaciente(paciente);


  }

}
