 import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
@Component({
  selector: 'edu-profile4',
  templateUrl: './profile4.component.html',
  styleUrls: ['./profile4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile4Component implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.addressForm  =  this.formBuilder.group({
      question1: ['', Validators.required],
      answer1:   ['',  Validators.required]  ,
      question2:   ['',  Validators.required]  ,
      answer2:   ['',  Validators.required]  ,    
   
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
    { state: "completed", text: "Address" },
    { state: "active", text: "Security" }
  ]

  isNotComplete(state){
    return state !== "completed"
  }
  //STEPPER END
}
