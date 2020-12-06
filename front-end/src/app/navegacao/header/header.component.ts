import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor(private autenticacaoService: AutenticacaoService,
              private router: Router) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home' },
      {
        label: 'Cadastros', icon: 'pi pi-fw pi-user-plus',
        items: [
          { label: 'Paciente', icon: 'pi pi-fw pi-plus', routerLink: 'paciente-criar' },
          { label: 'Hospital', icon: 'pi pi-fw pi-plus', routerLink: 'hospital-criar' }
        ]
      }];

    const listaConsulta = { label: 'Agende uma consulta', icon: 'pi pi-fw pi-calendar', routerLink: 'medico-listar-agendamento' };
    const cadastroMedico = { label: 'Médico', icon: 'pi pi-fw pi-plus', routerLink: 'medico-criar' };
    const cadastroEspecialidade = { label: 'Especialidade', icon: 'pi pi-fw pi-plus', routerLink: 'especialidade-criar' };
    const pesquisas = {
      label: 'Procurar', icon: 'pi pi-fw pi-users',
      items: [
        { label: 'Pacientes', icon: 'pi pi-fw pi-user', routerLink: 'paciente-listar' },
        { label: 'Especialidades', icon: 'pi pi-fw pi-user', routerLink: 'especialidade-listar' },
        { label: 'Médicos', icon: 'pi pi-fw pi-user', routerLink: 'medico-listar' }

      ]
    };
    const dashBoard = {
      label: 'Painel Administrativo', icon: 'pi pi-fw pi-th-large' ,
      items: [
        { label: 'Estatísticas', icon: 'pi pi-fw pi-chart-line', routerLink: 'charts' }
      ]
    };

    if (this.verificaLogado()) {

      const usuario = JSON.parse(localStorage.currentUser);

      if (usuario.ehAdmin || usuario.ehHospital) {
        this.items.push(listaConsulta);
        this.items.push(pesquisas);
        this.items[1].items.push(cadastroMedico, cadastroEspecialidade);
        this.items.push(dashBoard);
      }

      if (usuario.ehPaciente) {
        this.items.push(listaConsulta);
      }
    }
  }

  logout(): void {
    this.autenticacaoService.logout();

    window.location.reload();
  }

  public verificaLogado(): boolean {
    return localStorage.length > 0;
  }

}
