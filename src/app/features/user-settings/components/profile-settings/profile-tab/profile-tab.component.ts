import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,  Validators, FormGroup } from "@angular/forms";
@Component({
  selector: 'edu-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileTabComponent implements OnInit {

  
  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.userDetailForm  =  this.formBuilder.group({
      fName: ['', Validators.required],
      lName:   ['',  Validators.required]  ,
      mName:   ['',  Validators.required]  ,
      phone:   ['',  Validators.required]  ,
      image:   ['',  Validators.required]  ,
      email:   ['',  Validators.required]  ,
      screen:   ['',  Validators.required]  ,
      aboutMe:   ['',  Validators.required]  ,
      address:   ['',  Validators.required]  ,
      country:   ['',  Validators.required]  ,
      state:   ['',  Validators.required]  ,
      city:   ['',  Validators.required]  ,
      zip:   ['',  Validators.required]  ,
      
   
    });
  }

  get formControls() { return this.userDetailForm.controls; }
  userDetailForm: FormGroup;

  formSubmit(){}

}
