import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { DashboardComponent } from './Main/dashboard/dashboard.component';

import { LoginComponent } from './Main/login/login.component';
// import { CustomAuthGuard } from './shared/guard/auth.guard';


import { CustomAuthGuardGuard } from './shared/guard/custom-auth-guard.guard';
import { UnauthorizedComponent } from './Main/unauthorized/unauthorized.component';
import { ImagecaptureComponent } from './Main/imagecapture/imagecapture.component';
import { UserComponent } from './Main/user/user.component';
import { SampleoneComponent } from './Main/sampleone/sampleone.component';
import { SampletwoComponent } from './Main/sampletwo/sampletwo.component';


// import { AuthGuard } from './shared/guard/auth.guard';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'login'},
    {path:'login', component:LoginComponent},
    
    
    {path: 'login', pathMatch : 'full', redirectTo: 'login'},

    

    // Admin routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

         
            {path:'dashboard', component:DashboardComponent ,canActivate:[CustomAuthGuardGuard],data:{role:''}},
            {path:'app-imagecapture', component:ImagecaptureComponent ,canActivate:[CustomAuthGuardGuard],data:{role:'NA'}},
            {path:'app-user', component:UserComponent ,canActivate:[CustomAuthGuardGuard],data:{role:'NA'}},
            {path:'app-sampleone', component:SampleoneComponent ,canActivate:[CustomAuthGuardGuard],data:{role:'NA'}},
            {path:'app-sampletwo', component:SampletwoComponent ,canActivate:[CustomAuthGuardGuard],data:{role:'NA'}},
            {path: 'app-unauthorized', component: UnauthorizedComponent,canActivate:[CustomAuthGuardGuard],data:{role:''}  },
            
           


            // 404 & Catch all
           
            {path: '**', redirectTo: 'login'}
        ]
    },

  

];


if (sessionStorage['loggedInUser'] != undefined || sessionStorage['loggedInUser'] != null) {
    
    var data = JSON.parse(sessionStorage['loggedInUser'])
  
    var role_name: string = ''
    
    if (data['userRoleMap']['obj_role'].length != 0) {

        if (data['userRoleMap']['obj_role'].length != 0) {
            role_name = data['userRoleMap']['obj_role'][0]['role_name']
        } else {
            role_name = "UnAuthorized"
        }


    } else {
        role_name = "UnAuthorized"
    }

    if (data['userRoleMap']['obj_module'] != undefined || data['userRoleMap']['obj_module'] != null) {

        for (let item of data['userRoleMap']['obj_module']) {

            if (item.module_path != null) {
                let data2 = appRoutes[3]['children'].findIndex((x: any) => x.path == item.module_path)

                if (data2 >= 0) {
                   
                    if(role_name !=undefined ||role_name != null){
                        appRoutes[3]['children'][data2]['data'].role = role_name
                      
                    }else{
                        appRoutes[3]['children'][data2]['data'].role = 'UnAuthorized'
                       
                    }
                   
                  
                }
            }

        }

    }
   
} else {

}

