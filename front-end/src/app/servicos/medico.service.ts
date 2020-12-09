import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicos } from 'src/assets/medicos';
import { environment } from '../../environments/environment';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient, private autenticacaoService: AutenticacaoService) { }

  insereMedico(medico: Medicos): Observable<Medicos> {
    const url = `${environment.urlSkyMed}medico/`;
    return this.http.post<Medicos>(url, medico);
  }

  atualizaMedico(medico: Medicos): Observable<Medicos> {
    const url = `${environment.urlSkyMed}medico/`;
    return this.http.put<Medicos>(url, medico);
  }

  obtenhaMedicos(): Observable<any> {
    const url = `${environment.urlSkyMed}medico/`;
    return this.http.get<Medicos[]>(url);

  }

  obtenhaMedicoPorId(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}medico/`;
    return this.http.get<Medicos[]>(url.concat(id));
  }

  deletaMedico(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}medico/`;
    return this.http.delete(url.concat(id));
  }

  obtenhaHorariosPacienteId(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}medico/horarios/paciente/`;
    return this.http.get(url.concat(id));
  }

  obtenhaMedicoLogado(id: any): Observable<any> {
    const url = `${environment.urlSkyMed}medico/usuario/`;
    return this.http.get(url.concat(id));
  }
}
