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
              private router: Router) {}

  senha: string;
  email: string;
  msgs: Message[] = [];
  feedback = false;

  ngOnInit(): void { }

  login(): void {
    const usuario = { email: this.email, senha: this.senha } as Usuarios;
    this.autenticacaoService.login(usuario).subscribe(
      resposta => {
        this.usuarioService.obtemUsuario(usuario).subscribe(
          user => {
            user.token_autenticacao = resposta.token;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.autenticacaoService.currentUserSubject.next(user);
            this.router.navigate(['/home']);
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
