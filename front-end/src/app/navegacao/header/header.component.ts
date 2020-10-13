import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  logado = false;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home' },
      { label: 'Agende uma consulta', icon: 'pi pi-fw pi-calendar', routerLink: 'medico-listar' },
      {
        label: 'Cadastros', icon: 'pi pi-fw pi-user-plus',
        items: [
          { label: 'Médico', icon: 'pi pi-fw pi-plus', routerLink: 'medico-criar' },
          { label: 'Paciente', icon: 'pi pi-fw pi-plus', routerLink: 'paciente-criar' },
          { label: 'Hospital', icon: 'pi pi-fw pi-plus', routerLink: 'hospital-criar' },
          { label: 'Especialidade', icon: 'pi pi-fw pi-plus', routerLink: 'especialidade-criar' }
        ]
      },
      {
        label: 'Leads', icon: 'pi pi-fw pi-users',
        items: [
          { label: 'Pacientes', icon: 'pi pi-fw pi-user', routerLink: 'paciente-listar' },
          { label: 'Médicos', icon: 'pi pi-fw pi-user', routerLink: 'medico-listar' }

        ]
      }
    ];
  }

}
