import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http'
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private _http: HttpClient) { }
  private url = "http://104.211.229.17:8084/v1/user/create";
  postCreate(param) :Observable<any> {

    console.log("Post" + JSON.stringify(param));

    return this._http.post(this.url, param);

  }
  getUserId():Observable<any> {

    return this._http.get(this.url);

  }
  
  post(param): Observable<any> {
    
        console.log("Post"+JSON.stringify(param));
        
        return this._http.post('http://104.211.229.17:8084/v1/user/speacialization', param);
        ;
     }
}
