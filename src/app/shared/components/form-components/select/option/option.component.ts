import { Component, ChangeDetectionStrategy,Renderer2,ElementRef , ChangeDetectorRef ,  HostListener, AfterContentInit  } from '@angular/core';
import { SelectService } from "../select.service"
import { filter } from "rxjs/operators"
@Component({
  selector: 'edu-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent  implements AfterContentInit  {
 
  constructor( private el: ElementRef, private renderer:Renderer2, private selectService:SelectService, private cd:ChangeDetectorRef) { 
     
  }
 
  ngAfterContentInit(){
    this.selectService.activeOption
    .subscribe((activeOption)=>{
      this.isActive = (activeOption === this.value);
      this.cd.markForCheck();
    })
  }

  isActive = false;
  value;
 
  @HostListener("valueChange",["$event"]) onValueChange($event){ //listenting to  directive 
    this.selectService.setActiveOption($event);
  }
  @HostListener("initValue",["$event"]) onInitValue($event){ //listenting to  directive 
    this.value = $event;
  }

 

}
