import { Component, OnInit, ChangeDetectionStrategy , Output, EventEmitter, Host, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'edu-input-test',
  templateUrl: './input-test.component.html',
  styleUrls: ['./input-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTestComponent implements OnInit {

  constructor(private formBuilder:FormBuilder ) { }

 
  modelTest = "1";
  modelTest2 = "";
  ngOnInit(): void {

    this.testForm  =  this.formBuilder.group({
      f1: ['', [Validators.required,  Validators.minLength(4),   Validators.pattern(".*[0-9].*")]]
    
    });
 

  }

  f1model;

  prettifyJSON(obj){
    return JSON.stringify(obj,null,2)
  }

  get formControls() { return this.testForm.controls; }
  testForm: FormGroup;

  formSubmit(){
    console.log(this.formControls);
  }

 

 
  
  @Output("setConfig") setConfig = new EventEmitter();
  cbChecked = false;
  cbChange(){
    // this.setConfig.emit({key: "isPassword", value: !this.isVisible})
    this.setConfig.emit({key:"hasError", value :this.cbChecked})
   
  }

}
