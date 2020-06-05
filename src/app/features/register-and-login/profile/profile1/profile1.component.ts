import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
@Component({
  selector: 'edu-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile1Component implements OnInit {

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
    { state: "active", text: "Bio Details" },
    { state: "", text: "Profile Picture" },
    { state: "", text: "Address" },
    { state: "", text: "Security" }
  ]

  isNotComplete(state){
    return state !== "completed"
  }
  //STEPPER END
}
