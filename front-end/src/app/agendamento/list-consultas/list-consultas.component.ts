import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoService } from 'src/app/servicos/medico.service';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { Horarios } from 'src/assets/horarios';
import { PessoaService } from 'src/app/servicos/pessoa.service';

@Component({
  selector: 'app-list-consultas',
  templateUrl: './list-consultas.component.html',
  providers: [ConfirmationService]

})
export class ListConsultasComponent implements OnInit {

  horarios: Horarios[];
  msgs: Message[] = [];
  @ViewChild('dt') table: Table;

  constructor(
    private medicoService: MedicoService,
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenhaHorarios();
  }

  convertaParaHorasMinutos(data): string {
    const horario = new Date(data).toLocaleTimeString().split(':');
    horario.pop();
    return horario.join(':');
  }

  obtenhaHorarios(): void {
    const usuario = JSON.parse(localStorage.currentUser);

    this.pessoaService.obtemPacientePeloUsuarioId(usuario.id).subscribe(
      paciente => {
        this.medicoService.obtenhaHorariosPacienteId(paciente.id)
        .subscribe(
          medico => {
            this.horarios = medico.horariosConsulta.filter(h => new Date(h.inicio) > new Date());
            this.horarios.forEach(h => {
              h.medico = medico;
              h.data = new Date(h.inicio).toLocaleDateString();
              h.periodo = `${this.convertaParaHorasMinutos(h.inicio)} até ${this.convertaParaHorasMinutos(h.fim)}`;
            });
          },
          erro => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', detail: `${erro.error}` });
          });
      },
      erro => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: `${erro.error}` });
      });
  }

  deleteConsulta(id): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir a consulta?',
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
}
