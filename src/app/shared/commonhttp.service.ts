//#region Import

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { MessageDataService } from './message.service';
import * as CryptoJS from 'crypto-js';
export interface Person { name: string; }

//#endregion
declare var webconfig: any;
@Injectable({
  providedIn: 'root'
})
export class CommonhttpService {


  baseURL: any;
  hebaseURL: any;
  username: string;
  password: string;
  ipUrl: string;
  myHeaders = new HttpHeaders();
  

  constructor(private _http: HttpClient,
    private router: Router,
  ) {
    this.baseURL = webconfig.baseURL;
    // this.hebaseURL = webconfig.hebaseURL;
    this.ipUrl = webconfig.ipUrl;

  }

  alreadyAuthinticate() {
    
    let AuthToken = sessionStorage.getItem('authToken');
    if (AuthToken != null && !this.myHeaders.has('Authorization')) {
      let token: string = 'Bearer ' + AuthToken;
      this.myHeaders = this.myHeaders.set('Authorization', token);
      this.myHeaders = this.myHeaders.set('Content-Type', 'application/json');
      this.myHeaders = this.myHeaders.set('Content-Disposition', 'multipart/form-data');
      // this.msgService.sendMessage({}, "login");
    }
    else if (AuthToken == null) {
      if (!window.location.hash.includes("#/login") || !window.location.hash.includes("")) {
        // this.msgService.sendMessage({}, "logout");
        this.router.navigateByUrl('/login',{
          state:{}
        })
      }
    }
  }


  httpPost(url: any, data: any) {
    let authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);
    if (url.includes("login")) {
      this.myHeaders = new HttpHeaders();
      this.myHeaders = this.myHeaders.set("Content-Type", "application/json");
      this.myHeaders = this.myHeaders.set("Access-Control-Allow-Origin", "*");
      this.myHeaders = this.myHeaders.set('Authorization', authorizationData);
      this.myHeaders.append('Access-Control-Allow-Origin', '*');

    }

    //this.myHeaders = this.myHeaders.append('Content-Type', 'multipart/form-data');
    return this._http.post(this.baseURL + url, data,
      {
        headers: this.myHeaders
      })
      .pipe(map((response: any) => {
        return this.authenticateResponse(response);
      }), catchError((error: HttpErrorResponse) => {
        return this.authenticateResponse('', error);
      }));
  }

  httpGet(url: any, params: HttpParams) {
    return this._http.get(this.baseURL + url,
      {
        headers: this.myHeaders,
        params: params
      })
      .pipe(map((response: any) => {
        return this.authenticateResponse(response);
      }), catchError((error: HttpErrorResponse) => {
        return this.authenticateResponse('', error);
      }));
  }
  
  httpPut(url: any, data: any) {
    if (url.includes("logout")) {
      this.myHeaders = new HttpHeaders();
      this.myHeaders = this.myHeaders.set("Content-Type", "application/json");
    }
    return this._http.put(this.baseURL + url, data,
      {
        headers: this.myHeaders
      })
      .pipe(map((response: any) => {
        return this.authenticateResponse(response);
      }), catchError((error: HttpErrorResponse) => {
        return this.authenticateResponse('', error);
      }));
  }

  httpPatch(url: any, data: any) {
    if (url.includes("logout")) {
      this.myHeaders = new HttpHeaders();
      this.myHeaders = this.myHeaders.set("Content-Type", "application/json");
    }
    return this._http.patch(this.baseURL + url, data,
      {
        headers: this.myHeaders
      })
      .pipe(map((response: any) => {
        return this.authenticateResponse(response);
      }), catchError((error: HttpErrorResponse) => {
        return this.authenticateResponse('', error);
      }));
  }

  authenticateResponse(response: any, error?: HttpErrorResponse) {
    if (error) {
      if (error.status >= 401 && error.status <= 499) {
        //this.msgService.sendMessage("", "logout"); // call logout 
        return;
      }
      else if (error.error.toString() == "[object Object]") {
        return throwError(error.error.text);
      }
      else if (error.error.toString() == "[object ProgressEvent]") {
        return throwError(error.statusText);
      }
      else if (error.error == null) {
        return throwError(error.statusText);
      }
      else {
        return throwError(error.error);
      }
    }
    else {
      return response;
    }

  }
 

  
}
