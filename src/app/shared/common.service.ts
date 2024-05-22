import { Injectable } from '@angular/core';
import { CommonhttpService } from './commonhttp.service';

import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _httpService: CommonhttpService) {

  }

  signIn(signInData) {
    let url = 'user/login';
    return this._httpService.httpPost(url, signInData);
  }
  createmodule(data) {
    let url = 'user/admin/createModule';
    return this._httpService.httpPost(url, data);
  }

  getAllUserData(){
    let url = 'user/getAllUser';
    return this._httpService.httpGet(url, new HttpParams());
  }
  getAllModule(){
    let url = 'user/admin/getAllModule';
    return this._httpService.httpGet(url, new HttpParams());
  }

  insertUpdateUser(data){
    let url = 'user/register';
    return this._httpService.httpPost(url, data);
  }

  deleteUser(data){
    let url = 'user/remove';
    return this._httpService.httpPost(url, data); 
  }

  insertImages(data){
    let url = 'user/addImages';
    return this._httpService.httpPost(url, data);
  }
  getAllImages(){
    let url = 'user/getImages';
    return this._httpService.httpGet(url, new HttpParams());
  }
}

