import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message, ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Especialidades } from '../../../../assets/especialidades';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-especialidade-editar',
  templateUrl: './edit-especialidade.component.html',
  providers: [ConfirmationService]

})
export class EditEspecialidadeComponent implements OnInit {
  especialidade: Especialidades;
  msgs: Message[] = [];

  public especialidadeid;
  nome: string;
  preco: string;
  duracaoConsulta: Date;


  constructor(private router: Router, private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private especialidadeService: EspecialidadeService, private route: ActivatedRoute, private confirmationService: ConfirmationService) {
    this.route.params.subscribe(params => this.especialidadeid = params['id']);

  }

  ngOnInit(): void {

    this.obtenhaEspecialidadePorId(this.especialidadeid);

  }

  public obtenhaEspecialidadePorId(id: any): void {

    this.especialidadeService.obtenhaEspecialidadePorId(this.especialidadeid).subscribe((especialidade: Especialidades) => {

      this.especialidade = especialidade;

      this.nome = especialidade.nome;
      this.preco = especialidade.preco;
      this.duracaoConsulta = especialidade.duracaoConsulta;

    }, () => { });


  }
  atualizaEspecialidade(especialidade: Especialidades): void {

          this.especialidadeService.atualizaEspecialidade(especialidade)
            .subscribe(
              () => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'especialidade Atualizada com sucesso' });
              },
              error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao atualizar especialidade : ${error.error}` });
                return;
              }
            );




  }

  deletaEspecialidade() {

    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o cadastro?',
      header: 'Exclusão de cadastro',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.especialidadeService.deletaEspecialidade(this.especialidade.id).subscribe(especialidade => { }, err => { console.log('Erro ao deletar especialidade') });
        this.msgs = [{ severity: 'info', summary: 'Concluído', detail: 'Registro Excluido' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Operação Cancelada' }];
      }
    });


  }

  salvar(): void {

    if (this.nome == null || this.nome == ''
      ||this.duracaoConsulta == null) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos os campos!' });
      return;
    }

    const especialidade = {
      nome: this.nome,
      preco: this.preco,
      duracaoConsulta: this.duracaoConsulta
    } as Especialidades;

    this.atualizaEspecialidade(especialidade);

  }
}
