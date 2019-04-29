import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class BedallocationService {

  constructor(private _http:HttpClient) { }
  

  getFloors(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/bed/floors/ward');
  }
  getBeds(floor): Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/bed/floor/'+ floor);
}


}