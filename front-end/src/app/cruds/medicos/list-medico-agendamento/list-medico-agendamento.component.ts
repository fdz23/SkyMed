import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoService } from 'src/app/servicos/medico.service';
import { Medicos } from 'src/assets/Medicos';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { Especialidades } from 'src/assets/especialidades';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';

@Component({
  selector: 'app-list-medico-agendamento',
  templateUrl: './list-medico-agendamento.component.html',
  providers: [ConfirmationService]

})
export class ListMedicoAgendamentoComponent implements OnInit {

  medicos: Medicos[];
  msgs: Message[] = [];
  especialidades: Especialidades[];
  @ViewChild('dt') table: Table;

  constructor(
    private medicoService: MedicoService,
    private especialidadeService: EspecialidadeService) { }

  ngOnInit(): void {
    this.obtenhaMedicos();
    this.obtenhaEspecialidades();
  }

  obtenhaMedicos(): void {
    this.medicoService.obtenhaMedicos()
    .subscribe(
      medicos => {
        this.medicos = medicos;
      });
  }

  obtenhaEspecialidades(): void {
    this.especialidadeService.obtenhaEspecialidades()
    .subscribe(
      especialidades => {
        this.especialidades = especialidades;
      });
  }

  aoSelecionarEspecialidade(event): void {
    this.table.filter(event.value.nome, 'especialidade.nome', 'equals');
  }

}
