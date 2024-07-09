import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../../../shared/constant/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  registerRequest(data: any) {
    return this.http.post(ApiConstants.BASE_URL + ApiConstants.AUTH.REGISTER, data);
  }

  loginRequest(data: any) {
    return this.http.post(ApiConstants.BASE_URL + ApiConstants.AUTH.LOGIN, data);
  }

  getUserInfoRequest() {
    return this.http.get(ApiConstants.BASE_URL + ApiConstants.USER.USER_INFO);
  }

  sendQuestionRequest(data: any) {
    return this.http.post(ApiConstants.BASE_URL + ApiConstants.USER.QUESTION, data);
  }
}
