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
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'medico'},
      {label: 'Agende uma consulta', icon: 'pi pi-fw pi-calendar'},
      {label: 'Configurações', icon: 'pi pi-fw pi-cog'}
  ];

    this.activeItem = this.items[0];
  }

}
