import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Usuarios } from 'src/assets/usuarios';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html'
})
export class AlterarSenhaComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private autenticacaoService: AutenticacaoService) { }

  msgs: Message[] = [];
  senhaAtual: string;
  novaSenha: string;
  novaSenha2: string;
  feedback = false;

  ngOnInit(): void {
  }

  altereSenha(): void {
    if (this.novaSenha !== this.novaSenha2) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Você deve digitar a senha duas vezes iguais!' });

      return;
    }

    const usuario = JSON.parse(localStorage.currentUser);
    usuario.novaSenha = this.novaSenha;
    usuario.senha = this.senhaAtual;

    this.usuarioService.altereSenha(usuario).subscribe(
      () => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: 'Senha alterada com sucesso, faça login novamente!' });

        this.autenticacaoService.logout();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      erro => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: `${erro.error}` });
      }
    );
  }

}
