import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { HeaderComponent } from 'src/app/navegacao/header/header.component';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Usuarios } from '../../../assets/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  senha: string;
  email: string;
  msgs: Message[] = [];
  feedback = false;
  ehAutenticado = false;

  ngOnInit(): void { }

  login(): void {

    if (this.usuarioEhAutenticado()) {
      const usuario = { email: this.email, senha: this.senha } as Usuarios;
      this.autenticacaoService.login(usuario).subscribe(
        resposta => {
          this.usuarioService.obtemUsuario(usuario).subscribe(
            user => {
              user.tokenAutenticacao = resposta.token;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.autenticacaoService.currentUserSubject.next(user);
              window.location.reload();
              this.msgs = [];
            },
            erro => {
              this.msgs = [];
              this.msgs.push({ severity: 'error', detail: `${erro.error}` });
            }
          );
        },
        erro => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: `${erro.error}` });
        }
      );
    }
  }

  usuarioEhAutenticado(): boolean {

    this.usuarioService.obtemUsuarioPorEmail(this.email).subscribe(
      (usuario: Usuarios) => {

        this.ehAutenticado = usuario.ehAutenticado;

        if (usuario.ehAutenticado === false) {

          this.router.navigateByUrl('autenticacao-conta/'.concat(this.email));

          return false;

        }
      }

    );
    return true;
  }

}
