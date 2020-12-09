import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { HeaderComponent } from 'src/app/navegacao/header/header.component';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Usuarios } from '../../../assets/usuarios';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  senha: string;
  email: string;
  msgs: Message[] = [];
  feedback = false;
  ehAutenticado = false;

  ngOnInit(): void { }

  login(): void {
    this.spinner.show();

    if (this.usuarioEhAutenticado()) {
      const usuario = { email: this.email, senha: this.senha } as Usuarios;
      this.autenticacaoService.login(usuario).subscribe(
        resposta => {
          this.usuarioService.obtemUsuario(usuario).subscribe(
            user => {
              setTimeout(() => {
                this.spinner.hide();
              }, 500);
              user.tokenAutenticacao = resposta.token;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.autenticacaoService.currentUserSubject.next(user);
              window.location.reload();
              this.msgs = [];
            },
            erro => {
              setTimeout(() => {
                this.spinner.hide();
              }, 500);
              this.msgs = [];
              this.msgs.push({ severity: 'error', detail: `${erro.error}` });
            }
          );
        },
        erro => {
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: 'Email/Senha estão incorretos'});
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
