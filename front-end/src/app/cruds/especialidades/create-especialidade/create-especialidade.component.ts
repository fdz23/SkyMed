import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Especialidades } from 'src/assets/especialidades';
import { EspecialidadeService } from 'src/app/servicos/especialidade.service';


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

  ngOnInit(): void {
  }

  insereEspecialidade(epsecialidade: Especialidades): void{

    this.especialidadeService.insereEspecialidade(epsecialidade)
      .subscribe(
        () => {
          this.msgs = [];
          this.msgs.push({ severity: 'success', detail: 'Especialidade cadastrado com sucesso!' });
              },
          error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: `Erro ao cadastrar especialidade : ${error}` });
                return;

        }


      );

  }

  salvar(): void{
    
    if(this.nome == null || this.nome == ''){
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: 'Precisa preencher todos od campos!' });
      return;
    }

    const especialidade = {

      id: 0,
      nome: this.nome,

    } as Especialidades;

    this.insereEspecialidade(especialidade);

  }

}
