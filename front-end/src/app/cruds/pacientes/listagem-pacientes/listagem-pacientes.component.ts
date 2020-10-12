import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { Pacientes } from 'src/assets/Pacientes';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-listagem-pacientes',
  templateUrl: './listagem-pacientes.component.html',
  providers: [ConfirmationService]

})
export class ListagemPacientesComponent implements OnInit {

  pacientes: Pacientes[];
  loading: boolean = true;
  msgs: Message[] = [];
  @ViewChild('dt') table: Table;

  constructor(private pacienteService: PacienteService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.pegarListagemPaciente();
    this.loading = false;

  }

  pegarListagemPaciente() {

    this.pacienteService.pegaListagemPaciente().subscribe(pacientes => this.pacientes = pacientes);

  }

  deletaPaciente(id: number) {

    this.confirmationService.confirm({
      message: 'Você deseja realmente excluir o cadastro?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pacienteService.deletaPaciente(id).subscribe(paciente => { }, erro => { console.log('Erro ao deletar Paciente') });
        this.pegarListagemPaciente();
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Cadastro Excluído' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Operação Cancelada' }];
      }
    });

  }


}
