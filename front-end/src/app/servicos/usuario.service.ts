import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoas } from 'src/assets/pessoas';
import { Usuarios } from 'src/assets/usuarios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  obtemUsuario(usuario: Usuarios): Observable<Usuarios> {
    const url = `${environment.urlSkyMed}usuario/obtemUsuario`;
    return this.http.post<Usuarios>(url, usuario);
  }

  obtemUsuarioPorEmail(email: any): Observable<any> {
    const url = `${environment.urlSkyMed}usuario/`;
    return this.http.get<Usuarios[]>(url.concat(email));
  }

  autenticaUsuario(usuario: Usuarios): Observable<Usuarios>{

    const url = `${environment.urlSkyMed}usuario/autenticaConta`;
    return this.http.put<Usuarios>(url, usuario);

  }
}
