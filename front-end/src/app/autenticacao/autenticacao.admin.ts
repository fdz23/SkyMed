import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AutenticacaoService } from './autenticacao.service';

@Injectable({ providedIn: 'root' })
export class AutenticacaoAdmin implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AutenticacaoService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.ehAdmin) {
            return true;
        }

        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
