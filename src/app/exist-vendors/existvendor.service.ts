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
export class ExistvendorService {
  
  constructor(private _http: HttpClient) {



  }

  getVendors() : Observable<any>{
    return this._http.get('http://104.211.229.17:8084/v1/pharmacist/vendor/getAll');
  }


  edit(vendorId,param): Observable<any>{    
    
        return this._http.put('http://104.211.229.17:8084/v1/pharmacist/vendor/update/'+vendorId,param);
    }
}

