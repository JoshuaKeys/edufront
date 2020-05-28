import { Component, OnInit, AfterContentInit, ChangeDetectionStrategy, Input,EventEmitter, Output , forwardRef, ViewChild, ElementRef, ContentChildren, QueryList, ChangeDetectorRef} from '@angular/core';
import { InputAffixDirective} from "./input-affix.directive"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'edu-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    }
  ]
})
export class InputComponent implements OnInit, AfterContentInit,  ControlValueAccessor{

  
  constructor(private cd :ChangeDetectorRef, private el:ElementRef) { }

  ngOnInit(): void { 
    this.initConfig();
    this.setElementID();
   }

  ngAfterContentInit(){
    console.log("after view init - " + this.InputAffixDirectives.length)
    this.InputAffixDirectives.forEach((dir,index)=>{
      dir.setConfig.subscribe((val)=>{
        console.log(`el [${this.elementId}] updateds`)
        this.config[val.key] = val.value
        this.cd.markForCheck();
        
      })
    })
  }
  config;  
  inputElIsFocus = false;
  inputIsActive:boolean = false;

  @Output() onValueChange = new EventEmitter<any>();
 

   
  @Input("elementId") elementId;
  @Input("alignment") alignment =  "center";//center (default ),left,right
  @Input("isPassword") isPassword =  false;

  
  @ContentChildren(InputAffixDirective) InputAffixDirectives:QueryList<InputAffixDirective>
 
 
setElementID(){
  if(this.elementId == undefined && this.el.nativeElement.getAttribute("formcontrolname") !== undefined){
    this.elementId = this.el.nativeElement.getAttribute("formcontrolname");
  } 

}

  
  initConfig(){
   this.config = {
     isPassword : this.isPassword,
     hasError : false,
     prefixValue:""
   } 
  }
  focusInput(){
    this.inputElIsFocus = true;
  }
  blurInput(){
    this.inputElIsFocus = false;
    this.onTouched();
  }
  inputFn(val){
    this.onChange(val);
    this.value = val;
  }
  // onChange($event.target.value)

  isLabelActive(){
    return this.inputElIsFocus  ||  this.value != "";
  }
 



  
  //Control value accessor implementation 


 
  disabled:boolean;
  value="";
 
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any){ 
    this.value = value;
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }
 
  registerOnTouched(fn: any){
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
 
}
