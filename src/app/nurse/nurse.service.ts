import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
 import 'rxjs/add/operator/map';
 import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class NurseService {

  constructor(private _http:HttpClient) { }
headers=new Headers();

  getData(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/nurse/getAll');
  }

 post(param): Observable<any> {
  console.log("Post"+JSON.stringify(param));
  
  return this._http.post('http://104.211.229.17:8084/v1/doctor/create/notes', param);
  ;
}

getNotes(regNo): Observable<any> {
  return this._http.post('http://104.211.229.17:8084/v1/doctor/notes/'+regNo,{});
}

post1(param): Observable<any> {
  console.log("Post"+JSON.stringify(param));
  
  return this._http.post('http://104.211.229.17:8084/v1/doctor/create/pharmacyNotes', param);
}
}
