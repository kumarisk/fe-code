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
export class WardonlineService {

  constructor(private _http: HttpClient) { }

  headers = new Headers();
  getBill(): Observable<any> {

    return this._http.get('http://104.211.229.17:8084/v1/sales/create', {

    });


  }



getMedicineDetails(param): Observable<any>{
  return this._http.post('http://104.211.229.17:8084/v1/sales/batch/avilable',param);

}
  getBatch(param): Observable<any> {

    return this._http.post('http://104.211.229.17:8084/v1/sales/batch', param,
    );
  }


  post(param) : Observable<any>{
    console.log("Post"+JSON.stringify(param));
    
    return this._http.post('http://104.211.229.17:8084/v1/sales/ward/create', param, 
)
   ;
    ;
 }
}
