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
      { label: 'Agende uma consulta', icon: 'pi pi-fw pi-calendar' },
      {
        label: 'Cadastros', icon: 'pi pi-fw pi-user-plus',
        items: [
          { label: 'Cadastrar Médico', icon: 'pi pi-fw pi-plus', routerLink: 'medico-criar' },
          { label: 'Cadastrar Paciente', icon: 'pi pi-fw pi-plus', routerLink: 'paciente-criar' },
          { label: 'Cadastrar Hospital', icon: 'pi pi-fw pi-plus', routerLink: 'hospital-criar' }
        ]
      }
    ];
  }

}
