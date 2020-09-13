import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Hospitais } from '../../../../assets/hospitais';

@Component({
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html'
})
export class CreateHospitalComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private http: HttpClient) { }

  msgs: Message[] = [];
  estadosArray: string[];
  cidadesArray: string[] = [];
  filteredEstados: string[];
  filteredCidades: string[];

  nome: string;
  cnpj: string;
  endereco: string;
  complemento: string;
  numero: number;
  cep: string;
  uf: string;
  cidade: string;
  telefone: string;
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

  salvar(): void {

    if (this.nome == null || this.nome == ''
     || this.cnpj == null || this.cnpj == ''
     || this.endereco == null || this.endereco == ''
     || this.complemento == null || this.complemento == ''
     || this.numero == null
     || this.cep == null || this.cep == ''
     || this.uf == null || this.uf == ''
     || this.cidade == null || this.cidade == ''
     || this.telefone == null || this.telefone == ''
     || this.email == null || this.email == '')
     {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
     }

    const hospital = {
      id: 0,
      nome: this.nome,
      cnpj: this.cnpj,
      endereco: this.endereco,
      complemento: this.complemento,
      numero: this.numero,
      cep: this.cep,
      uf: this.uf,
      cidade: this.cidade,
      telefone: this.telefone,
      email: this.email
    } as Hospitais;

    //TODO: integrar com back-end

    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: 'Hospital cadastrado com sucesso!' });
  }

}
