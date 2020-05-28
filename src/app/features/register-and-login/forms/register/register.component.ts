import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 
@Component({
  selector: 'edu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.registrationForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      pw:   ['', [ Validators.required, Validators.minLength(8),   Validators.pattern("(.*[A-Z].*[0-9].*|.*[0-9].*[A-Z].*)")]]  ,
      cfmPw: ['', Validators.required]
   
    });
  }

  inputVal = "sdasd"
  get formControls() { return this.registrationForm.controls; }
  registrationForm: FormGroup;
  pwConfig = {
          
  
      align : "left",//center (default ),left,right
      isPassword : true
    
  }
  pwConfig2 = {
       
      align : "left",//center (default ),left,right
      isPassword : true
    
  }


  config = {
   
 
    align : "left",//center (default ),left,right
    isPassword : false
  }

  formSubmit(){}

}
