import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoas } from 'src/assets/pessoas';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {



  constructor(private http: HttpClient) { }

  inserePaciente(paciente: Pessoas): Observable<Pessoas> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.post<Pessoas>(url, paciente);

  }
  atualizaPaciente(paciente: Pessoas): Observable<Pessoas> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.put<Pessoas>(url, paciente);

  }

  obtenhaPacientes(): Observable<any> {

    const url = `http://127.0.0.1:8080/pessoa/pacientes/`;
    return this.http.get<Pessoas[]>(url);

  }

  obtenhaPacientePorId(id: any): Observable<any> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.get<Pessoas[]>(url.concat(id));
  }

  deletaPaciente(id: any): Observable<any> {
    const url = `http://127.0.0.1:8080/pessoa/`;
    return this.http.delete(url.concat(id));

  }


}
