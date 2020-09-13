import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';
import { Medicos } from '../../../../assets/medicos';

@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html'
})
export class CreateMedicoComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private http: HttpClient) { }

  msgs: Message[] = [];
  estadosArray: string[];
  cidadesArray: string[] = [];
  filteredEstados: string[];
  filteredCidades: string[];

  nome: string;
  cpfcnpj: string;
  rg: string;
  registro: string;
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

  salvar(): void {
    const medico = {
      nome: this.nome,
      cpfcnpj: this.cpfcnpj,
      rg: this.rg,
      registro: this.registro,
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
