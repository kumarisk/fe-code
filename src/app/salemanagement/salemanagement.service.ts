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
export class SalemanagementService {
  headers = new Headers();

  constructor(private _http:HttpClient) { }


  getBill(): Observable<any> {
    
        return this._http.get( 'http://104.211.229.17:8084/v1/sales/create', {
     
        });
      
    
      }
  getPatient(regId: string): Observable<any> {
    return this._http.get( 'http://104.211.229.17:8084/v1/patient/'+regId, 
     );
  }    

      getMed(medName): Observable<any> {
        
            return this._http.get( 'http://104.211.229.17:8084/v1/sales/return/findMed/'+ medName, 
        );
           
        
          }

        //  getBatch(medName): Observable<any>{

        //   return this._http.get( 'http://104.211.229.17:8084/v1/sales/batch/'+ medName, 
        //  );
        //  }
          
   
        getBatch(param): Observable<any>{
          
                    return this._http.post( 'http://104.211.229.17:8084/v1/sales/batch',param, 
                   );
                   }
                    
    
  post(param) : Observable<any>{
    console.log("Post"+JSON.stringify(param));
    
    return this._http.post('http://104.211.229.17:8084/v1/sales/create', param, 
)
   ;
    ;
 }

getMedicineDetails(param): Observable<any>{
  return this._http.post('http://104.211.229.17:8084/v1/sales/batch/avilable',param);

}

  postCreate(param): Observable<any> {
    
    return this._http.post('http://104.211.229.17:8084/v1/sales/getmrp', param, 
  )
    ;
 }
getMrp(param): Observable<any> 
{
   return this._http.post('http://104.211.229.17:8084/v1/sales/getMedPro',param)
}


// getMedicineDetails(batchNo,medName): Observable<any>{
//   return this._http.get('http://104.211.229.17:8084/v1/sales/batch/avilable/'+batchNo+'/'+medName);

// }

}