import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message } from 'primeng/api';
import { HospitalService } from 'src/app/servicos/hospital.service';
import { MedicoService } from 'src/app/servicos/medico.service';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html'
})
export class PainelComponent implements OnInit {

  constructor(private router: Router,
              private pacienteService: PessoaService,
              private medicoService: MedicoService,
              private hospitalService: HospitalService,
              private spinner: NgxSpinnerService) { }

  items: MenuItem[];
  msgs: Message[] = [];

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    const pacienteItem = { label: 'Visualizar consultas', icon: 'pi pi-fw pi-search-plus', routerLink: '/consultas-listar' };

    this.items = [
        { label: 'Mudar senha', icon: 'pi pi-fw pi-lock', routerLink: '/alterar-senha' },
        { label: 'Ajustar dados', icon: 'pi pi-fw pi-user', command: () => this.redirecioneEdicao() }
    ];

    if (this.verificaLogado()) {
      const usuario = JSON.parse(localStorage.currentUser);

      if (usuario.ehPaciente) {
        this.items.push(pacienteItem);
      }
    }
  }

  public verificaLogado(): boolean {
    return localStorage.length > 0;
  }

  redirecioneEdicao(): void {
    const usuario = JSON.parse(localStorage.currentUser);

    if (usuario.ehPaciente) {
      this.pacienteService.obtemPacientePeloUsuarioId(usuario.id).subscribe(
        paciente => {
          this.router.navigateByUrl('paciente-editar/'.concat(paciente.id));
        },
        erro => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: `${erro.error}` });
        }
      );
    }

    if (usuario.ehMedico) {
      this.medicoService.obtenhaMedicoLogado(usuario.id).subscribe(
        medico => {
          this.router.navigateByUrl('medico-editar/'.concat(medico.id));
        },
        erro => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: `${erro.error}` });
        }
      );
    }

    if (usuario.ehHospital) {
      this.router.navigateByUrl('erro-autorizacao-hospital/');
    }
  }

}
