import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 
@Component({
  selector: 'edu-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register2Component implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.registrationForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]],
      pw:   ['', [ Validators.required, Validators.minLength(8),   Validators.pattern("(.*[A-Z].*[0-9].*|.*[0-9].*[A-Z].*)")]]  ,
      cfmPw: ['', Validators.required]
   
    });
  }

 
  get formControls() { return this.registrationForm.controls; }
  registrationForm: FormGroup;


  formSubmit(){}

}
