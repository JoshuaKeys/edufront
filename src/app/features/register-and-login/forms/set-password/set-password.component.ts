import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 
@Component({
  selector: 'edu-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetPasswordComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.registrationForm  =  this.formBuilder.group({
      pw: ['', Validators.required],
      cfmPw: ['', Validators.required],
 
   
    });
  }

 
  get formControls() { return this.registrationForm.controls; }
  registrationForm: FormGroup;
  

  formSubmit(){}

}
