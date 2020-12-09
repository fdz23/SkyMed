import { Component, OnInit, ViewChild } from '@angular/core';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';
import { Especialidades } from 'src/assets/especialidades';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-especialidade-listar',
  templateUrl: './list-especialidade.component.html',
  providers: [ConfirmationService]

})
export class ListEspecialidadeComponent implements OnInit {

  especialidades: Especialidades[];
  msgs: Message[] = [];
  @ViewChild('dt') table: Table;

  constructor(
    private especialidadeService: EspecialidadeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenhaEspecialidades();
  }
  
  obtenhaEspecialidades() {
    this.especialidadeService.obtenhaEspecialidades()
    .subscribe(
      especialidades => {
        this.especialidades = especialidades;
      });
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
  }

  deleteEspecialidade(id) {
    this.spinner.show();

    this.confirmationService.confirm({
      message: 'Deseja realmente excluir a especialidade?',
      header: 'Exclusão de especialidade',
      icon: 'pi pi-info-circle',

      accept: () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
        this.especialidadeService.deletaEspecialidade(id).subscribe(especialidade => {
          this.msgs = [];
          this.msgs = [{ severity: 'info', summary: 'Concluído', detail: 'Especialidade Excluida' }];
          window.location.reload;

        },

          error => {
            setTimeout(() => {
              this.spinner.hide();
            }, 500);
            this.msgs = [];
            this.msgs.push({ severity: 'error', detail: `Erro ao deletar Especialidade : ${error.error}` });
          }

        );

        this.confirmationService.close();
      },
      reject: () => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
        this.msgs = [];
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Operação Cancelada' }];
        this.confirmationService.close();
      }

    });
  }

}

