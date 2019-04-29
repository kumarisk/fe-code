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
export class ReturnService {
  
  constructor(private _http:HttpClient) { 

  }


  getDetails(bill_no): Observable<any> {
    
      return this._http.get('http://104.211.229.17:8084/v1/sales/return/find/'+bill_no);
    
      }


      editBill(param) : Observable<any>{     
        return this._http.post('http://104.211.229.17:8084/v1/sales/return/create',param);
      }
}