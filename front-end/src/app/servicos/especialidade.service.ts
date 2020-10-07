import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidades } from 'src/assets/especialidades';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor(private http: HttpClient) { }

  insereEspecialidade(especialidade: Especialidades): Observable<Especialidades> {
    const url = `http://127.0.0.1:8080/especialidade/`;
    return this.http.post<Especialidades>(url, especialidade);
  }
}