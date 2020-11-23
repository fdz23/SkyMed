import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from 'src/assets/usuarios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  obtemUsuario(usuario: Usuarios): Observable<Usuarios> {
    const url = `${environment.urlSkyMed}usuario/login`;
    return this.http.post<Usuarios>(url, usuario);
  }
}
