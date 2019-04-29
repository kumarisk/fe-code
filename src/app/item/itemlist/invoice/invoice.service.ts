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
export class InvoiceService {
  
  constructor(private _http: HttpClient) { }


  getProc(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/pharmacist/invoice/getApproved');
  }

  postCreate(procurementId,param): Observable<any> {
    console.log("Post"+JSON.stringify(param));
    
    return this._http.post('http://104.211.229.17:8084/v1/pharmacist/invoice/pay/'+procurementId, param);
 }
}
