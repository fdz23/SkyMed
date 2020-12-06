import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AutenticacaoService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token_autenticacao) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token_autenticacao}`
                }
            });
        }

        return next.handle(request);
    }
}
