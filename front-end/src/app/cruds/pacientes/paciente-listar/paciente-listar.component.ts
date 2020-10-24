import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { Pessoas } from 'src/assets/pessoas';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-paciente-listar',
  templateUrl: './paciente-listar.component.html',
  providers: [ConfirmationService]

})
export class PacienteListarComponent implements OnInit {

  pacientes: Pessoas[];
  msgs: Message[] = [];
  @ViewChild('dt') table: Table;

  constructor(private pessoaService: PessoaService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenhaPacientes();
    this.table.responsive;
  }

  obtenhaPacientes() {
    this.pessoaService.obtenhaPacientes().subscribe(pacientes => this.pacientes = pacientes);
  }

  deletaPaciente(id) {

    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o cadastro?',
      header: 'Exclusão de cadastro',
      icon: 'pi pi-info-circle',

      accept: () => {
        this.pessoaService.deletaPaciente(id).subscribe(paciente => { }, err => { console.log('Erro ao deletar paciente') });
        this.msgs = [{ severity: 'info', summary: 'Concluído', detail: 'Registro Excluido' }];
        this.confirmationService.close();
        location.reload;
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Operação Cancelada' }];
        this.confirmationService.close();
       }

    });



  }

}
