import { HttpClient } from '@angular/common/http';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Message, PrimeNGConfig } from 'primeng/api';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';
import { Especialidades } from 'src/assets/especialidades';

@Component({
  selector: 'app-create-especialidade',
  templateUrl: './create-especialidade.component.html'
})
export class CreateEspecialidadeComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private especialidadeService: EspecialidadeService) { }

    
    
 
msgs: Message[] = [];
nome: string;
value: number;
preco: string;
duracaoConsulta: string;

ngOnInit(): void {
//this.primengConfig.ripple = true;
}

insereEspecialidade(especialidade: Especialidades): void {
this.especialidadeService.insereEspecialidade(especialidade)
  .subscribe(
    () => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', detail: 'Especialidade cadastrada com sucesso!' });
    },
    error => {
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
