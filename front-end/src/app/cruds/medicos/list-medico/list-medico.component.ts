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
  selector: 'app-list-medico',
  templateUrl: './list-medico.component.html',
  providers: [ConfirmationService]

})
export class ListMedicoComponent implements OnInit {

  medicos: Medicos[];
  msgs: Message[] = [];
  especialidades: Especialidades[];
  @ViewChild('dt') table: Table;

  constructor(
    private medicoService: MedicoService,
    private especialidadeService: EspecialidadeService,
    private confirmationService: ConfirmationService) { }

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

  deleteMedico(id): void {

    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o médico?',
      header: 'Exclusão de médico',
      icon: 'pi pi-info-circle',

    accept: () => {
        this.medicoService.deletaMedico(id)
          .subscribe(
            () => {
              location.reload();
            },
            err => {
              this.msgs = [];
              this.msgs = [{ severity: 'error', summary: 'Erro:', detail: err.error }];
            });

        this.confirmationService.close();
      },
      reject: () => {
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: 'Cancelado', detail: 'Operação Cancelada' }];
        this.confirmationService.close();
      }
    });
  }

  aoSelecionarEspecialidade(event): void {
    this.table.filter(event.value.nome, 'especialidade.nome', 'equals');
  }

}
