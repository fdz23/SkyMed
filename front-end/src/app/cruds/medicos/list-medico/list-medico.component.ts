import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoService } from 'src/app/servicos/medico.service';
import { Medicos } from 'src/assets/Medicos';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-list-medico',
  templateUrl: './list-medico.component.html',
  providers: [ConfirmationService]

})
export class ListMedicoComponent implements OnInit {

  medicos: Medicos[];
  msgs: Message[] = [];
  @ViewChild('dt') table: Table;

  constructor(private medicoService: MedicoService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenhaPacientes();
  }

  obtenhaPacientes(): void {
    this.medicoService.obtenhaMedicos().subscribe(medicos => this.medicos = medicos);
  }

}
