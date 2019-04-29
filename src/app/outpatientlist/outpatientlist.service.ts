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
export class OutpatientlistService {
  headers = new Headers();
  constructor(private _http:HttpClient) { 

  }
 

  revisitValidity(regId):Observable<any>{
    return this._http.get('http://104.211.229.17:8084/v1/patient/revisits/'+regId)
  }
  blankprescription(regId,param):Observable<any>{
    return this._http.post('http://104.211.229.17:8084/v1/patient/revisits/'+regId,param)
  }
  editfeedetails(param):Observable<any>{
    console.log("Post"+JSON.stringify(param));
    
    return this._http.post('http://104.211.229.17:8084/v1/patient/consultant/change', param, );
  }
  getOutpatient(count):Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/patient/outPatient/'+count,);
 
  }
  getDoctorDetails():Observable<any> {
    return this._http.get(' http://104.211.229.17:8084/v1/patient/consultant',);
 
  }

  getConsultationFee(param): Observable<any> {
    
        console.log("get"+JSON.stringify(param));
        
        return this._http.post('http://104.211.229.17:8084/v1/patient/fee/docFee', param);
        ;
     }

  getFeeDetails(regId):Observable<any>
  {
    return this._http.get('http://104.211.229.17:8084/v1/patient/consultant/change/'+regId)
  }
  getAllBills(regId):Observable<any>
  {
    return this._http.get('http://104.211.229.17:8084/v1/patient/pdf/'+regId)
  }

  
 getservices(regId):Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/patient/patientlab/'+regId,);

}
getData():Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/patient/consultant',);

}
postList(parm):Observable<any> {
  console.log("Post"+JSON.stringify(parm));
  return this._http.post('http://104.211.229.17:8084/v1/patient/listbyconsultant',parm,);

}
  }