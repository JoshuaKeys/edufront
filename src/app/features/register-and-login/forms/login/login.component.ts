import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 
@Component({
  selector: 'edu-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      pw:   ['', [ Validators.required, Validators.minLength(8),   Validators.pattern("(.*[A-Z].*[0-9].*|.*[0-9].*[A-Z].*)")]]  ,
      
   
    });
  }

 
  get formControls() { return this.loginForm.controls; }
  loginForm: FormGroup;


  formSubmit(){}

}
