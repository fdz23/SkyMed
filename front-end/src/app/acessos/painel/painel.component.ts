import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PessoaService } from 'src/app/servicos/pessoa.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html'
})
export class PainelComponent implements OnInit {

  constructor(private router: Router) { }

  items: MenuItem[];

  ngOnInit(): void {
    const pacienteItem = { label: 'Visualizar consultas', icon: 'pi pi-fw pi-search-plus', routerLink: '/consultas-listar' };

    this.items = [
        { label: 'Ajustar dados', icon: 'pi pi-fw pi-user', routerLink: ''  },
        { label: 'Mudar senha', icon: 'pi pi-fw pi-lock', routerLink: '' }
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

}
