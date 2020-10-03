import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Pacientes } from '../../../../assets/Pacientes';
import { CepService } from 'src/app/servicos/cep.service';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { Enderecos } from 'src/assets/enderecos';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html'

})
export class CreatePacienteComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private http: HttpClient, private cepService: CepService,
    private pacienteService: PacienteService) { }


  msgs: Message[] = [];
  estadosArray: string[];
  cidadesArray: string[] = [];
  filteredEstados: string[];
  filteredCidades: string[];

  nome: string;
  cpfcnpj: string;
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

  searchCidades(event): void {
    this.filteredCidades = this.cidadesArray.filter(
      cidade => cidade.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(event.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
  }

  searchEstados(event): void {
    this.filteredEstados = this.estadosArray.filter(
      estado => estado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(event.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
  }

  inserePaciente(paciente: Pacientes): void {
    this.cepService.getEnderecoPeloCep(this.cep)
      .subscribe(
        endereco => {
          endereco.complemento = this.complemento;
          endereco.numero = this.numero;

          paciente.endereco = endereco;

          this.pacienteService.inserePaciente(paciente)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Paciente cadastrado com sucesso!' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Eroo ao cadastrar Paciente : ${error}` });
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
      || this.cpfcnpj == null || this.cpfcnpj == ''
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
      cpf_cnpj: this.cpfcnpj,
      rg: this.rg,
      telefone: this.telefone,
      email: this.email
    } as Pacientes;

    this.inserePaciente(paciente);


  }

}
