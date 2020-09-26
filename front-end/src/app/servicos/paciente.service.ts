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


}
