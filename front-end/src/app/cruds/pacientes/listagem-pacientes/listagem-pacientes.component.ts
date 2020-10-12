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
  
}
