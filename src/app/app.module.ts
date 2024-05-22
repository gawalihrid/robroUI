import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { DashboardComponent } from './Main/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRippleModule} from '@angular/material/core';
import { QuillModule } from 'ngx-quill';
import { LoginComponent } from './Main/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { UnauthorizedComponent } from './Main/unauthorized/unauthorized.component';
import { ImagecaptureComponent } from './Main/imagecapture/imagecapture.component';
import { UserComponent } from './Main/user/user.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { SampleoneComponent } from './Main/sampleone/sampleone.component';
import { SampletwoComponent } from './Main/sampletwo/sampletwo.component';

registerLocaleData(en);



const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({

    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000},},
      
       
      ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        UnauthorizedComponent,
        ImagecaptureComponent,
        UserComponent,
        SampleoneComponent,
        SampletwoComponent,
       
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        MatIconModule,
        MatProgressBarModule,
        MatTabsModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDividerModule,
        MatTooltipModule,
        MatRadioModule,
        MatCardModule,
        MatTableModule,
        MatSnackBarModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        FormsModule,
        MatNativeDateModule,
        MatRippleModule,
        QuillModule,
        MatDialogModule,
        MatMenuModule,
        MatSortModule,
        HttpClientModule,
        
        
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
