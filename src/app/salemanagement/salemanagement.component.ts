import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalemanagementService } from "src/app/salemanagement/salemanagement.service";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { FormArray } from "@angular/forms";
// import {HotkeysService, Hotkey} from 'angular2-hotkeys';

import { ToastrService } from 'ngx-toastr'
import { SaleDetail, NewSale, Medicine, Patient, Temp } from './salesmanagement.model';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {BatchPipe} from './batch.pipe'
@Component({
  selector: 'app-salemanagement',
  templateUrl: './salemanagement.component.html',
  styleUrls: ['./salemanagement.component.css']
})
export class SalemanagementComponent implements OnInit {
  @ViewChild('basic') input: ElementRef;
  refSales: SaleDetail[] = [];
  newSale: NewSale;
  saveInProgress = false;
  // pay:Payment
  // medicines: Medicine[] = [];
  medicines = []

  Batches: Temp[] = []
  // private _hotkeysService: HotkeysService,
  // this.medicinePriceMap[item.medName] = item.mrp;
  patient: Patient = new Patient();
  closeResult: string;
  saleForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private _http: SalemanagementService, private router: Router, private toastr: ToastrService, private modalService: NgbModal) {

    this.refSales[0] = new SaleDetail();
    this.newSale = new NewSale();
  }

  ngOnInit() {
    this.saleForm = this.formBuilder.group({

    });
    this.prepareNewBill();
    //   this._hotkeysService.add(new Hotkey('ctrl+s', (event: KeyboardEvent): boolean => {
    //     if(!(this.newSale['location']) || this.newSale['location'].trim().length == 0) {
    //       this.toastr.warning("location is mandatory");
    //       return false;
    //     } else if(!this.patient.name || this.patient.name.trim().length == 0) { 
    //       this.toastr.warning("name is mandatory");
    //       return false;  
    //     } else if(!this.patient.mobile || this.patient.mobile.trim().length == 0) { 
    //       this.toastr.warning("mobile is mandatory");
    //       return false;
    //     } 
    //     this.showModal(this.input);
    //     return false; // Prevent bubbling
    // }));      
  }


  addMore(event) {
    // if (sale.quantity!=null)


    if (Object.keys(this.refSales[this.refSales.length - 1]).length > 0)
      this.refSales.push(new SaleDetail());
    // if (sale.quantity==null){
    //   this.toastr.error("please enter quanity")
    // }
  }


  onMedicineChange(event, sale) {
    if (event == undefined) {
      sale.quantity = null
      sale.mrp = null
      sale.Available = null
      sale.expDate = null
      sale.gst = null
      sale.discount = null
      sale.amount = null
      sale.batchNo = null
      sale.packSize = null
    }
    sale.medicineName = event.medName;
  }
  billNo: string;
  billDate: string;
  medicinePriceMap: object = {};
  medicineMap: object = {};
  mrpMap: object = {};
  batchMap: object = {};
  prepareNewBill() {
    this.refSales[0] = new SaleDetail();
    this.newSale = new NewSale();
    this._http.getBill()
      .subscribe(
      response => {
        this.billNo = response[0].billNo;
        this.billDate = response[0].date;
        this.medicines = response
        //  response.map(item => {
        //    this.medicines.push(new Medicine(item.batch, item.medName, item.mrp, item.expDate, item.gst));
        //    this.medicinePriceMap[item.medName] = item.mrp;
        //    this.medicineMap[item.medName] = {'gst':item.gst, 'mrp':item.mrp, 'batchNo': item.batch};
        //   });
      });
  }
  reset() {

    this.newSale = new NewSale();
    this.patient = new Patient();
    this.refSales = [];
    this.refSales[0] = new SaleDetail();


  }
  numericError: boolean = false;
  checkNumeric(event) {
    const pattern = /^[0-9]*$/;
    let inputChar = event.charCode;

    if (!pattern.test(event.target.value)) {
      this.numericError = true;
      event.preventDefault();
    } else {
      this.numericError = false;
    }
  }
  setIfValid(event) {
    // alert(event);
  }
  setDetails(sale: SaleDetail) {
    return;/*
      this.refSales.map(sale => { 
        this.medicines.map(m => {
        if(m.medName == sale.medicineName){ 
          m['disabled'] = true;
        } else { 
          m['disabled'] = false;
        }
        });
      }); 
      // sale.gst = this.medicineMap[sale.medicineName].gst;
      // this.getPriceBatch(sale);
      */
  }
  calcAmount(sale) {

    if (sale.quantity > sale.Available) {
      sale.quantity = 0;
      sale.quantity_error = true;
      return;
    }
    sale.quantity_error = false;
    if (sale.packSize) {
      sale['amount'] = ((sale.quantity) * (sale.mrp));
    }


    if (sale.discount)

      sale['amount'] -= sale['amount'] * (sale.discount) / 100.0;


  }

  removeSaleItem(index) {
    let sale = this.refSales[index];
    this.medicines.map(m => {
      if (m.medName == sale.medicineName) {
        m['disabled'] = false;
      }
    });
    this.refSales.splice(index, 1);
  }

  findPatient(event) {
    this._http.getPatient(this.newSale.regId).subscribe(user => {
      this.patient.name = user.name;
      this.patient.mobile = user.mobile;
      this.patient.type = user.type;
    },
      (err) => {

        this.toastr.error(err['error'] ? err['error'].message : 'Error Occured!');

      },
      () => {



      }
    );
  }

  showModal(basic: any) {
    // if(this.refSales.map(sale =>{if(sale.amount==0)
    //   {
    //     this.toastr.error("Amount is 0")
    //     this.refSales = []; 
    // this.refSales[0] = new SaleDetail();
    //   }}))
    this.newSale.paymentType = "Cash";
    this.refSales = this.refSales.filter(sale => Object.keys(sale).length !== 0);
    if (this.refSales.length == 0) {
      this.toastr.error("Please fill Medicine Details!");
      this.refSales = [];
      this.refSales[0] = new SaleDetail();
      return;
    }

    let total = 0;
    this.refSales.map(sale => total = ((total ? total : 0) + (sale.amount ? sale.amount : 0)));
    this.newSale.total = Math.round((total ? total : 0));
    this.newSale.refSales = this.refSales;

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

  // Batches:any=[]


  setBatches(sale) {

    let par = {


      "med": sale.medicineName



    }
    this._http.getBatch(par)
      .subscribe(
      response => {
        sale.quantity = null
        sale.mrp = null
        sale.Available = null
        sale.expDate = null
        sale.gst = null
        sale.discount = null
        sale.amount = null
        sale.batches = response.map(item => item.batch);
        sale.batchNo = sale.batches[0];
        this.setMedicineDetails(sale);
        this.calcAmount(sale)
        console.log("batches" + JSON.stringify(response));


      },


    );

  }

  // setBatches(sale)
  // {
  //   this._http.getBatch(sale.medicineName)
  //   .subscribe(
  //   response => {
  //     sale.quantity =null
  //     sale.mrp = null
  //     sale.Available =null
  //     sale.expDate =null
  //     sale.gst =null
  //     sale.discount =null
  //     sale.amount =null
  //     sale.batches = response.map(item => item.batch);
  //     sale.batchNo = sale.batches[0];
  //     this.setMedicineDetails(sale);
  //     this.calcAmount(sale)
  //    console.log("batches" + JSON.stringify(response));


  //   },


  // );

  // }

  // setMedicineDetails(sale)
  // {
  //   this._http.getMedicineDetails(sale.batchNo,sale.medicineName)
  //   .subscribe(
  //   response => {

  //    console.log("Medicines" + JSON.stringify(response));

  //    sale.mrp =((response.mrp)/(response.packSize));
  //    sale.Available=response.Available;
  //    sale.expDate=response.ExpDate
  //    sale.gst = response.Gst
  //    sale.packSize = response.packSize
  //    if( sale.quantity > sale.Available){
  //     sale.quantity = 0;
  //     sale.quantity_error = true;

  //     return;
  //   }
  //   sale.quantity_error = false;

  //   if(sale.packSize){
  //     sale['amount'] = (sale.quantity)*(sale.mrp);
  //   }

  //         if(sale.discount){
  //           sale['amount'] -= sale['amount']*(sale.discount)/100.0;
  //         }

  //   },
  //   (err) => {
  //     this.toastr.error("No Medicines available for this batch")
  //     sale.mrp = null
  //     sale.Available =null
  //     sale.expDate =null
  //     sale.gst =null
  //     sale.discount =null
  //     sale.amount =null
  //     sale.quantity =null
  //   }
  // );
  // }



  setMedicineDetails(sale) {

    let par = {


      "med": sale.medicineName,
      "batch": sale.batchNo



    }
    this._http.getMedicineDetails(par)
      .subscribe(
      response => {

        console.log("Medicines" + JSON.stringify(response));

        sale.mrp = ((response.mrp) / (response.packSize)).toFixed(2);
        sale.Available = response.Available;
        sale.expDate = response.ExpDate
        sale.gst = response.Gst
        sale.packSize = response.packSize
        if (sale.quantity > sale.Available) {
          sale.quantity = 0;
          sale.quantity_error = true;

          return;
        }
        sale.quantity_error = false;

        if (sale.packSize) {
          sale['amount'] = (sale.quantity) * (sale.mrp);
        }

        if (sale.discount) {
          sale['amount'] -= sale['amount'] * (sale.discount) / 100.0;
        }

      },
      (err) => {
        this.toastr.error("No Medicines available for this batch")
        sale.mrp = null
        sale.Available = null
        sale.expDate = null
        sale.gst = null
        sale.discount = null
        sale.amount = null
        sale.quantity = null
      }
      );
  }
  save() {
    this.saveInProgress = true
    if (this.newSale.regId == null) {
      this.newSale.name = this.patient.name,
        this.newSale.mobileNo = +(this.patient.mobile)
    }

    if (this.newSale.paymentType === "Cash+Card") {
      let multimode: any = []
      this.newSale.multimode.push({
        "mode": "cash",
        "amount": this.cashamount
      },
        {
          "mode": "card",
          "amount": this.cardamount.toString()
        })
    }
    this._http.post(this.newSale)
      .subscribe(
      data => {
        console.log("data**" + JSON.stringify(data));

        window.open(data.fileuri);
        //  location.reload();  

        //
        //this.router.navigate(['/sale']);
      },

      (err) => {
        this.saveInProgress = false
        this.toastr.error(err['error'] ? err['error'].message : 'Error Occured!');

      },
      () => {
        this.saveInProgress = false
        this.toastr.success("sales created sucessfully");
        location.reload()

      }
      );

  }


  cardamount: number
  cashamount: number
  amount: any
  total: number
  getcashamount() {

    this.amount = (this.newSale.total).toFixed(2)
    console.log(this.amount)
    this.cashamount = (this.amount) - (this.cardamount)
  }

  getcardamount() {

    this.amount = (this.newSale.total).toFixed(2)

    this.cardamount = (this.amount) - (this.cashamount)

  }
}


