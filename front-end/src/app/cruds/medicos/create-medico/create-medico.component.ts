import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Medicos } from '../../../../assets/medicos';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html'
})
export class CreateMedicoComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private http: HttpClient) { }

  msgs: Message[] = [];
  estadosArray: string[];
  cidadesArray: string[] = [];
  tipoDeRegistrosArray: string[] = [
    'CRM', 'CRO', 'CRP'
  ];
  especialidadesArray: string[] = [
    'Psicologia', 'Podologia', 'Pediatria'
  ];
  filteredEstados: string[];
  filteredCidades: string[];
  filteredTipoDeRegistros: string[];
  filteredEspecialidades: string[];

  nome: string;
  cpfcnpj: string;
  rg: string;
  tipoDeRegistro: string;
  registro: string;
  especialidade: string;
  endereco: string;
  complemento: string;
  numero: number;
  cep: string;
  uf: string;
  cidade: string;
  celular: string;
  email: string;

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

  searchTipoDeRegistros(event): void {
    this.filteredTipoDeRegistros = this.tipoDeRegistrosArray.filter(
      estado => estado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(event.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
  }

  searchEspecialidades(event): void {
    this.filteredEspecialidades = this.especialidadesArray.filter(
      estado => estado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .includes(event.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
  }

  salvar(): void {

    if (this.nome == null || this.nome == ''
     || this.cpfcnpj == null || this.cpfcnpj == ''
     || this.rg == null || this.rg == ''
     || this.tipoDeRegistro == null || this.tipoDeRegistro == ''
     || this.registro == null || this.rg == ''
     || this.especialidade == null || this.especialidade == ''
     || this.endereco == null || this.endereco == ''
     || this.complemento == null || this.complemento == ''
     || this.numero == null
     || this.cep == null || this.cep == ''
     || this.uf == null || this.uf == ''
     || this.cidade == null || this.cidade == ''
     || this.celular == null || this.celular == ''
     || this.email == null || this.email == '')
     {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
     }

    const medico = {
      id: 0,
      nome: this.nome,
      cpfcnpj: this.cpfcnpj,
      rg: this.rg,
      tipoDeRegistro: this.tipoDeRegistro,
      registro: this.registro,
      especialidade: this.especialidade,
      endereco: this.endereco,
      complemento: this.complemento,
      numero: this.numero,
      cep: this.cep,
      uf: this.uf,
      cidade: this.cidade,
      celular: this.celular,
      email: this.email
    } as Medicos;

    //TODO: integrar com back-end

    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: 'Médico cadastrado com sucesso!' });
  }

}
