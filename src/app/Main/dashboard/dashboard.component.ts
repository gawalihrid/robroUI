import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isUserAdmin : boolean = false
  constructor(private router: Router){

    if(sessionStorage.userRole == "Admin"){
      this.isUserAdmin =  true
    }else{
      this.isUserAdmin =  false
    }
  }
  ngOnInit(): void {  
    if (!localStorage.getItem('foo')) { 
     localStorage.setItem('foo', 'no reload') 
     location.reload() 
   } else {
     localStorage.removeItem('foo') 
   }
  }

  redirectToUserPage() {
    this.router.navigate(['/app-user']);
  }


  redirectToImageCapture() {
    this.router.navigate(['/app-imagecapture']);
  }


}
