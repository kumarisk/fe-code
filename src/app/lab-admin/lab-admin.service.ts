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
export class LabAdminService {
  
  constructor(private _http:HttpClient) { }


 getSerDetails() : Observable<any>{
  return this._http.get('http://104.211.229.17:8084/v1/lab/adminLab/approve');
}
serviceApprove(param): Observable<any>{     
  return this._http.put('http://104.211.229.17:8084/v1/lab/adminLab/approve',param);
}

getMeasures(serviceName,reg_id): Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/lab/report/'+serviceName+'/'+reg_id);
}

post(param): Observable<any> {
  console.log("Post"+JSON.stringify(param));
  
  return this._http.post('http://104.211.229.17:8084/v1/lab/service', param);


}

getReports(reg_id,serviceName): Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/lab/measure/'+reg_id+'/'+serviceName);
}
}
