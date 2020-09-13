import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  activeItem: MenuItem;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home'},
      {label: 'Agende uma consulta', icon: 'pi pi-fw pi-calendar'},
      {label: 'Configurações', icon: 'pi pi-fw pi-cog'},
      {label: 'Cadastrar Médico', icon: 'pi pi-fw pi-user-plus', routerLink: 'medico-criar'},
      {label: 'Cadastrar Paciente', icon: 'pi pi-fw pi-user-plus', routerLink: 'paciente-criar'},
      {label: 'Cadastrar Hospital', icon: 'pi pi-fw pi-user-plus', routerLink: 'hospital-criar'}
  ];

    this.activeItem = this.items[0];
  }

}
