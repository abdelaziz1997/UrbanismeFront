import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: 'root'
})
export class AdminGaurdService implements CanActivate {

  private roles: string[];

  constructor(private router: Router,
    private token: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  	if (this.token.isUserLoggedIn()) {
		this.roles = this.token.getAuthorities();
		console.log(this.roles);
		console.log(this.roles[0]);
		if (this.roles[0] !== 'ROLE_ADMIN') {
			this.router.navigate(['/error/403']);
		}
		return true;
	}
    this.router.navigate(['/auth/login']);
    return false;

  }

}
