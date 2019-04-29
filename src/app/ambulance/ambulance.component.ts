import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { AmbulanceService } from 'src/app/ambulance/ambulance.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {
  ambulanceId:any;
  
 
  nextAmbId: string;

  AmbulanceForm: FormGroup;
  patName: any;
  fromLocation: any;
  toLocation: any;
  mobileNo: any;
  fromTime: any;
  driverName: any;
  // ambulanceNO: string;
  formData: any;
  
  constructor(private modalService: NgbModal,private _http:AmbulanceService,private fb:FormBuilder,private router: Router,private toastr: ToastrService) { 
    this.AmbulanceForm=fb.group({
      'patName':[null],
      'fromLocation':[null],
      'toLocation':[null],
      'mobileNo':[null],
      'fromTime':[null],
      'driverName':[null],
      'ano':[null],


    })
    
  }
  ano:string
  ngOnInit() {
    this.showId()
  }


  // refresh()
  // {
  //   location.reload()
  // }
  save(value: any)
  
  {


    // alert(this.ano)
    // alert("Services registered Successfully");
    // let data = input.value;
    // this.formData = input.value;
    let par = {
      "patName":this.patName,
      "fromLocation":this.fromLocation,
      "toLocation":this.toLocation,
      "mobileNo":this.mobileNo,
      "fromTime":this.fromTime,
      "driverName":this.driverName,
      "ambulanceNo":this.ano
  }
  this._http.postCreate(par)
     .subscribe(
     data => {
  //  this.ambulanceNO = data.ambulanceNO;
    console.log("data**" + JSON.stringify(data));
    
  
      },

   );
   this.router.navigate(['/ambulancelist'])
   this.toastr.success("Ambulance  registered  sucessfully ")
 }
  Id=[]
  showId() {
    this._http.getId()
      .subscribe(
        response => {

          this.Id = response;
          console.log("Id" + JSON.stringify(response));
          console.log(this.Id[1].nextAmbId);
        });
  }

   reset()
  {
    this.AmbulanceForm.reset()
  }
  refresh() {
   location.reload();
  }
 

  
  }