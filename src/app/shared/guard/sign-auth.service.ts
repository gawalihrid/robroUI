
//#region Import
import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
//#endregion
@Injectable({
  providedIn: 'root'
})
export class SignAuthService {

  //#region Variables
  
  //#endRegion


  //#region common method
  constructor(private commonService: CommonService,
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {


  }
  //#endregion

  //#region methods
  login(loginDetails) {

    this.commonService.signIn(loginDetails).subscribe({
      next:(response) =>{
     
        if (response.success) {
          let loginData = response.data

          sessionStorage.setItem('loggedInUser', JSON.stringify(loginData[0]));
          sessionStorage.setItem('authToken', loginData[0].token)
          sessionStorage.setItem('userRole',loginData[0]['userRoleMap']['obj_role'][0]['role_name'])
          let userObj = {
            avatar: "assets/images/avatars/brian-hughes.jpg",
            email :loginDetails.email,
            id : "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
            name : "Brian Hughes",
            status : "online",
          }
          sessionStorage.setItem("user",JSON.stringify(userObj))
         
          // Redirect to dashboard page on successful login
          this.router.navigate(['/app-imagecapture']);
        }else{
          this._snackBar.open(response.message, 'Dismiss');
        }
      },
      error:(error) =>{
        this._snackBar.open("Invalid Email And Password", 'Dismiss');
      },
      complete:()=>{

      }
      
      })

  }

 public isAuthenticated(): boolean {
    
    // Check if the user is authenticated (e.g., by checking the presence of authToken)
    if(sessionStorage['authToken']){
      return true;
    }else{
      return false;
    }
    
  }

  hasRole(role: string): boolean {
    // Check if the user has the specified role (you may need to modify this based on your user model)
  
    let roleData  = sessionStorage.getItem('userRole')
    
  
    if(role == roleData){
      return true
    }else{
      return false
    }
    
        
  }
  //#endregion
}
