import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers:[{provide:CdkStepper,useExisting:StepperComponent}]
})
export class StepperComponent extends CdkStepper  {
  // constructor(private _formBuilder: FormBuilder) {}
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // isEditable = false;




  @Input() linearModeSelected  : boolean;

  ngOnInit() {
    this.linear = this.linearModeSelected;
  }


  onClick(index:number){
    this.selectedIndex = index;
    console.log("this.selectedIndez => " + this.selectedIndex)
  }


}
