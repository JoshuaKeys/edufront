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
    console.log(this.value)
    this.cd.markForCheck();
  }
  config;  
  inputElIsFocus = false;
  inputIsActive:boolean = false;
  disabled:boolean; //for ControlValueAccessor implmentation
 

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
    this.onChange(this.val);
  }
  inputFn(val){
    this.value = val;

    this.onChange(val);
  }
  // onChange($event.target.value)

  isLabelActive(){
    return this.inputElIsFocus  ||  this.val != "";
  }
 


  // value = ""; //for ControlValueAccessor implmentation
  val = "";
  set value(val){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val
    this.onChange(val)
    // this.onTouched(val)
    }
  //Control value accessor implementation 


 

 
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
