import { Component, OnInit, ViewChild } from '@angular/core';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';
import { Especialidades } from 'src/assets/especialidades';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-especialidade-listar',
  templateUrl: './list-especialidade.component.html',
  providers: [ConfirmationService]

})
export class ListEspecialidadeComponent implements OnInit {

  especialidades: Especialidades[];
  msgs: Message[] = [];
  @ViewChild('dt') table: Table;

  constructor(private especialidadeService: EspecialidadeService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenhaEspecialidades();
  }
  obtenhaEspecialidades() {
    this.especialidadeService.obtenhaEspecialidades().subscribe(especialidades => this.especialidades = especialidades);
  }

}

