import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminGaurdGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAdmin();
  }

  checkAdmin(): Observable<boolean> {

    return this.accountService.currentUser$.pipe(map(user => {

      console.log(user)
      if (user.roles.includes('Admin') || user.roles.includes('Moderator')) {
        return true;
      }

      this.toastr.error("unauthenticated user")
    }))



  }


}
