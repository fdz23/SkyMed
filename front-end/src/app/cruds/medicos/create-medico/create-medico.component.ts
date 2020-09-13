import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Estados } from '../../../../assets/estados';

@Component({
  selector: 'app-create-medico',
  templateUrl: './create-medico.component.html'
})
export class CreateMedicoComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private http: HttpClient) { }

  textCidade: string;
  textEstado: string;
  estadosArray: string[];
  cidadesArray: string[] = [];
  filteredEstados: string[];
  filteredCidades: string[];

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

}
