import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { LabService } from "src/app/lab/lab.service";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr'
import { Service, Nikhil, } from "./lab.model";
import { Patient } from "./lab.model";


@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit { 
 
  closeResult: string;
  Register:Service[] = [];
  hello: Nikhil;
    constructor(private _http: LabService,private modalService: NgbModal,private toastr: ToastrService) {
    
          
          this.hello = new Nikhil();
        }
  
   
Lab=[];
referenceNumber:string
serviceName:string
serviceId:string
discount:number
  ngOnInit() {
   
    this.showLabServices()
   
  }



showLabServices()
{
  this._http.getServices()
  .subscribe(
  response => {
  
this.Lab=response
console.log(this.Lab)
    console.log("services" + JSON.stringify(response));

  },);
}

addMore(event) { 
  this.Register.push(new Service());      
}


Price=[]

regid:string
paymentType:string="Cash"
Cost=[];
array=[]
show(ser)
{
 
  this.Lab.map(lab => { 
  this.Register.map(ser => {
  
    if(lab.serviceName == ser.serviceName) { 
      lab['disabled'] = true;
    } else { 
      lab['disabled'] = false;
    }
    });
  });
  this._http.getCost(ser.serviceName,this.hello.regid)
  .subscribe(
    response=>{
ser.amount= +(response.cost)

  // ser.total = ser.price-ser.price*(ser.discount || 0)/100;
  ser.total = ser.amount-(ser.discount)
 
  },

);

}


onMedicineChange(event, ser) { 
  if(event==undefined)
    {
      ser.amount =null
      ser.total =null
      ser.discount =null
      ser.quantity =1
    }
  ser.serviceName = event.serviceName;
 
}
patient: Patient = new Patient();

saveprogress=false;
save(value:any,)
{
  this.saveprogress=true
  let param=
  {
    
   
	 "reg_id":this.hello.regid,
   "invoiceNo":this.Lab[2].invoice,
   "paymentType":this.paymentType,
"referenceNumber":this.referenceNumber,
   "multimode":[
    {
      "mode":"Cash",
      "amount":+(this.cashamount)
    },
    {
      "mode":"Card",
      "amount":this.cardamount
    }
    
    ],
   "refLaboratoryRegistrations":

this.Register
}

  
// this.saveprogress=true;
  this._http.postCreate(param)
  .subscribe(
  data => {

    console.log("data**" + JSON.stringify(data));
    window.open(data.fileuri);
    
        location.reload(); 

       this.saveprogress = false;

   } ,
  
  
  
(err) => {
  this.toastr.error(err['error']?err['error'].message:'Error Occured!');
    this.saveprogress = false;
  },
  ()=>
  {
    this.saveprogress = false;
  this.toastr.success("Bill successfull ")
 
  location.reload()
 

  }
);

  
  

  }


  reset() { 
    this.hello = new Nikhil();
   this.patient =new Patient();
    this.Register = []; 
    this.Register[0] = new Service();
   }
   
  type:string
invoice:string
cost:any
 
   private getDismissReason(reason: any): string {
   
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
 
     
   }
 

  //  showPdf(regid,invoice)
  //  {
  //    alert(this.invoice)
  //    this._http.getInvoice(this.regid,this.invoice)
  //    .subscribe(
  //   data => {
  //     window.open(data.fileuri);
      
  //        location.reload();
  //      console.log("data" + JSON.stringify(data));
    
  //    },
 
     
  //   );
  
    
  //  }

    
  dropdown=[]
showServices()
{
  this._http.getservicesdropdown(this.hello.regid)
  .subscribe(
  response => {
  
this.dropdown=response
console.log(this.dropdown)
    console.log("services" + JSON.stringify(response));

  },);
}
   Medicine=[]
// hai(i)
// {
//    this.Medicine.push( { "serviceName":this.serviceName,
//    "discount":+(this.Lab[i].discount),
//    })

//    console.log(this.Medicine)
//   }



 
  removeSaleItem(index) { 
    let reg = this.Register[index];
    this.Lab.map(lab => { 
      if(lab.serviceName == reg.serviceName) { 
        lab['disabled'] = false;
      }
    });
    this.Register.splice(index, 1);    
  }

  findPatient(event) { 
    this._http.getPatient(this.hello.regid).subscribe( user => { 
      this.patient.name = user.name;
      this.patient.type = user.type;
      this.Register[0] = new Service();
    },  
    (err) => {
      this.toastr.error(err['error']?err['error'].message:'Error Occured!');
      
      },
      ()=>
      {
  
      });
  }


  calcAmount(ser) { 
    // ser.total = ser.price-ser.price*(ser.discount || 0)/100;
    if(ser.quantity)
      {
        ser.total=(ser.quantity)*(ser.amount)
      }
      if(ser.discount){
        ser.total = ser.total-(ser.discount)
      }
   
  }


private total = 0;
  open1(basic) {
    this.total = 0;
    this.Register = this.Register.filter(sale => Object.keys(sale).length !== 0 );
    this.Register.map(reg => this.total = this.total +(reg.total?reg.total:0));

     this.modalService.open(basic, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
 
  
   open2(basic2) {
   

     this.modalService.open(basic2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
 
   cardamount:number
   cashamount:number
   amount:any
   getcashamount()
   {
    
       this.amount= this.total
 console.log(this.amount)
 this.cashamount=(this.amount-(this.cardamount))
   }
 
   getcardamount()
   {
   
       this.amount= this.total
 
 this.cardamount=(this.amount-(this.cashamount))
   }
}