import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Usuarios } from 'src/assets/usuarios';
import { UsuarioService } from '../servicos/usuario.service';
import { HeaderComponent } from '../navegacao/header/header.component';

@Injectable({
    providedIn: 'root'
})

export class AutenticacaoService {
    public currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private usuario: Usuarios;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(usuario: Usuarios): Observable<any> {
        const url = `${environment.urlSkyMed}login`;
        return this.http.post<any>(url, usuario);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    trocarSenha(usuario: Usuarios): Observable<any> {
        const url = `${environment.urlSkyMed}usuario/trocarSenha`;
        return this.http.post<any>(url, usuario);
    }
}
