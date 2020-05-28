import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 
@Component({
  selector: 'edu-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityQuestionComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.registrationForm  =  this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
 
   
    });
  }

 
  get formControls() { return this.registrationForm.controls; }
  registrationForm: FormGroup;
  

  formSubmit(){}

}
