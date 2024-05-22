import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignAuthService } from './sign-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomAuthGuardGuard implements CanActivate {
  //#region Common Method
  constructor(private authService: SignAuthService,
    private _router: Router,){

  }
  //#endregion

  //#region  Public Methods
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return true;
    // if (this.authService.isAuthenticated()) {
    //   
      
    //   // var requiredRole = route.data.role;
    //   // if (route.routeConfig.path == "dashboard") {
    //   //   requiredRole = sessionStorage['userRole']
    //   // }
    //   return true
           
    // }
    if(this.authService.isAuthenticated()){
      
      
        var requiredRole = route.data.role;
        if (route.routeConfig.path == "dashboard") {
          requiredRole = sessionStorage['userRole']
        }
        if (!requiredRole || this.authService.hasRole(requiredRole)) {
          return true;
        }
    }

    // If not authenticated or authorized, redirect to the login page or handle it as needed
   
    this._router.navigate(['/app-unauthorized']);
    // this._router.navigate(['/login']); // Redirect to the login page
    return false;
  }
  //#endregion
  
}
