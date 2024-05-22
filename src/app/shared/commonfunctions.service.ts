import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CommonfunctionsService {

  constructor() { }


  static numbersOnly(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  static alphabetsOnly(event: any) {

    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8  || charCode == 32) {
      return true;
    }
    else {
      return false;
    }

    
  }





  static pointnumbersOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    const inputValue = event.target.value;
    if (
      (charCode > 31 && (charCode < 48 || charCode > 57)) &&
      (charCode !== 46 || inputValue.includes(".") || inputValue === "")
    ) {
      return false;
    }
    return true;
  }

  static numbersMultiPointOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    const inputValue = event.target.value;
    if (
      (charCode > 31 && (charCode < 48 || charCode > 57)) &&
      (charCode !== 46)
    ) {
      return false;
    }
    return true;
  }

  static alphanumericOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (
      (charCode > 47 && charCode < 58) ||
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode === 8 ||
      charCode == 32
    ) {
      return true;
    }
    return false;
  }

  static alphabetsAndSpaceOnly(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    const keyCode = event.keyCode;
   
    if (inputValue.length === 0 && keyCode === 32) {
        event.preventDefault(); 
    } else if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 122) && keyCode !== 32) {
        event.preventDefault(); 
    }
  }
  


  static ABC='secret key 123'
  static encrypt(data: string): string {
    let  secretKey = CommonfunctionsService.ABC
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
  }

  static  decrypt(encryptedData: string): string {
    let  secretKey = CommonfunctionsService.ABC
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}


