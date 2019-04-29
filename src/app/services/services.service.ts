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
export class ServicesService {

  constructor(private _http:HttpClient) { }

  
  postCreate(param): Observable<any> {
    console.log("Post"+JSON.stringify(param));

    return this._http.post('http://104.211.229.17:8084/v1/service/create', param);
}


getService(): Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/service/getservices');
}
getId(): Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/service/getid');
}

getserviceslist():Observable<any>{
  return this._http.get('http://104.211.229.17:8084/v1/service/getservicelist')
}

// edit(serviceId,param){     
//   return this._http.put('http://104.211.229.17:8084/v1/service/update'+serviceId,param,{
//     headers: this.headers
//     })

 

//    .map(res => res.json());
// }
}

 