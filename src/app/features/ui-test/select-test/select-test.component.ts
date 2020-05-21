import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
 

@Component({
  selector: 'edu-select-test',
  templateUrl: './select-test.component.html',
  styleUrls: ['./select-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTestComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private cd : ChangeDetectorRef) { }
 

  modelTest;
  ngOnInit(): void {

    this.loginForm  =  this.formBuilder.group({
      f1: ['test123', Validators.required]
   
    });
 

  }
  f1model;

  get formControls() { return this.loginForm.controls; }
  loginForm: FormGroup;
  isSubmitted  =  false;
  updatedValue;

  toggleF1(){
    if(this.formControls.f1.disabled){
      this.formControls.f1.enable();
    }else{
      this.formControls.f1.disable();
    }
  }

  formSubmit(){
    
    console.log(this.formControls);
  }

  updateValue(val){
    
      this.updatedValue = val;
    
 
  }

 
}
