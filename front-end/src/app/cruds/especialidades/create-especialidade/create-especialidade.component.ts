import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import {Especialidades} from 'src/assets/especialidades';


@Component({
  selector: 'app-create-especialidade',
  templateUrl: './create-especialidade.component.html'
  
})
export class CreateEspecialidadeComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, 
              private http: HttpClient) { }

  msgs: Message[] = [];

  nomeEsp: string;

  ngOnInit(): void {
  }

  salvar(): void{
    
    if(this.nomeEsp == null || this.nomeEsp == ''){
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos o campo Nome de Especialidade!' });
      return;
    }

    const especialidade = {

      id: 0,
      nome: this.nomeEsp,

    } as Especialidades;

  }

}
