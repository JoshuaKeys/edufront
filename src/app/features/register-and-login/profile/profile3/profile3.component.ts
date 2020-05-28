import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
@Component({
  selector: 'edu-profile3',
  templateUrl: './profile3.component.html',
  styleUrls: ['./profile3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile3Component implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.addressForm  =  this.formBuilder.group({
      address: ['', Validators.required],
      country:   ['',  Validators.required]  ,
      zip:   ['',  Validators.required]  ,
      state:   ['',  Validators.required]  ,
      city:   ['',  Validators.required]  ,
      
   
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
