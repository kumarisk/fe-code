import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserExistService {

  constructor(private _http: HttpClient, private authenticationService: AuthenticationService) {

  }

  getAllUsers() {
    return this._http.get('http://104.211.229.17:8084/v1/user/getAll');
  }
  edit(userId, param) {
    return this._http.put('http://104.211.229.17:8084/v1/user/update/'+userId,param);
  }

  getUser(userId) {
    return this._http.put('http://104.211.229.17:8084/v1/user/deactivate/' +userId, {});



  }
  putUser(userId) {
    return this._http.put('http://104.211.229.17:8084/v1/user/activate/' + userId, {});
  }
}
