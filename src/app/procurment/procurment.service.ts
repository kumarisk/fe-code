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
export class ProcurmentService {

  constructor(private _http: HttpClient) { }



  getAllMed() : Observable<any>{
    return this._http.get('http://104.211.229.17:8084/v1/pharmacist/medicine/getAll');
  }

  postCreate(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post('http://104.211.229.17:8084/v1/pharmacist/procurement/create', param);
    ;
  }

  getProc(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/pharmacist/procurement/create');
  }



  getManf(name) {

    return this._http.get('http://104.211.229.17:8084/v1/pharmacist/batch/manufacturer/' + name, {

    })


  }

getDraftDetails(in_num):Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/pharmacist/procurement/draft/'+in_num);
}


  getId(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/pharmacist/medicine/create');
  }

  post(param): Observable<any> {
    console.log("Post" + JSON.stringify(param));

    return this._http.post('http://104.211.229.17:8084/v1/pharmacist/medicine/create', param);
    ;
  }
}
