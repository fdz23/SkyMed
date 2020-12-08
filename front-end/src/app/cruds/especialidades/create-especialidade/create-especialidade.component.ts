import { HttpClient } from '@angular/common/http';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Message, PrimeNGConfig } from 'primeng/api';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';
import { Especialidades } from 'src/assets/especialidades';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-especialidade',
  templateUrl: './create-especialidade.component.html'
})
export class CreateEspecialidadeComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private especialidadeService: EspecialidadeService,
    private spinner: NgxSpinnerService) { }

msgs: Message[] = [];
nome: string;
value: number;
preco: string;
duracaoConsulta: Date;

ngOnInit(): void {
this.primengConfig.ripple = true;
this.spinner.show();
setTimeout(() => {
  this.spinner.hide();
}, 500);

}

insereEspecialidade(especialidade: Especialidades): void {
  this.spinner.show();
this.especialidadeService.insereEspecialidade(especialidade)
  .subscribe(
    () => {
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
      this.msgs = [];
      this.msgs.push({ severity: 'success', detail: 'Especialidade cadastrada com sucesso!' });
    },
    error => {
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar especialidade : ${error}` });
      return;
    }
  );
}

salvar(): void {

if (this.nome == null || this.nome == ''
|| this.preco == null || this.preco == ''
|| this.duracaoConsulta == null ) {
  this.msgs = [];
  this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
  return;
}

const especialidade = {
  id: 0,
  nome: this.nome,
  preco: this.preco,
  duracaoConsulta: this.duracaoConsulta
} as Especialidades;

this.insereEspecialidade(especialidade);
}

}
