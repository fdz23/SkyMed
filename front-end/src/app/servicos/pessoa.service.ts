import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoas } from 'src/assets/pessoas';
import { environment } from '../../environments/environment';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {



  constructor(private http: HttpClient, private autenticacaoService: AutenticacaoService) { }

  inserePaciente(paciente: Pessoas): Observable<Pessoas> {
    const url = `${environment.urlSkyMed}pessoa/`;
    return this.http.post<Pessoas>(url, paciente);

  }
  atualizaPaciente(paciente: Pessoas): Observable<Pessoas> {
    const url = `${environment.urlSkyMed}pessoa/`;
    return this.http.put<Pessoas>(url, paciente);

  }

  obtenhaPacientes(): Observable<any> {

    const url = `${environment.urlSkyMed}pessoa/pacientes/`;
    return this.http.get<Pessoas[]>(url);

  }

  obtenhaPacientePorId(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}pessoa/`;
    return this.http.get<Pessoas[]>(url.concat(id));
  }

  deletaPaciente(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}pessoa/`;
    return this.http.delete(url.concat(id));

  }

  obtemPacientePeloUsuarioId(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}pessoa/usuario/`;
    return this.http.get(url.concat(id));
  }
}
