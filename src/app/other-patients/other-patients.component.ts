import { Component, OnInit } from '@angular/core';
import { OtherPatientsService } from "src/app/other-patients/other-patients.service";

@Component({
  selector: 'app-other-patients',
  templateUrl: './other-patients.component.html',
  styleUrls: ['./other-patients.component.css']
})
export class OtherPatientsComponent implements OnInit {

  constructor(private _http:OtherPatientsService) { }

  ngOnInit() {
  }
  count: string = "2"
  public loading = false;
  other:any=[]
  p: number = 1
  showOtherpatients() {
    this.loading = true;
    this._http.getotherpatient(this.count)
      .subscribe(
      data => {

        this.loading = false
  this.other=data
        console.log(" other patient list " + JSON.stringify(data));


      },

    );

  }

}
