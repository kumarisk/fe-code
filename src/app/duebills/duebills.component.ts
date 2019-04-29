import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { ToastrService } from 'ngx-toastr'
import { DuebillsService } from './duebills.service';
import { resetApplicationState } from '@angular/core/src/render3/instructions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-duebills',
  templateUrl: './duebills.component.html',
  styleUrls: ['./duebills.component.css']
})
export class DuebillsComponent implements OnInit {
  closeResult: string;

  UMRno: any;
  mobileno: any;
  name: any;
  type: any;
  InventoryForm: FormGroup;
  dueType: any;
  Payment: any="Cash";
  regNo: any;
  billNo: any;
  saleDate: any;
  regno: any;

  typeas: any;
  cashamount: any;
  cardamount: any;
  total: any;
  // DueFor: any;
  dueFor: any;
  umr: any;
  constructor(private fb: FormBuilder, private _http: DuebillsService, private toastr: ToastrService, private modalService: NgbModal) {


    this.InventoryForm = fb.group({
      'UMRno': [null],
      'mobileno': [null],
      'name': [null],
      'type': [null],
      'typeas': [null],
      'patientregid': [null],
      'umr': [null],
      'patientName': [null],
      'dueFor': [null],
    })

  }

  ngOnInit() {
    this.showAll()
  }

  // findPatient()
  //  {


  //   this._http. getpatient(this.UMRno)
  //    .subscribe(

  //         response => {



  //           this.mobileno=response[0].mobileNo
  //           this.name=response[0].pName


  //           console.log("UMR" + JSON.stringify(response));


  //        });



  //  }




  // findbyPatient()
  // {


  //  this._http. getreg()
  //   .subscribe(

  //        response => {






  //          console.log("UMRno" + JSON.stringify(response));


  //       });



  // }

  //  Doc:[any];
  //  saveas()

  //  {



  //    let par = {
  //      "dueType":this.type,

  //  }
  //  this._http.postCreate(this.UMRno,par)
  //     .subscribe(
  //     data => {
  //       this.Doc = data;

  //    console.log("data**" + JSON.stringify(data));



  //      },

  //   );

  //     }

  saveas() {



    let par = {
      "dueType": this.type,

    }
    this._http.postref(par)
      .subscribe(
      data => {
        this.alist = data;

        console.log("data**" + JSON.stringify(data));



      },

    );

  }
  referenceNumber:string
  save(value: any) {

    //  if(this.regno!=null)
    //  {
    //    this.type=this.typeas
    //  }

    let par = {

      "dueFor": this.dueFor,
      "mode": this.Payment,
      "amount": this.amount,
      "referenceNumber":this.referenceNumber,
      "multimode": [
        {
          "mode": "cash",
          "amount": +(this.cashamount)
        },
        {
          "mode": "card",
          "amount": +(this.cardamount)
        }],

    }

    this._http.post(this.billno, par)
      .subscribe(
      data => {

        console.log("data**" + JSON.stringify(data));
        window.open(data.fileuri)
        location.reload();
      },
 
      (err) => {
        this.toastr.error(err['error']?err['error'].message:'Error Occured!');
        
        },
        ()=>
        {
     
          this.toastr.success("paid sucessfully ")
      //  location.reload()
        }
    );
  }




  billno: number
  amount: number
  open(basic, data) {
    this.billno = data.billno
    this.amount = data.amount
    this.dueFor = data.dueFor
    this.modalService.open(basic, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }


  }
  filter:any
  reset() {
    this.InventoryForm.reset()
    this.regNo = null
    this.billno = null
    this.saleDate = null
    this.amount = null
    // this.alist = null
    this.filter =null

  }






  getcashamount() {


    console.log(this.amount)
    this.cashamount = (this.amount - (this.cardamount))
  }

  //    getcardamount()
  //    {

  //        this.amount= this.total

  //  this.cardamount=(this.amount-(this.cashamount))
  //    }

  getcardamount() {


    this.cardamount = (this.amount - (this.cashamount))
  }




  alist = []
  showAll() {
    this._http.getfull()
      .subscribe(
      data => {
        this.alist = data
        console.log(" data " + JSON.stringify(data));
      }
      )


  }
}