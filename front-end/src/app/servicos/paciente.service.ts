import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pacientes } from 'src/assets/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {



  constructor(private http: HttpClient) { }

  inserePaciente(paciente: Pacientes): Observable<Pacientes> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.post<Pacientes>(url, paciente);

  }
  atualizaPaciente(paciente: Pacientes): Observable<Pacientes> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.put<Pacientes>(url, paciente);

  }

  pegaListagemPaciente(): Observable<any> {

    const url = `http://127.0.0.1:8080/pessoa/pacientes/`;
    return this.http.get<Pacientes[]>(url);

  }

  pegaPacientePorId(id: any): Observable<any> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.get<Pacientes[]>(url.concat(id));
  }

  deletaPaciente(id: any): Observable<any> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.delete(url.concat(id));

  }


}
