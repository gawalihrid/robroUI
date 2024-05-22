//#region Import
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'app/shared/common.service';
import { SignAuthService } from 'app/shared/guard/sign-auth.service';
//#endRegion
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  //#region Variable
  loginForm: FormGroup;
  errorMessage: string = '';
  passwordVisible: boolean = false;
  
  // Hard-coded credentials
  credentials = [
    { username: 'user1', password: 'password1', name: 'User One' },
    { username: 'engghead@gmail.com', password: 'Test@123', name: 'Egg Head' },
    { username: 'gmofinance@gmail.com', password: 'Test@123', name: 'GMO Finance' },
    { username: 'locationhead@gmail.com', password: 'Test@123', name: 'Location Head' },
    { username: 'cppowner@gmail.com', password: 'Test@123', name: 'Cpp Evolution Finance Owner ' },
    { username: 'manufacturinhead@gmail.com', password: 'Test@123', name: 'Manufacturing Head' },
    { username: 'projecthead@gmail.com', password: 'Test@123', name: 'Project Head' },
    { username: 'famhead@gmail.com', password: 'Test@123', name: 'FAM Head' },
    { username: 'bufinance@gmail.com', password: 'Test@123', name: 'BU Finance' },
    { username: 'crmdoafam@gmail.com', password: 'Test@123', name: 'CRM DoA FAM ' },
    { username: 'ceocfo@gmail.com', password: 'Test@123', name: 'CEO & CFO' },
    { username: 'micdoafam@gmail.com', password: 'Test@123', name: 'MIC DoA FAM ' },

  ];
  dialogRef: any;

  //#endRegion

  //#region Common function 
  constructor(private router: Router, 
    private _snackBar: MatSnackBar,
    private commonService: CommonService,
    private authService: SignAuthService) {
      sessionStorage.clear()
    
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  //#endRegion

  //#region Method
  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(this.loginForm.value)
      
    } else {
      this._snackBar.open('Please enter username and password', 'Dismiss');
    }
  }

  togglePasswordVisibility(checked: any) {
    this.passwordVisible = checked.checked;
  }
  //#endRegion
}
