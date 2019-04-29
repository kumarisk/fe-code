import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
 import 'rxjs/add/operator/map';
 import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _http:HttpClient) { }



  getData(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/sales/getReport');
  }




  postDetails(param): Observable<any> {
  
    console.log("Post"+JSON.stringify(param));
    
    return this._http.post('http://104.211.229.17:8084/v1/sales/getReport', param);
    ;
 }



}
