 

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
@Component({
  selector: 'edu-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile2Component implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.bioForm  =  this.formBuilder.group({
      fName: ['', Validators.required],
      lName:   ['',  Validators.required]  ,
      phone:   ['',  Validators.required]  ,
      sceenName:   ['',  Validators.required]  ,
      
   
    });
  }

  get formControls() { return this.bioForm.controls; }
  bioForm: FormGroup;

  formSubmit(){}

  //state >> inactive(default, so you can just leave it blank), active, completed

  //STEPPER START
  //main way to control stepper
  stepper = [
    { state: "completed", text: "Bio Details" },
    { state: "active", text: "Profile Picture" },
    { state: "", text: "Address" },
    { state: "", text: "Security" }
  ]

  isNotComplete(state){
    return state !== "completed"
  }
  //STEPPER END
}
