import { Component, OnInit } from '@angular/core';
import { Service } from "src/app/ospbilling/ospbilling.model";
import { OspbillingService } from "src/app/ospbilling/ospbilling.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import moment from 'moment/src/moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-ospbilling',
  templateUrl: './ospbilling.component.html',
  styleUrls: ['./ospbilling.component.css']
})
export class OspbillingComponent implements OnInit {
  closeResult: string;
  RegisterForm: FormGroup;
  constructor(private router: Router, private _http:OspbillingService,private modalService: NgbModal,private fb:FormBuilder,private toastr: ToastrService) {
    
    this.Register[0] = new Service();
    this.RegisterForm = fb.group({
      
      'patientName':[null],
      'mobile':[null],
      'refferedById':[null],
      'dob':[null],
      'enteredDate':[null],
      'paymentType':[null],
      'gender':[null],
      'years': [null],
      'months': [null],
      'days': [null],
          
    })
  
  }

  ngOnInit() {
    this.showDetails()
  }
  Register:Service[] = [];

Details=[]

show(ser)
{
  let par={
    "serviceName":
    ser.serviceName
  }
  
  this._http.getcost(par)
  .subscribe(
    response=>{

 ser.price= +(response.cost)
 ser.amount=(ser.price?ser.price:0)-(ser.discount)
  },

);
 
}


private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }

    
  }

  open2(basic2) {
    
 
      this.modalService.open(basic2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
private total = 0;
open1(basic) {
  this.total = 0;
  this.Register = this.Register.filter(sale => Object.keys(sale).length !== 0);
  this.Register.map(reg => this.total = this.total + reg.amount);

   this.modalService.open(basic, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }


calcAmount(ser) { 
if(ser.quantity){
  ser.amount=(ser.price?ser.price:0)*(ser.quantity)
}
if(ser.discount)
  {
    ser.amount=(ser.amount)-(ser.discount)
    
  }
 
 

   
  
}


calculateAge(event){
  
  let  d1=moment(event).format('DD/MM/YYYY');
  let years = moment().diff(moment(d1,'DD/MM/YYYY'), 'years');
  let months = moment().diff(moment(d1,'DD/MM/YYYY').add(years, 'years'), 'months');
  let days = moment().diff(moment(d1,'DD/MM/YYYY').add(years, 'years').add(months, 'months'),'days');
  this.RegisterForm.controls["years"].patchValue(years);
  this.RegisterForm.controls["months"].patchValue(months);
  this.RegisterForm.controls["days"].patchValue(days);
}

calcDoB(y:number=0, m:number=0, d:number=0) { 
  if(d > 31) {
    m = m + (d/31);//.toFixed(0);
    d = d%31;
  }
  if(m > 11) { 
    y = y + (m/12);//.toFixed(0);
    m = m %12;
  }
  this.RegisterForm.controls["years"].patchValue(y);
  this.RegisterForm.controls["months"].patchValue(m);
  this.RegisterForm.controls["days"].patchValue(d);
  this.dob = new Date(moment().subtract(y, 'years').subtract(m, 'months').subtract(d, 'days'));
}
onMedicineChange(event, ser) { 
  if(event==undefined)
    {ser.serviceName=null
      ser.amount =null
      ser.price =null
      ser.discount =null
      ser.quantity =null
    }
  ser.serviceName = event.serviceName;
 
}
  showDetails()
  {
    this._http.getdetails()
    .subscribe(
    response => {
    
   this.Details=response
  // console.log(this.Lab)
      console.log("services" + JSON.stringify(response));
  
    },);
  }
  referenceNumber:string
reset()
{
  this.RegisterForm.reset();
  this.Register = []; 
  this.Register[0] = new Service();
}
  addMore(event) { 
    this.Register.push(new Service());      
  }
  removeSaleItem(index) { 
  
    this.Register.splice(index, 1);    
  }
   minDate = new Date();
  patientName:string
  mobile:any
  refferedById:string
  dob:any
  enteredDate=new Date()
  paymentType:string
  gender:string
// saveprogress=false
  save()
  {
   let param= {
      
      "patientName":this.patientName,
      "mobile":this.mobile,
      "refferedById":this.refferedById,
      "dob":moment(this.dob).format('YYYY-MM-DD'),
      "enteredDate":moment(this.enteredDate).format('YYYY-MM-DD'),
      "paymentType":this.paymentType,
      "gender":this.gender,
      "refLaboratoryRegistrations":this.Register,
      "referenceNumber":this.referenceNumber,
      "multimode":[
        {
          "mode":"cash",
          "amount":+(this.cashamount)
        },
        {
          "mode":"card",
          "amount":+(this.cardamount)
        }],
       
        
        
      }

      // this.saveprogress=true
this._http.createservice(param)
.subscribe(
 response=>{

  window.open(response.fileuri);
  
   
      // this.router.navigate(["/osp?refresh=1"]);
      
console.log(response)
  },
  (err) => {
    
          this.toastr.error(err['error']?err['error'].message:'Error Occured!');
                 
            console.log(err.error)
                  },
            () =>{
              this.toastr.success("bill  generated sucessfully");
            
              location.reload(); 
         
            }
);

  }
  cardamount:number
  cashamount:number
  getcardamount()
  {
  

this.cardamount=(this.total)-(this.cashamount)
  }
  getcashamount()
  {
   
   
console.log(this.total)
this.cashamount=(this.total)-(this.cardamount)
  }
}
