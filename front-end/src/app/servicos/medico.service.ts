import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicos } from 'src/assets/medicos';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  insereMedico(medico: Medicos): Observable<Medicos> {
    const url = `http://127.0.0.1:8080/medico/`;
    return this.http.post<Medicos>(url, medico);
  }
}
