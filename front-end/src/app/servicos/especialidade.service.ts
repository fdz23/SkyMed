import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidades } from 'src/assets/especialidades';
import { environment } from '../../environments/environment';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor(private http: HttpClient, private autenticacaoService: AutenticacaoService) { }

  insereEspecialidade(especialidade: Especialidades): Observable<Especialidades> {
    const url = `${environment.urlSkyMed}especialidade/`;
    return this.http.post<Especialidades>(url, especialidade);
  }

  atualizaEspecialidade(especialidade: Especialidades): Observable<Especialidades> {
    const url = `${environment.urlSkyMed}especialidade/`;
    return this.http.put<Especialidades>(url, especialidade);
  }

  deletaEspecialidade(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}especialidade/`;
    return this.http.delete(url.concat(id));
  }

  obtenhaEspecialidades(): Observable<any> {

    const url = `${environment.urlSkyMed}especialidade/`;
    return this.http.get<Especialidades[]>(url);

  }

  obtenhaEspecialidadePorId(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}especialidade/`;
    return this.http.get<Especialidades[]>(url.concat(id));
  }
}
