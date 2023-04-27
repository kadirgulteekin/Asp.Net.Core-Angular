import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService:AccountService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.accountService.currentUser$.pipe(
      map(token=>{
        if(token){
          return true;
        }
        this.router.navigateByUrl("/account/login");
        return false;
      })
    )
  }
}
