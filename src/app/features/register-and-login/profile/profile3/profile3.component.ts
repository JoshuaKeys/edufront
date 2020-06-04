import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
@Component({
  selector: 'edu-profile3',
  templateUrl: './profile3.component.html',
  styleUrls: ['./profile3.component.scss', './file-upload.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile3Component implements OnInit {

  constructor(private formBuilder:FormBuilder, private cd :ChangeDetectorRef) { }

  ngOnInit(): void {
    this.addressForm  =  this.formBuilder.group({
   
   
    });
  }

  get formControls() { return this.addressForm.controls; }
  addressForm: FormGroup;

  formSubmit(){}


  //state >> inactive(default, so you can just leave it blank), active, completed

  //STEPPER START
  //main way to control stepper
  stepper = [
    { state: "completed", text: "Bio Details" },
    { state: "completed", text: "Profile Picture" },
    { state: "active", text: "Address" },
    { state: "", text: "Security" }
  ]

  isNotComplete(state){
    return state !== "completed"
  }
  //STEPPER END
}
