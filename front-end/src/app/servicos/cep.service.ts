import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enderecos } from '../../assets/enderecos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  getEnderecoPeloCep(cep: string): Observable<Enderecos> {
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<Enderecos>(url);
  }
}
