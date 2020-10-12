import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { Pacientes } from 'src/assets/Pacientes';
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

  pacientes: Pacientes[];
  msgs: Message[] = [];
  @ViewChild('dt') table: Table;

  constructor(private pacienteService: PacienteService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenhaPacientes();
  }
  obtenhaPacientes() {
    this.pacienteService.obtenhaPacientes().subscribe(pacientes => this.pacientes = pacientes);
  }

}
