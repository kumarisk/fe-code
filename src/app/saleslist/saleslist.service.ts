import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SaleslistService {

  constructor(private _http:HttpClient) { }
  //Overall List
  getAll(count): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/sales/saleslist/'+count);
  }
  //displaying  Medicine Name
  getMed(billNo): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/sales/getMedByBillNo/'+billNo);
  }
  //pdf
  getPdf(billNo): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/sales/pdf/'+billNo);
  }
  getBatch(medName): Observable<any>{

    return this._http.get( 'http://104.211.229.17:8084/v1/sales/batch/'+ medName, 
   );
   }
   getMedicineDetails(batchNo,medName): Observable<any>{
    return this._http.get('http://104.211.229.17:8084/v1/sales/batch/avilable/'+batchNo+'/'+medName);
  
  }
}
