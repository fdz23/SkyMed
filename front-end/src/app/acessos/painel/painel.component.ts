import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html'
})
export class PainelComponent implements OnInit {

  constructor(private router: Router,
    private spinner: NgxSpinnerService) { }

  items: MenuItem[];

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

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
