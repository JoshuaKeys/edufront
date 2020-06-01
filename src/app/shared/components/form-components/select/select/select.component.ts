import { Component, OnInit,  Output,  Input,EventEmitter , ChangeDetectionStrategy, forwardRef, ChangeDetectorRef  } from '@angular/core';
import { Renderer2, ElementRef } from "@angular/core"
import { SelectService } from "../select.service"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { delay } from "rxjs/operators";
// import { OptionValueDirective } from "../option-value.directive"

@Component({
  selector: 'edu-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers : [
    SelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    }
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SelectComponent  implements OnInit,  ControlValueAccessor  {
 @Output() onValueChange = new EventEmitter<any>();
  @Input("alignment") alignment = "center"; //left right center

  state = "inactive"; // inactive, focus , error >> set

  value;
  elementId;
  label ="Number"
  selectIsActive ; // controls the checkbox, responsible for toggling dropdown
 
  selectPlaceholder ="-" // placeholder for input


  constructor(private selectService:SelectService  ,  private cd :ChangeDetectorRef, private el:ElementRef) { 
       }
  
  ngOnInit(){
    this.elementId = this.el.nativeElement.getAttribute("formcontrolname");
    this.selectService.activeOption.subscribe((val)=>{
      console.log("new select value -- " + val);
      this.onValueChange.emit(val);
      this.value = val;
      this.onChange(val);
   
      this.selectService.setElementIsOpenState(false);
    //  this.selectIsActive = false;
     this.cd.markForCheck();
  
   
   })

   this.selectService.elementIsOpened.pipe(
     delay(200)
   ).subscribe((selectIsActive)=>{
     this.selectIsActive = selectIsActive;
     this.cd.markForCheck();
   })
  }
  isLabelActive(){
    return this.selectIsActive  || this.value != "";
  }

 
 
  cbBlur(){
    this.selectService.setElementIsOpenState(false);
  }

  //Control value accessor implementation 

  onChange: any = () => {};
  onTouched: any = () => {};
 
  disabled:boolean;
 
  writeValue(value: any){ 
    this.selectService.setActiveOption(value);
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }
 
  registerOnTouched(fn: any){
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    // this.selectIsActive = false;
    this.selectService.setElementIsOpenState(false);
    this.disabled = isDisabled;

    this.cd.markForCheck();

  }
 
 
 
}
