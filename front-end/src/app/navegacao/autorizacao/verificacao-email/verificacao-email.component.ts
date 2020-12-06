import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, PrimeNGConfig, Message } from 'primeng/api';
import { PessoaService } from 'src/app/servicos/pessoa.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Enderecos } from 'src/assets/enderecos';
import { Pessoas } from 'src/assets/pessoas';
import { Usuarios } from 'src/assets/usuarios';

@Component({
  selector: 'app-verificacao-email',
  templateUrl: './verificacao-email.component.html',
  providers: [ConfirmationService]
})
export class VerificacaoEmailComponent implements OnInit {

  msgs: Message[] = [];
  codigoVerificacao: string;
  codigoVerificacao2: string;
  codigoVerificacao3: string;
  codigoVerificacao4: string;
  codigoVerificaoFinal: string;

  email: string;
  usuario: Usuarios;

  id: any;
  token: string;

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) {
    this.route.params.subscribe(params => this.email = params.email);
  }

  ngOnInit(): void {

    this.obtemClientePorEmail();

  }

  obtemClientePorEmail(): void {

    this.usuarioService.obtemUsuarioPorEmail(this.email).subscribe((usuario: Usuarios) => {

      this.usuario = usuario;
      this.token = usuario.tokenAutenticacaoEmail;

    }, () => { });

  }

  verificaToken(): void {

    this.concatenaToken();

    if (this.codigoVerificaoFinal === this.token) {

      this.usuarioService.autenticaUsuario(this.usuario)
        .subscribe(() => {
          this.msgs = [];
          this.msgs.push({ severity: 'success', detail: 'Usuário autenticado com sucesso!' });
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
          error => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', detail: `Erro ao autenticar usuário : ${error.error}` });
            return;
          }
        );
    }
  }

  concatenaToken(): void {

    this.codigoVerificaoFinal = this.codigoVerificacao.concat(this.codigoVerificacao2, this.codigoVerificacao3, this.codigoVerificacao4);
  }
}
